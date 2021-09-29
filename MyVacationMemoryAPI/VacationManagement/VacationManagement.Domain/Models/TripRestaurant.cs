namespace VacationManagement.Domain.Models
{
    public class TripRestaurant
    {
        public long Id { get; set; }
        public string RestaurantName { get; set; }
        public string Style { get; set; }
        public string CostRange { get; set; }
        public long? TripId { get; set; }
    }
}
