using GraphQL.Types;
using VacationManagement.Domain.Models;

namespace VacationManagement.API.Types
{
    public class AddTripAttractionType : InputObjectGraphType<TripAttraction>
    {
        public AddTripAttractionType()
        {
            Field(a => a.Id, type: typeof(NonNullGraphType<BigIntGraphType>)).Name("id");
            Field(a => a.AttractionName, type: typeof(NonNullGraphType<StringGraphType>)).Name("name");
            Field(a => a.Location, type: typeof(NonNullGraphType<StringGraphType>)).Name("address");
            Field(a => a.Cost, type: typeof(NonNullGraphType<StringGraphType>)).Name("costs");
            Field(a => a.Description, type: typeof(NonNullGraphType<StringGraphType>)).Name("description");
            Field(a => a.TripId, type: typeof(NonNullGraphType<BigIntGraphType>)).Name("tripId");
        }
    }
}
