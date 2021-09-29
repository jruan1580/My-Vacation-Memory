using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VacationManagement.Domain.Models;
using VacationManagement.Infrastructure.Repository;
using VacationManagement.Infrastructure.Repository.Entities;

namespace VacationManagement.Domain.Services
{
    public class TripRestaurantService
    {
        private readonly IRestaurantRepository _restaurantRepository;
        private readonly IMapper _mapper;

        public TripRestaurantService(IRestaurantRepository restaurantRepository, IMapper mapper)
        {
            _restaurantRepository = restaurantRepository;
            _mapper = mapper;
        }

        public async Task<List<TripRestaurant>> GetRestaurantsByTripId(int tripId)
        {
            if (tripId < 0)
            {
                throw new ArgumentException("Invalid trip id");
            }

            var restaurants = await _restaurantRepository.GetRestaurantsByTripId(tripId);

            return _mapper.Map<List<Restaurant>, List<TripRestaurant>>(restaurants);
        }

        public async Task AddRestaurantToTrip(int tripId, string name, string location, string costRange, string style)
        {
            HasValidParametersToAddTrip(tripId, name, location, costRange, style);

            await _restaurantRepository.AddRestaurantToTrip(tripId, name, style, costRange);
        }

        private void HasValidParametersToAddTrip(int tripId, string name, string location, string costRange, string style)
        {
            if (tripId < 0)
            {
                throw new ArgumentException("Invalid trip id");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Must pass in a name");
            }

            if (string.IsNullOrEmpty(costRange))
            {
                throw new ArgumentException("Cost range is not provided");
            }

            if (string.IsNullOrEmpty(style))
            {
                throw new ArgumentException("Style is not provided.");
            }
        }
    }
}
