using System;
using System.Collections.Generic;

#nullable disable

namespace VacationManagement.Infrastructure.Repository.Entities
{
    public partial class Restaurant
    {
        public long Id { get; set; }
        public string RestaurantName { get; set; }
        public string Style { get; set; }
        public string CostRange { get; set; }
        public long? TripId { get; set; }

        public virtual Trip Trip { get; set; }
    }
}
