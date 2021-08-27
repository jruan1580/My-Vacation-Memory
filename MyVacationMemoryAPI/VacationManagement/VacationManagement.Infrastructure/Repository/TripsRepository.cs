using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacationManagement.Infrastructure.Repository.Entities;

namespace VacationManagement.Infrastructure.Repository
{
    public interface ITripsRepository
    {
        Task AddTrip(Trip newTrip);
        Task<Trip> GetTripById(long id);
        Task<int> GetTotalTripCount(string keyword = "");
        Task<List<Trip>> GetTripsByKeyword(int page, int offset, string keyword = "");
        Task UpdateTrip(long id, string name, string desc, string dest, DateTime start, DateTime? end, short rating);
    }

    public class TripsRepository : ITripsRepository
    {
        public async Task<Trip> GetTripById(long id)
        {
            using (var context = new MyVacationMemoryContext())
            {
                return await context.Trips.FirstOrDefaultAsync(t => t.Id == id);
            }
        }

        public async Task<int> GetTotalTripCount(string keyword = "")
        {
            using (var context = new MyVacationMemoryContext())
            {
                if (string.IsNullOrEmpty(keyword))
                {
                    return await context.Trips.CountAsync();
                }

                return await context.Trips
                            .Where(t => t.TripName.Contains(keyword)
                                || t.Destination.Contains(keyword)
                                || t.TripDescription.Contains(keyword)
                            ).CountAsync();
            }
        }

        public async Task<List<Trip>> GetTripsByKeyword(int page, int offset, string keyword = "")
        {
            using (var context = new MyVacationMemoryContext())
            {
                if (string.IsNullOrEmpty(keyword))
                {
                    return await context.Trips.Skip((page - 1) * offset).Take(offset).ToListAsync();
                }

                var trips = await context.Trips
                                .Where(t => t.TripName.Contains(keyword)
                                    || t.Destination.Contains(keyword)
                                    || t.TripDescription.Contains(keyword)
                                 )
                                .Skip((page - 1) * offset)
                                .Take(offset)
                                .ToListAsync();

                return trips;
            }
        }

        public async Task AddTrip(Trip newTrip)
        {
            using (var context = new MyVacationMemoryContext())
            {
                var existingTrip = await context.Trips.FirstOrDefaultAsync(t => t.TripName.Equals(newTrip.TripName.Trim(), StringComparison.InvariantCultureIgnoreCase)
                                            && t.Destination.Equals(newTrip.Destination.Trim(), StringComparison.InvariantCultureIgnoreCase)
                                            && t.StartDate == newTrip.StartDate
                                            && t.EndDate == newTrip.EndDate);
                if (existingTrip != null)
                {
                    throw new Exception("Trip with exact same name, dest, start, and end date already exists");
                }

                context.Trips.Add(newTrip);

                await context.SaveChangesAsync();
            }
        }

        public async Task UpdateTrip(long id, string name, string desc, string dest, DateTime start, DateTime? end, short rating)
        {
            using (var context = new MyVacationMemoryContext())
            {
                var trip = await context.Trips.FirstOrDefaultAsync(t => t.Id == id);

                if (trip == null)
                {
                    throw new Exception($"Unable to find trip with id: {id}");
                }

                trip.TripName = name;
                trip.TripDescription = desc;
                trip.Destination = dest;
                trip.StartDate = start;
                trip.EndDate = end;
                trip.Rating = rating;

                await context.SaveChangesAsync();
            }
        }
    }
}
