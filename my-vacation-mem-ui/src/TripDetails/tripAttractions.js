import { useQuery } from "@apollo/client";
import { GET_TRIPS_ATTRACTIONS } from "../GqlQueries/TripAttractionsQuery"
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";

function TripAttractions({ tripId }){
    const offset = 5;
    const [page, setCurrentPage] = useState(1);
    const {loading, error, data, refetch} = useQuery(GET_TRIPS_ATTRACTIONS, {
        variables: { tripId, page, offset }
    });

    useEffect(() =>{
        refetch();
    }, [page, refetch]);

    return(
        <>
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

export default TripAttractions;