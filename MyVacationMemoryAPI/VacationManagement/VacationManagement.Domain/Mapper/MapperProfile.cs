using AutoMapper;
using VacationManagement.Domain.Models;
using VacationManagement.Infrastructure.Repository.Entities;

namespace VacationManagement.Domain.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<MyTrip, Trip>();
            CreateMap<Trip, MyTrip>();

            CreateMap<Restaurant, TripRestaurant>();

            CreateMap<Attraction, TripAttraction>();
        }
    }
}
