import { useParams } from "react-router-dom";
import { GET_TRIPS_BY_ID} from "../GqlQueries/TripsQuery";
import { useQuery} from "@apollo/client";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TripAttractions from "./tripAttractions";
import TripRestaurants from "./tripRestaurants";

function TripDetails(){    
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_TRIPS_BY_ID, {
        variables : { id: parseInt(id) }
    });   

    const [isUpdateTripView, setUpdateTripView] = useState(false);

    return(
        <>            
            <Row>
                {(!isUpdateTripView && !loading && !error) && <ViewOnly tripObj={data.trip} setUpdateTripView={setUpdateTripView}/>}
                {isUpdateTripView && <EditOnly tripObj={data.trip} setUpdateTripView={setUpdateTripView} />}
            </Row>
            <Row>
                <TripAttractions tripId={id} />
            </Row>
            <Row className="mb-4">
                <TripRestaurants tripId={id}/>
            </Row>
        </>
    )
}

function ViewOnly({ tripObj, setUpdateTripView }){
    return(
        <>
            <Row className="mt-4">
                <Col lg={3}>
                    <h3>{ tripObj.name }</h3>
                </Col>                 
                <Col lg={8}></Col>
                <Col lg={1}>
                    <Button onClick={() => setUpdateTripView(true)}>Edit Trip</Button>
                </Col>
            </Row>
            
            <Row className="mt-1">
                <span><b>Start:</b> { tripObj.start }</span><br/>
                <span><b>End:</b> { tripObj.end }</span><br/>
                <span><b>Rating:</b> { tripObj.rating }/5</span>
            </Row>

            <Row>
                <p><b>Description:</b> { tripObj.description }</p>
            </Row>            
        </>
    )
}

function EditOnly({ tripObj, setUpdateTripView }){
    return(
        <>
            <Form className="mt-4 mb-4">
                <Form.Group>
                    <Form.Label>Trip Name</Form.Label>
                    <Form.Control type="text" name="tripName" value={tripObj.name} required/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" name="destination" value={tripObj.destination} required/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" row={5} name="description" value={tripObj.description}/>
                </Form.Group>                            
                <Form.Group as={Row} className="mt-2">
                    <Col lg={5}>
                        <Form.Label>Start</Form.Label>
                        <Form.Control type="date" name="start" value={tripObj.start} required/>
                    </Col>
                    <Col lg={5}>
                        <Form.Label>End</Form.Label>
                        <Form.Control type="date" name="end" value={tripObj.end}/>
                    </Col>
                    <Col>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" min={1} max = {5} name="rating" value={tripObj.rating} required/>
                    </Col>
                </Form.Group>
                <Form.Group className="mt-4">
                    <Button variant="primary" type="submit">Save</Button>{' '}
                    <Button variant="danger" onClick={() => setUpdateTripView(false)}>Cancel</Button>
                </Form.Group>    
            </Form>
        </>
    )
}

export default TripDetails;