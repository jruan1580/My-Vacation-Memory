using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VacationManagement.Domain.Exceptions;
using VacationManagement.Domain.Models;
using VacationManagement.Infrastructure.Repository;
using VacationManagement.Infrastructure.Repository.Entities;

namespace VacationManagement.Domain.Services
{
    public interface IMyTripsService
    {
        Task<MyTrip> AddNewTrip(string name, string desc, string dest, DateTime start, DateTime? end, short rating);
        Task<MyTrip> GetMyTripById(long id);
        Task<List<MyTrip>> GetMyTripsByKeywordAndPage(int page, int offset, string keyword = "");
        Task<int> GetTotalTrips(string keyword = "");
        Task UpdateTrip(long id, string name, string desc, string dest, DateTime start, DateTime? end, short rating);
    }

    public class MyTripsService : IMyTripsService
    {
        private readonly ITripsRepository _tripsRepository;
        private readonly IMapper _mapper;

        public MyTripsService(ITripsRepository tripsRepository, IMapper mapper)
        {
            _tripsRepository = tripsRepository;
            _mapper = mapper;
        }

        public async Task<MyTrip> GetMyTripById(long id)
        {
            var trip = await _tripsRepository.GetTripById(id);

            if (trip == null)
            {
                throw new NotFoundException($"Unable to find id: {id}");
            }

            return _mapper.Map<MyTrip>(trip);
        }

        public async Task<List<MyTrip>> GetMyTripsByKeywordAndPage(int page, int offset, string keyword = "")
        {
            var trips = await _tripsRepository.GetTripsByKeyword(page, offset, keyword);

            return _mapper.Map<List<Trip>, List<MyTrip>>(trips);
        }

        public async Task<int> GetTotalTrips(string keyword = "")
        {
            return await _tripsRepository.GetTotalTripCount(keyword);
        }

        public async Task<MyTrip> AddNewTrip(string name, string desc, string dest, DateTime start, DateTime? end, short rating)
        {
            var newTrip = new MyTrip()
            {
                TripName = name,
                TripDescription = desc,
                Destination = dest,
                StartDate = start,
                EndDate = end,
                Rating = rating
            };

            var trip = await _tripsRepository.AddTrip(_mapper.Map<Trip>(newTrip));

            return _mapper.Map<MyTrip>(trip);
        }

        public async Task UpdateTrip(long id, string name, string desc, string dest, DateTime start, DateTime? end, short rating)
        {
            await _tripsRepository.UpdateTrip(id, name, desc, dest, start, end, rating);
        }
    }
}
