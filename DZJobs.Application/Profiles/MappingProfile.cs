using AutoMapper;
using DZJobs.Domain.User;
using HCMS.Domain;
using Microsoft.EntityFrameworkCore;


namespace HCMS.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<DZJobUserDto, DZJobUser>().ReverseMap();
       //     CreateMap<WorkflowEnabledEntity, WorkflowEnabledEntityDto>()
       //.ForMember(dest => dest.PeriodStart, opt => opt.MapFrom(src => EF.Property<DateTime>(src, "PeriodStart")))
       //    .ForMember(dest => dest.PeriodEnd, opt => opt.MapFrom(src => EF.Property<DateTime>(src, "PeriodEnd")));
        }
    }
}
