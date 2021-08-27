using System;

namespace VacationManagement.Domain.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message): base(message) { }
    }
}
