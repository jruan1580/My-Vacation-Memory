import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table"
import { useEffect, useState } from "react";
import { GET_TRIPS } from "../GqlQueries/TripsQuery";
import { useQuery } from "@apollo/client";

function Home(){    
    const offset = 10;
    const [page, setPage] = useState(1);    
    const [keyword, setKeyword] = useState("");

    const { loading, error, data } = useQuery(GET_TRIPS, {
        variables : { page, offset, keyword }
    });   
    
    return(
        <>
            <Row>
                <Col lg="2"></Col>
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
        </>
    );
}

export default Home;