using System;
using System.Collections.Generic;

#nullable disable

namespace VacationManagement.Infrastructure.Repository.Entities
{
    public partial class Attraction
    {
        public long Id { get; set; }
        public string AttractionName { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal Cost { get; set; }
        public long? TripId { get; set; }

        public virtual Trip Trip { get; set; }
    }
}
