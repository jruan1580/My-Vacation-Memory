using GraphQL.Types;
using VacationManagement.Domain.Models;

namespace VacationManagement.API.Types
{
    public class TripAttractionType : ObjectGraphType<TripAttraction>
    {
        public TripAttractionType()
        {
            Field(t => t.Id, type: typeof(NonNullGraphType<BigIntGraphType>)).Name("id");
            Field(t => t.AttractionName, type: typeof(NonNullGraphType<StringGraphType>)).Name("name");
            Field(t => t.Description, type: typeof(NonNullGraphType<StringGraphType>)).Name("description");
            Field(t => t.Location, type: typeof(NonNullGraphType<StringGraphType>)).Name("location");
            Field(t => t.Cost, type: typeof(NonNullGraphType<DecimalGraphType>)).Name("cost");
        }
    }
}
