import { gql } from '@apollo/client';

export const GET_TRIPS = gql`    
    query GetTrips($page: Int!, $offset: Int!, $keyword: String){
        trips(page: $page, offset: $offset, keyword: $keyword ){
            id,
            name,
            destination,
            start,
            end,
            rating
        },
        total(keyword: $keyword)
  }
`;

export const GET_TRIPS_BY_ID = gql`
  query GetTripsById($id: BigInt!){
      trip(id: $id){
        id,
        name,
        description,
        destination,
        name,
        start,
        end,
        rating
      }
  }
`;

export const ADD_TRIPS = gql`
  mutation AddNewTrip($newTrip: NewTripInput!){
    addTrip(newTrip: $newTrip)
  }
`;

export const UPDATE_TRIP = gql`
  mutation UpdateTrip($updatedTrip: UpdateTripInput!){
    updateTrip(updatedTrip: $updatedTrip)
  }
`;