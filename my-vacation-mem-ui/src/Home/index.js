import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Pagination  from "react-bootstrap/Pagination";
import { useEffect, useState } from "react";
import { GET_TRIPS } from "../GqlQueries/TripsQuery";
import { useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import AddTripModal from "./addTrips";
import Loading from "../Loading";

function Home(){    
    const offset = 10;
    const [page, setPage] = useState(1);    
    const [keyword, setKeyword] = useState("");
    const [showAddTrip, setShowAddTrip] = useState(false);
    const [trips, setTrips] = useState([]);

    const { loading, error, data, refetch } = useQuery(GET_TRIPS, {
        variables : { page, offset, keyword }
    });   

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    useEffect(() => {
        if (data !== undefined && !loading && error === undefined){
            setTrips(data.trips);
        }
    }, [data, loading, error]);

    useEffect(() => {
        refetch();
    }, [page, refetch])

    const searchChanged = (e) =>{
        setKeyword(e.target.value);
    }

    const handleCloseAddTrip = () =>{
        setShowAddTrip(false);
    }
       
    return(
        <>
            {(loading && error === undefined) && <Loading />}
            <AddTripModal show={showAddTrip} handleClose={handleCloseAddTrip} refetch={refetch}/>
            <Row className="mt-4">
                <Col lg={12}>
                    <Form>
                        <Form.Group as={Row}>                            
                            <Col lg={4}>
                                <Form.Control type="input" placeholder="Search by Name or Destination" onChange={searchChanged}/>
                            </Col>
                            <Col lg={7}></Col>
                            <Col lg={1}>
                                <Button variant="primary" onClick={() => setShowAddTrip(true)}>Add Trip</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Trip Name</th>
                            <th>Destination</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!loading && error === undefined) &&
                                (trips.map(t => {
                                    return (
                                    <tr style={{cursor:"pointer"}} key={t.id} onClick={() => window.location.href = "/trip/" + t.id}>
                                        <td>{t.name}</td>
                                        <td>{t.destination}</td>
                                        <td>{t.start}</td>
                                        <td>{t.end}</td>
                                        <td>{t.rating}</td>
                                    </tr>
                                    )
                                }))
                        }
                    </tbody>
                </Table>
            </Row>
            <br/>
            <Pagination>
                {(page !== 1 && !loading && error === undefined && data.trips.length > 0) && <Pagination.First onClick={() => setPage(1)} />}
                {(page !== 1 && !loading && error === undefined && data.trips.length > 0) && <Pagination.Prev onClick={() => setPage(page - 1)} />}
                {(!loading && error === undefined && data.trips.length > 0 && page !== ((data.total % offset === 0 && data.total !== 0) ? parseInt(data.total / offset) : (parseInt(data.total / offset) + 1))) && <Pagination.Next onClick={() => setPage(page + 1) }/>}
                {(!loading && error === undefined && data.trips.length > 0 && page !== ((data.total % offset === 0 && data.total !== 0) ? parseInt(data.total / offset) : (parseInt(data.total / offset) + 1))) &&<Pagination.Last onClick={() => setPage((data.total % offset === 0 && data.total !== 0) ? parseInt(data.total/ offset) : (parseInt(data.total / offset) + 1))}/>}
            </Pagination>
        </>
    );
}

export default Home;