using GraphQL.Types;
using VacationManagement.Domain.Models;

namespace VacationManagement.API.Types
{
    public class AddTripRestaurantType : InputObjectGraphType<TripRestaurant>
    {
        public AddTripRestaurantType()
        {
            Field(r => r.Id, type: typeof(NonNullGraphType<BigIntGraphType>)).Name("id");
            Field(r => r.RestaurantName, type: typeof(NonNullGraphType<StringGraphType>)).Name("name");
            Field(r => r.Location, type: typeof(NonNullGraphType<StringGraphType>)).Name("address");
            Field(r => r.Style, type: typeof(NonNullGraphType<StringGraphType>)).Name("cuisine");
            Field(r => r.LowerCostRange, type: typeof(NonNullGraphType<DecimalGraphType>)).Name("lowerPriceRange");
            Field(r => r.UpperCostRange, type: typeof(NonNullGraphType<DecimalGraphType>)).Name("upperPriceRange");
            Field(a => a.TripId, type: typeof(NonNullGraphType<BigIntGraphType>)).Name("tripId");
        }
    }
}
