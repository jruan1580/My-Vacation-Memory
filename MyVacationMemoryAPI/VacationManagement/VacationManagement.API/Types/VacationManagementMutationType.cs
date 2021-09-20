using GraphQL;
using GraphQL.Types;
using VacationManagement.Domain.Models;
using VacationManagement.Domain.Services;

namespace VacationManagement.API.Types
{
    public class VacationManagementMutationType : ObjectGraphType
    {
        public VacationManagementMutationType(IMyTripsService myTripsService)
        {
            FieldAsync<TripType>("addTrip", 
                "adds a new trip",
                new QueryArguments(new QueryArgument<AddTripInputType> { Name = "newTrip" }),
                async context =>
                {
                    var newTrip = context.GetArgument<MyTrip>("newTrip");

                    return await myTripsService.AddNewTrip(newTrip.TripName, newTrip.TripDescription, newTrip.Destination, newTrip.StartDate, newTrip.EndDate, newTrip.Rating);
                });
        }
    }
}
