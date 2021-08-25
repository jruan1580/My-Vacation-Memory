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
        Task<List<Trip>> GetTrips(int page, int offset);
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

        public async Task<List<Trip>> GetTrips(int page, int offset)
        {
            using (var context = new MyVacationMemoryContext())
            {
                var trips = context.Trips.Skip((page - 1) * offset).Take(offset);

                return await trips.ToListAsync();
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
