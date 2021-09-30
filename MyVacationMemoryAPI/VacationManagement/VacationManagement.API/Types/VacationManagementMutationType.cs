using GraphQL;
using GraphQL.Types;
using System;
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
            FieldAsync<GenericFailedResponseType>("addTrip", 
                "adds a new trip",
                new QueryArguments(new QueryArgument<AddTripInputType> { Name = "newTrip" }),
                async context =>
                {
                    var newTrip = context.GetArgument<MyTrip>("newTrip");
                    try
                    {
                        await myTripsService.AddNewTrip(newTrip.TripName, newTrip.TripDescription, newTrip.Destination, newTrip.StartDate, newTrip.EndDate, newTrip.Rating);

                        return new GenericErrorResponse() { Success = true, Message = string.Empty };
                    }
                    catch(Exception e)
                    {
                        return new GenericErrorResponse() { Success = false, Message = e.Message };
                    }
                });

            FieldAsync<GenericFailedResponseType>(
                name: "addTripAttraction",
                arguments: new QueryArguments(new QueryArgument<AddTripAttractionType> { Name = "newAttraction" }),
                resolve: async context =>
                {
                    var newAttraction = context.GetArgument<TripAttraction>("newAttraction");

                    try
                    {
                        await tripAttractionService.AddTripAttraction(newAttraction.TripId, newAttraction.AttractionName, newAttraction.Description, newAttraction.Location, newAttraction.Cost);

                        return new GenericErrorResponse() { Success = true, Message = string.Empty };
                    }
                    catch(Exception e)
                    {
                        return new GenericErrorResponse() { Success = false, Message = e.Message};
                    }                                        
                }
            );

            FieldAsync<GenericFailedResponseType>(
                name: "addTripRestaurant",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<AddTripRestaurantType>> { Name = "newRestaurant"}),
                resolve: async context =>
                {
                    var newRestaurant = context.GetArgument<TripRestaurant>("newRestaurant");
                    try
                    {
                        await tripRestaurantService.AddRestaurantToTrip(newRestaurant.TripId, newRestaurant.RestaurantName, newRestaurant.Location, newRestaurant.Style, newRestaurant.LowerCostRange, newRestaurant.UpperCostRange);

                        return new GenericErrorResponse() { Success = true, Message = string.Empty };
                    }
                    catch(Exception e)
                    {
                        return new GenericErrorResponse() { Success = false, Message = e.Message };
                    }
                }
            );
        }
    }
}
