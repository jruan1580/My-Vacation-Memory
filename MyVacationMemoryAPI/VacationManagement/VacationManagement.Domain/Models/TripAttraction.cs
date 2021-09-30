namespace VacationManagement.Domain.Models
{
    public class TripAttraction
    {
        public long Id { get; set; }
        public string AttractionName { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal Cost { get; set; }
        public long TripId { get; set; }
    }
}
