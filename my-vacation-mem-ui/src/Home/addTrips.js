import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useMutation } from "@apollo/client";
import { ADD_TRIPS} from "../GqlQueries/TripsQuery";
import { useState, useEffect } from "react";

function AddTripModal({show, handleClose}){
    const [addTripsFunction, {data, loading, error}] = useMutation(ADD_TRIPS);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setSuccess(false);

        var newTripToAdd = {
            name: e.target.tripName.value,
            description: e.target.description.value,
            destination: e.target.destination.value,
            start: e.target.start.value + 'T00:00:00',
            end: (e.target.end.value) ? e.target.end.value + 'T00:00:00' : null,
            rating: parseInt(e.target.rating.value)
        };    

        addTripsFunction({variables: { newTrip: newTripToAdd} });

        if (!loading && !error){
            e.target.reset();
            setSuccess(true);
        }
    }

    useEffect(() =>{
        if (show){
            setSuccess(false);
        }        
    }, [show]);


    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Trip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {(loading && !error && !success) && <Alert variant="info">Processing</Alert>}
                        {(error && !loading && !success) && <Alert variant="danger">{error.message}</Alert>}
                        {(success && !loading && !error) && <Alert variant="success">Successfully added trip.</Alert>}
                        <Form.Group>
                            <Form.Label>Trip Name</Form.Label>
                            <Form.Control type="text" name="tripName" required/>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control type="text" name="destination" required/>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" row={5} name="description"/>
                        </Form.Group>                            
                        <Form.Group as={Row} className="mt-2">
                            <Col lg={5}>
                                <Form.Label>Start</Form.Label>
                                <Form.Control type="date" name="start" required/>
                            </Col>
                            <Col lg={5}>
                                <Form.Label>End</Form.Label>
                                <Form.Control type="date" name="end"/>
                            </Col>
                            <Col>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type="number" min={1} max = {5} name="rating" required/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Button variant="primary" type="submit" disabled={loading}>Add Trips</Button>
                        </Form.Group>                        
                    </Form>
                </Modal.Body>               
            </Modal>

        </>
    )
}

export default AddTripModal;

