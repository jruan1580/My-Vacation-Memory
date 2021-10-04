import { gql } from '@apollo/client';

export const GET_TRIPS_ATTRACTIONS = gql`
    query GetTripAttractionByTripId($tripId: BigInt!, $page: Int!, $offset: Int!){
        tripAttractions(tripId, page, offset){
            id,
            name,
            description,
            address,
            cost
        },
        tripAttractionTotal(tripId)
    }
`;