using GraphQL;
using GraphQL.Types;
using VacationManagement.Domain.Services;

namespace VacationManagement.API.Types
{
    public class VacationManagementQueryType : ObjectGraphType
    {
        public VacationManagementQueryType(IMyTripsService myTripService)
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
        }
    }
}
