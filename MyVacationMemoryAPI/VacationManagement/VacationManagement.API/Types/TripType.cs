using GraphQL.Types;
using VacationManagement.Domain.Models;

namespace VacationManagement.API.Types
{
    public class TripType : ObjectGraphType<MyTrip>
    {
        public TripType()
        {
            Field(t => t.Id, type: typeof(NonNullGraphType<BigIntGraphType>)).Name("id");
            Field(t => t.TripName, type: typeof(NonNullGraphType<StringGraphType>)).Name("name");
            Field(t => t.TripDescription, type: typeof(NonNullGraphType<StringGraphType>)).Name("description");
            Field(t => t.Destination, type: typeof(NonNullGraphType<StringGraphType>)).Name("destination");
            Field(t => t.StartDate, type: typeof(NonNullGraphType<DateTimeGraphType>)).Name("start");
            Field(t => t.EndDate, type: typeof(DateTimeGraphType)).Name("end");
            Field(t => t.Rating, type: typeof(NonNullGraphType<ShortGraphType>)).Name("rating");
        }
    }
}
