namespace VacationManagement.Domain.Models
{
    public class TripRestaurant
    {
        public long Id { get; set; }
        public string RestaurantName { get; set; }
        public string Style { get; set; }
        public decimal LowerCostRange { get; set; }
        public decimal UpperCostRange { get; set; }
        public string Location { get; set; }
        public long? TripId { get; set; }
    }
}
