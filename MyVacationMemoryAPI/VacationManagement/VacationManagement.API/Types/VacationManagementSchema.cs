using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using VacationManagement.Domain.Services;

namespace VacationManagement.API.Types
{
    public class VacationManagementSchema : Schema
    {

        public VacationManagementSchema(IMyTripsService myTripsService, 
            ITripAttractionService tripAttractionService,
            ITripRestaurantService tripRestaurantService,
            IServiceProvider resolver) : base(resolver)
        {
            Query = new VacationManagementQueryType(myTripsService, tripAttractionService, tripRestaurantService);
            Mutation = new VacationManagementMutationType(myTripsService, tripAttractionService, tripRestaurantService);
        }
    }
}
