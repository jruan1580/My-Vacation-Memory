using GraphQL.Types;
using VacationManagement.Domain.Models;

namespace VacationManagement.API.Types
{
    public class TripRestaurantType : ObjectGraphType<TripRestaurant>
    {
        public TripRestaurantType()
        {
            Field(r => r.Id, type: typeof(NonNullGraphType<BigIntGraphType>)).Name("id");
            Field(r => r.RestaurantName, type: typeof(NonNullGraphType<StringGraphType>)).Name("name");
            Field(r => r.Style, type: typeof(NonNullGraphType<StringGraphType>)).Name("style");
            Field(r => r.LowerCostRange, type: typeof(NonNullGraphType<DecimalGraphType>)).Name("lowerPriceRange");
            Field(r => r.UpperCostRange, type: typeof(NonNullGraphType<DecimalGraphType>)).Name("upperPriceRange");
            Field(r => r.Location, type: typeof(NonNullGraphType<StringGraphType>)).Name("address");
        }
    }
}
