using GraphQL.Types;
using VacationManagement.Domain.Models;

namespace VacationManagement.API.Types
{
    public class GenericFailedResponseType : ObjectGraphType<GenericErrorResponse>
    {
        public GenericFailedResponseType()
        {
            Field(e => e.Success, type: typeof(NonNullGraphType<BooleanGraphType>)).Name("success");
            Field(e => e.Message, type: typeof(StringGraphType)).Name("message");
        }
    }
}
