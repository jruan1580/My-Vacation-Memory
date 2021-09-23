import { gql } from '@apollo/client';

export const GET_TRIPS = gql`    
    query GetTrips($page: Int!, $offset: Int!, $keyword: String){
        trips(page: $page, offset: $offset, keyword: $keyword ){
            id,
            name,
            start,
            end,
            rating
        }
  }
`;

export const GET_TRIPS_BY_ID = gql`
  query GetTripsById($id: Int!){
      trip(id: $id){
        id,
        name,
        description,
        name,
        start,
        end,
        rating
      }
  }
`;