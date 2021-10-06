import { useQuery, useMutation } from "@apollo/client";
import { GET_TRIPS_ATTRACTIONS, ADD_TRIP_ATTRACTION } from "../GqlQueries/TripAttractionsQuery"
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";

function TripAttractions({ tripId }){
    const offset = 5;
    const [page, setCurrentPage] = useState(1);
    const [showAddModal, toggleAddModal] = useState(false);

    const {loading, error, data, refetch} = useQuery(GET_TRIPS_ATTRACTIONS, {
        variables: { tripId: parseInt(tripId), page, offset }
    });

    useEffect(() =>{
        refetch();
    }, [page, refetch]);

    return(
        <>
            <AddAttractionModal tripId={tripId} show={showAddModal} toggleAddModal={toggleAddModal} refetch={refetch}/>
            <Row className="mb-3">
                <Col lg={4}>
                    <Button onClick={() => toggleAddModal(true)}>Add Attraction</Button>
                </Col>
            </Row>
            <Row>
                {(!loading && !error) && <AttractionsTable attractions={data.tripAttractions }/> }        
            </Row><br/>        
            <Pagination>
                {(page !== 1 && !loading && error === undefined && data.tripAttractions.length > 0) && <Pagination.First onClick={() => setCurrentPage(1)} />}
                {(page !== 1 && !loading && error === undefined && data.tripAttractions.length > 0) && <Pagination.Prev onClick={() => setCurrentPage(page - 1)} />}
                {(!loading && error === undefined && data.tripAttractions.length > 0 && page !== ((data.tripAttractionTotal % offset === 0 && data.tripAttractionTotal !== 0) ? parseInt(data.tripAttractionTotal / offset) : (parseInt(data.tripAttractionTotal / offset) + 1))) && <Pagination.Next onClick={() => setCurrentPage(page + 1) }/>}
                {(!loading && error === undefined && data.tripAttractions.length > 0 && page !== ((data.tripAttractionTotal % offset === 0 && data.tripAttractionTotal !== 0) ? parseInt(data.tripAttractionTotal / offset) : (parseInt(data.tripAttractionTotal / offset) + 1))) &&<Pagination.Last onClick={() => setCurrentPage((data.tripAttractionTotal % offset === 0 && data.tripAttractionTotal !== 0) ? parseInt(data.tripAttractionTotal/ offset) : (parseInt(data.tripAttractionTotal / offset) + 1))}/>}
            </Pagination>
        </>
    );
}

function AttractionsTable({ attractions }){    
    return(
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Attraction Name</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Costs</th>
                    </tr>
                </thead>
                <tbody>
                    {       
                        attractions.map(a => {
                            return (
                                <tr style={{cursor: "pointer"}} key={a.id}>
                                    <td>{ a.name }</td>
                                    <td>{ a.address }</td>
                                    <td>{ a.description }</td>
                                    <td>{ a.cost }</td>
                                </tr>
                            )
                        })                                      
                    }
                    </tbody>
            </Table>
        </>
    );
}

function AddAttractionModal({ tripId, show, toggleAddModal, refetch }){
    const [addTripAttraction, {data, loading, error}] = useMutation(ADD_TRIP_ATTRACTION);

    const onSubmit = (e) =>{
        e.preventDefault();

        const newAttraction = {
            name: e.target.attractionName.value,
            description: e.target.attractionDesc.value,
            address: e.target.attractionAddress.value,            
            costs: e.target.attractionCosts.value,
            tripId: parseInt(tripId)
        };    

        addTripAttraction({variables: { newAttraction } });

        if (!loading && !error){
            e.target.reset();
            refetch();
        }
    }
    return(
        <>
            <Modal show={show} onHide={() => toggleAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Attraction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        {(loading && !error) && <Alert variant="info">Processing</Alert>}
                        {(error && !loading) && <Alert variant="danger">{error.message}</Alert>}                        
                        <Form.Group>
                            <Form.Label>Attraction Name</Form.Label>
                            <Form.Control type="text" name="attractionName" required/>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="attractionAddress" required/>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" row={5} name="attractionDesc" />
                        </Form.Group>                            
                        <Form.Group className="mt-2">                    
                            <Form.Label>Costs</Form.Label>
                            <Form.Control type="text" name="attractionCosts" />
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Button variant="primary" type="submit">Add</Button>{' '}
                            <Button variant="danger" onClick={() => toggleAddModal(false)}>Cancel</Button>
                        </Form.Group>    
                    </Form>
                </Modal.Body>
            </Modal>            
        </>
    );
}

export default TripAttractions;