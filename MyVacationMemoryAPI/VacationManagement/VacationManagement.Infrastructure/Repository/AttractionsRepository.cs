using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacationManagement.Infrastructure.Repository.Entities;

namespace VacationManagement.Infrastructure.Repository
{
    public interface IAttractionsRepository
    {
        Task AddAttractions(string name, string description, string location, decimal costs, int tripId);
        Task<List<Attraction>> GetAttractionsByTripId(int tripId);
    }

    public class AttractionsRepository : IAttractionsRepository
    {
        public async Task<List<Attraction>> GetAttractionsByTripId(int tripId)
        {
            using (var context = new MyVacationMemoryContext())
            {
                var attractions = await context.Attractions.Where(a => a.TripId == tripId).ToListAsync();

                return attractions;
            }
        }

        public async Task AddAttractions(string name, string description, string location, decimal costs, int tripId)
        {
            using (var context = new MyVacationMemoryContext())
            {
                var newAttraction = new Attraction()
                {
                    AttractionName = name,
                    Description = description,
                    Cost = costs,
                    TripId = tripId,
                    Location = location
                };

                context.Attractions.Add(newAttraction);

                await context.SaveChangesAsync();
            }
        }
    }
}
