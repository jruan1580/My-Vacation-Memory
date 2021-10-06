import { GET_TRIPS_RESTAURANTS, ADD_TRIP_RESTAURANT } from "../GqlQueries/TripRestaurantsQuery";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

function TripRestaurants({ tripId }){
    const [page, setCurrentPage] = useState(1);
    const [showAddModal, toggleAddModal] = useState(false);

    const offset = 5;

    const {loading, error, data, refetch} = useQuery(GET_TRIPS_RESTAURANTS, {
        variables: { tripId: parseInt(tripId), page, offset}
    });

    useEffect(() =>{
        refetch();
    }, [page, refetch])

    return(
        <>
            <AddRestaurantModal tripId={tripId} show={showAddModal} toggleAddModal={toggleAddModal} refetch={refetch} />
            <Row className="mb-3">
                <Col lg={4}>
                    <Button onClick={() => toggleAddModal(true)}>Add Restaurant</Button>
                </Col>
            </Row>
            <Row>
                { (!loading && !error) && <RestaurantsTable restaurants={ data.tripRestaurants } /> }
            </Row>
            <br/>
            <Row>
                <Pagination>
                    {(page !== 1 && !loading && error === undefined && data.tripRestaurants.length > 0) && <Pagination.First onClick={() => setCurrentPage(1)} />}
                    {(page !== 1 && !loading && error === undefined && data.tripRestaurants.length > 0) && <Pagination.Prev onClick={() => setCurrentPage(page - 1)} />}
                    {(!loading && error === undefined && data.tripRestaurants.length > 0 && page !== ((data.tripRestaurantsTotal % offset === 0 && data.tripRestaurantsTotal !== 0) ? parseInt(data.tripRestaurantsTotal / offset) : (parseInt(data.tripRestaurantsTotal / offset) + 1))) && <Pagination.Next onClick={() => setCurrentPage(page + 1) }/>}
                    {(!loading && error === undefined && data.tripRestaurants.length > 0 && page !== ((data.tripRestaurantsTotal % offset === 0 && data.tripRestaurantsTotal !== 0) ? parseInt(data.tripRestaurantsTotal / offset) : (parseInt(data.tripRestaurantsTotal / offset) + 1))) &&<Pagination.Last onClick={() => setCurrentPage((data.tripRestaurantsTotal % offset === 0 && data.tripRestaurantsTotal !== 0) ? parseInt(data.tripRestaurantsTotal/ offset) : (parseInt(data.tripRestaurantsTotal / offset) + 1))}/>}
                </Pagination>
            </Row>
        </>
    )
}

function RestaurantsTable({ restaurants }){
    return(
        <>
             <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Restaurant Name</th>
                        <th>Address</th>
                        <th>Cuisine</th>
                        <th>Price Range</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants.map(r => {
                            return(
                                <tr style={{cursor: "pointer"}} key={r.id}>
                                    <td>{ r.name }</td>
                                    <td>{ r.address }</td>
                                    <td>{ r.style }</td>
                                    <td>{ r.lowerPriceRange } - { r.upperPriceRange }</td>                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

function AddRestaurantModal({ tripId, show, toggleAddModal, refetch }){
    const [addRestaurant, {data, loading, error}] = useMutation(ADD_TRIP_RESTAURANT);
    
    const onSubmit = (e) =>{
        e.preventDefault();

        var newRestaurant = {
            name: e.target.restName.value,
            address: e.target.restAddress.value,
            cuisine: e.target.restStyle.value,
            lowerPriceRange: parseFloat(e.target.restLowerPriceRance.value),
            upperPriceRange: parseFloat(e.target.restUpperPriceRange.value),
            tripId: parseInt(tripId)
        };

        addRestaurant({variables: { newRestaurant } });

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
                            <Form.Control type="text" name="restName" required/>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="restAddress" required/>
                        </Form.Group>
                        <Form.Group className="mt-2" as={Row}>
                            <Col lg={4}>
                                <Form.Label>Cuisine</Form.Label>
                                <Form.Control type="text" name="restStyle" />
                            </Col>
                            <Col lg={4}>
                                <Form.Label>Lower Price Range</Form.Label>
                                <Form.Control type="text" name="restLowerPriceRance" />
                            </Col>
                            <Col lg={4}>
                                <Form.Label>Upper Price Range</Form.Label>
                                <Form.Control type="text" name="restUpperPriceRange" />
                            </Col>
                        </Form.Group>                                                  
                        <Form.Group className="mt-4">
                            <Button variant="primary" type="submit">Add</Button>{' '}
                            <Button variant="danger" onClick={() => toggleAddModal(false)}>Cancel</Button>
                        </Form.Group>    
                    </Form>
                </Modal.Body>
            </Modal>            
        </>
    )
}

export default TripRestaurants;