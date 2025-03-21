﻿using DZJobs.Application.Models.Authentication.Login;
using DZJobs.Application.Models.Authentication.Signup;
using DZJobs.Domain.User;
using User.Managment.Service.Models.Authentication;
using User.Managment.Service.Models.DTO;

namespace User.Managment.Service.Services
{
    public interface IUserAccontService
    {
        public Task<ResponseDto> SeedRoleAsync();
        Task<ResponseDto> CreateuserAsync(RegisterUser registerUser);
        Task<ResponseDto> LoginAsync(Login login);
        Task<ResponseDto> ConfirmEmailAsync(string token,string email);
        Task<ResponseDto> ConfirmOTPAsync(string code, string username);
        Task<ResponseDto> ForgetPasswordAsync(string email);
        Task<ResponseDto> ResetPasswordAsync(ResetPassword resetPassword);
        Task<ResponseDto> MakeAdminAsync(UpdatePermissionDto updatePermissionDto);
        Task<ResponseDto> MakeEmployerAsync(UpdatePermissionDto updatePermissionDto);
        Task<ResponseDto> MakeFreelancerAsync(UpdatePermissionDto updatePermissionDto);
        Task<ICollection<DZJobUser>> GetAllUserAsync();
        Task<DZJobUserDto> GetUserByIdAsync(string Id);
    }
}
