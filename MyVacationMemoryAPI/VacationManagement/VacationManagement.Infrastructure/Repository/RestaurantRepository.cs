using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VacationManagement.Infrastructure.Repository.Entities;

namespace VacationManagement.Infrastructure.Repository
{
    public interface IRestaurantRepository
    {
        Task AddRestaurantToTrip(long tripId, string name, string style, decimal lowerCost, decimal upperCost, string location);
        Task<List<Restaurant>> GetRestaurantsByTripId(long tripId);
    }

    public class RestaurantRepository : IRestaurantRepository
    {
        public async Task<List<Restaurant>> GetRestaurantsByTripId(long tripId)
        {
            using (var context = new MyVacationMemoryContext())
            {
                var restaurants = context.Restaurants.Where(r => r.TripId == tripId);

                return await restaurants.ToListAsync();
            }
        }

        public async Task AddRestaurantToTrip(long tripId, string name, string style, decimal lowerCost, decimal upperCost, string location)
        {
            var newRest = new Restaurant()
            {
                TripId = tripId,
                RestaurantName = name,
                Style = style,
                LowerCostRange = lowerCost,
                UpperCostRange = upperCost,
                Location = location
            };

            using (var context = new MyVacationMemoryContext())
            {
                context.Restaurants.Add(newRest);

                await context.SaveChangesAsync();
            }
        }
    }
}
