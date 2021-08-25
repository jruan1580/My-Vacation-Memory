using System;
using System.Collections.Generic;

#nullable disable

namespace VacationManagement.Infrastructure.Repository.Entities
{
    public partial class Trip
    {
        public long Id { get; set; }
        public string TripName { get; set; }
        public string Destination { get; set; }
        public string TripDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public short Rating { get; set; }
    }
}
