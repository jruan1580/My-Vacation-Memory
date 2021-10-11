using GraphQL;
using GraphQL.Types;
using System.Linq;
using VacationManagement.Domain.Services;

namespace VacationManagement.API.Types
{
    public class VacationManagementQueryType : ObjectGraphType
    {
        public VacationManagementQueryType(IMyTripsService myTripService, 
            ITripAttractionService tripAttractionService, 
            ITripRestaurantService tripRestaurantService)
        {
            FieldAsync<ListGraphType<TripType>>(
                name: "trips",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "page" },
                                                new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "offset" },
                                                new QueryArgument<StringGraphType> { Name = "keyword" }),
                resolve: async context =>
                {
                    var page = context.GetArgument<int>("page");
                    var offset = context.GetArgument<int>("offset");
                    var keyword = context.GetArgument<string>("keyword");

                    return await myTripService.GetMyTripsByKeywordAndPage(page, offset, keyword);
                }
            );

            FieldAsync<TripType>(
                name: "trip",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BigIntGraphType>> { Name = "id" }),
                resolve: async context =>
                {
                    var id = context.GetArgument<long>("id");
                    
                    return await myTripService.GetMyTripById(id);
                }
            );

            FieldAsync<IntGraphType>(
                name: "total",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "keyword" }),
                resolve: async context =>
                {
                    var keyword = context.GetArgument<string>("keyword");

                    return await myTripService.GetTotalTrips(keyword);
                }
            );

            FieldAsync<ListGraphType<TripAttractionType>>(
                name: "tripAttractions",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BigIntGraphType>> { Name = "tripId" }, 
                                                new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "offset" },
                                                new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "page" }),
                resolve: async context =>
                {
                    var tripId = context.GetArgument<long>("tripId");
                    var page = context.GetArgument<int>("page");
                    var offset = context.GetArgument<int>("offset");

                    return (await tripAttractionService.GetAttractionsByTripId(tripId)).Skip((page - 1) * offset).Take(offset);
                }
            );

            FieldAsync<IntGraphType>(
                name: "tripAttractionTotal",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BigIntGraphType>> { Name = "tripId" }),
                resolve: async context =>
                {
                    var tripId = context.GetArgument<long>("tripId");

                    return (await tripAttractionService.GetAttractionsByTripId(tripId)).Count;
                }
            );

            FieldAsync<ListGraphType<TripRestaurantType>>(
                name: "tripRestaurants",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BigIntGraphType>> { Name = "tripId" },
                                                new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "offset" },
                                                new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "page" }),
                resolve: async context =>
                {
                    var tripId = context.GetArgument<long>("tripId");
                    var page = context.GetArgument<int>("page");
                    var offset = context.GetArgument<int>("offset");

                    return (await tripRestaurantService.GetRestaurantsByTripId(tripId)).Skip((page - 1) * offset).Take(offset);
                }
            );

            FieldAsync<IntGraphType>(
                name: "tripRestaurantsTotal",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BigIntGraphType>> { Name = "tripId" }),
                resolve: async context =>
                {
                    var tripId = context.GetArgument<long>("tripId");

                    return (await tripRestaurantService.GetRestaurantsByTripId(tripId)).Count;
                }
            );
        }
    }
}
