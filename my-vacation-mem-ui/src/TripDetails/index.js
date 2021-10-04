import { useParams } from "react-router-dom";
import { GET_TRIPS_BY_ID} from "../GqlQueries/TripsQuery";
import { useQuery} from "@apollo/client";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import TripAttractions from "./tripAttractions";

function TripDetails(){    
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_TRIPS_BY_ID, {
        variables : { id: parseInt(id) }
    });   

    const [isUpdateTripView, setUpdateTripView] = useState(false);

    return(
        <>            
            <Row>
                {(!isUpdateTripView && !loading && !error) && <ViewOnly tripObj={data.trip}/>}
            </Row>
            <Row>
                <TripAttractions tripId={id} />
            </Row>
        </>
    )
}

function ViewOnly({ tripObj }){
    console.log(tripObj);
    return(
        <>
            <div className="mt-4">
                <h3>{ tripObj.name }</h3>
            </div>
            <div className="mt-1">
                <span><b>Start:</b> { tripObj.start }</span><br/>
                <span><b>End:</b> { tripObj.end }</span><br/>
                <span><b>Rating:</b> { tripObj.rating }/5</span>
            </div>
            <div className="mt-1">
                <p><b>Description:</b> { tripObj.description }</p>
            </div>
        </>
    )
}


export default TripDetails;