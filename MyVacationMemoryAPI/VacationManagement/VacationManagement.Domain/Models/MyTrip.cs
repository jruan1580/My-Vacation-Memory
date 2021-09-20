using System;
using System.Collections.Generic;
using System.Text;

namespace VacationManagement.Domain.Models
{
    public class MyTrip
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
