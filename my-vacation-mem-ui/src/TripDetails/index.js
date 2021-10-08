import { useParams } from "react-router-dom";
import { GET_TRIPS_BY_ID, UPDATE_TRIP} from "../GqlQueries/TripsQuery";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import TripAttractions from "./tripAttractions";
import TripRestaurants from "./tripRestaurants";

function TripDetails(){    
    const { id } = useParams();

    const { loading, error, data, refetch } = useQuery(GET_TRIPS_BY_ID, {
        variables : { id: parseInt(id) }
    });   

    const [isUpdateTripView, setUpdateTripView] = useState(false);
    const [tripObj, setTripObj] = useState({});

    useEffect(() => {
        if (data !== undefined && !loading && error === undefined){
            console.log(data.trip);
            setTripObj(data.trip);
        }
    }, [data, loading, error]);

    return(
        <>            
            <Row className="mt-4">
                {(!isUpdateTripView && !loading && !error) && <ViewOnly tripObj={tripObj} setUpdateTripView={setUpdateTripView}/>}
                {isUpdateTripView && <EditOnly tripObj={tripObj} setUpdateTripView={setUpdateTripView} refetch={refetch} />}
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

function EditOnly({ tripObj, setUpdateTripView, refetch }){
    const [updateTrip, {data, loading, error}] = useMutation(UPDATE_TRIP);

    const onSubmit = (e) =>{
        e.preventDefault();

        var updatedTrip = {
            id: parseInt(tripObj.id),
            name: e.target.updateTripName.value,
            description: e.target.updateDescription.value,
            destination: e.target.updateDestination.value,
            start: e.target.updateStart.value + 'T00:00:00',
            end: (e.target.updateEnd.value) ? e.target.updateEnd.value + 'T00:00:00' : null,
            rating: parseInt(e.target.updateRating.value)
        };    

        updateTrip({variables: { updatedTrip } });
    }

    useEffect(() =>{
        if (data !== undefined && !loading && error === undefined){
            document.getElementById("updateTripForm").reset();
            refetch();
            setUpdateTripView(false);
        }
    }, [data, loading, error, refetch, setUpdateTripView]);

    return(
        <>
            {(loading && error === undefined) && <Alert variant="info">Processing</Alert>}
            {(error !== undefined && !loading) && <Alert variant="danger">{error.message}</Alert>}
            <Form className="mt-4 mb-4" onSubmit={onSubmit} id="updateTripForm">
                <Form.Group>
                    <Form.Label>Trip Name</Form.Label>
                    <Form.Control type="text" name="updateTripName" defaultValue={tripObj.name} required/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" name="updateDestination" defaultValue={tripObj.destination} required/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" row={5} name="updateDescription" defaultValue={tripObj.description}/>
                </Form.Group>                            
                <Form.Group as={Row} className="mt-2">
                    <Col lg={5}>
                        <Form.Label>Start</Form.Label>
                        <Form.Control type="date" name="updateStart" defaultValue={tripObj.start} required/>
                    </Col>
                    <Col lg={5}>
                        <Form.Label>End</Form.Label>
                        <Form.Control type="date" name="updateEnd" defaultValue={tripObj.end}/>
                    </Col>
                    <Col>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" min={1} max = {5} name="updateRating" defaultValue={tripObj.rating} required/>
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