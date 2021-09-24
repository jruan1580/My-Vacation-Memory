import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Pagination  from "react-bootstrap/Pagination";
import { useEffect, useState } from "react";
import { GET_TRIPS } from "../GqlQueries/TripsQuery";
import { useQuery } from "@apollo/client";

function Home(){    
    const offset = 5;
    const [page, setPage] = useState(1);    
    const [keyword, setKeyword] = useState("");

    const { loading, error, data, refetch } = useQuery(GET_TRIPS, {
        variables : { page, offset, keyword }
    });   

    const searchChanged = (e) =>{
        console.log(e.target.value);
        setKeyword(e.target.value);
    }

    useEffect(() => {
        console.log('in here');
        setPage(1);
        refetch();
    }, [keyword, refetch]);
    
    return(
        <>
            <Row className="mt-4">
                <Col lg="4">
                    <Form>
                        <Form.Group as={Row}>                            
                            <Col>
                                <Form.Control type="input" placeholder="Search by Name or Destination" onChange={searchChanged}/>
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
                                (data.trips.map(t => {
                                    return (
                                    <tr key={t.id}>
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