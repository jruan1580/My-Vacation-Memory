import { gql } from '@apollo/client';

export const GET_TRIPS_RESTAURANTS = gql`
    query GetRestaurantsByTripId($tripId: BigInt!, $page: Int!, $offset: Int!){
        tripRestaurants(tripId: $tripId, page: $page, offset: $offset){
            id,
            name,
            style,
            lowerPriceRange,
            upperPriceRange,
            address
        },
        tripRestaurantsTotal(tripId: $tripId)
    }
`;

export const ADD_TRIP_RESTAURANT = gql`
    mutation AddRestaurantToTrip($newRestaurant: AddTripRestaurantType!){
        addTripRestaurant(newRestaurant: $newRestaurant)
    }
`;