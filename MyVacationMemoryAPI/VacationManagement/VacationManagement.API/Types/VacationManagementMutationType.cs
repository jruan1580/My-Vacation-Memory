using GraphQL;
using GraphQL.Types;
using VacationManagement.Domain.Models;
using VacationManagement.Domain.Services;

namespace VacationManagement.API.Types
{
    public class VacationManagementMutationType : ObjectGraphType
    {
        public VacationManagementMutationType(IMyTripsService myTripsService,
            ITripAttractionService tripAttractionService,
            ITripRestaurantService tripRestaurantService)
        {
            FieldAsync<BooleanGraphType>(
                name: "addTrip",                 
                arguments: new QueryArguments(new QueryArgument<AddTripInputType> { Name = "newTrip" }),
                resolve: async context =>
                {
                    var newTrip = context.GetArgument<MyTrip>("newTrip");

                    await myTripsService.AddNewTrip(newTrip.TripName, newTrip.TripDescription, newTrip.Destination, newTrip.StartDate, newTrip.EndDate, newTrip.Rating);

                    return true;
                });

            FieldAsync<BooleanGraphType>(
                name: "addTripAttraction",
                arguments: new QueryArguments(new QueryArgument<AddTripAttractionType> { Name = "newAttraction" }),
                resolve: async context =>
                {
                    var newAttraction = context.GetArgument<TripAttraction>("newAttraction");

                    await tripAttractionService.AddTripAttraction(newAttraction.TripId, newAttraction.AttractionName, newAttraction.Description, newAttraction.Location, newAttraction.Cost);

                    return true;                                                     
                }
            );

            FieldAsync<BooleanGraphType>(
                name: "addTripRestaurant",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<AddTripRestaurantType>> { Name = "newRestaurant"}),
                resolve: async context =>
                {
                    var newRestaurant = context.GetArgument<TripRestaurant>("newRestaurant");

                    await tripRestaurantService.AddRestaurantToTrip(newRestaurant.TripId, newRestaurant.RestaurantName, newRestaurant.Location, newRestaurant.Style, newRestaurant.LowerCostRange, newRestaurant.UpperCostRange);

                    return true;                    
                }
            );
        }
    }
}
