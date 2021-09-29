using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VacationManagement.Domain.Models;
using VacationManagement.Infrastructure.Repository;
using VacationManagement.Infrastructure.Repository.Entities;

namespace VacationManagement.Domain.Services
{
    public interface ITripAttractionService
    {
        Task AddTripAttraction(int tripId, string name, string description, string location, decimal costs);
        Task<List<TripAttraction>> GetAttractionsByTripId(int tripId);
        void ValidateAddTripAttractionParams(int tripId, string name, string description, string location, decimal costs);
    }

    public class TripAttractionService : ITripAttractionService
    {
        private readonly IAttractionsRepository _attractionRepository;
        private readonly IMapper _mapper;

        public TripAttractionService(IAttractionsRepository attractionsRepository, IMapper mapper)
        {
            _attractionRepository = attractionsRepository;
            _mapper = mapper;
        }

        public async Task<List<TripAttraction>> GetAttractionsByTripId(int tripId)
        {
            if (tripId < 0)
            {
                throw new ArgumentException("Trip id is invalid");
            }

            var trips = await _attractionRepository.GetAttractionsByTripId(tripId);

            return _mapper.Map<List<Attraction>, List<TripAttraction>>(trips);
        }

        public async Task AddTripAttraction(int tripId, string name, string description, string location, decimal costs)
        {
            ValidateAddTripAttractionParams(tripId, name, description, location, costs);

            await _attractionRepository.AddAttractions(name, description, location, costs, tripId);
        }

        public void ValidateAddTripAttractionParams(int tripId, string name, string description, string location, decimal costs)
        {
            if (tripId < 0)
            {
                throw new ArgumentException("Invalid trip id");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Must pass in a name");
            }

            if (string.IsNullOrEmpty(location))
            {
                throw new ArgumentException("Location was not provided");
            }

            if (string.IsNullOrEmpty(description))
            {
                throw new ArgumentException("Description was not provided");
            }

            if (costs < 0)
            {
                throw new ArgumentException("Cost can not be less than 0");
            }
        }
    }
}
