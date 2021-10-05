import { GET_TRIPS_RESTAURANTS } from "../GqlQueries/TripRestaurantsQuery";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";

function TripRestaurants({ tripId }){
    const [page, setCurrentPage] = useState(1);
    const offset = 5;

    const {loading, error, data, refetch} = useQuery(GET_TRIPS_RESTAURANTS, {
        variables: { tripId: parseInt(tripId), page, offset}
    });

    useEffect(() =>{
        refetch();
    }, [page, refetch])

    return(
        <>
             <Row className="mb-3">
                <Col lg={4}>
                    <Button>Add Restaurant</Button>
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

export default TripRestaurants;