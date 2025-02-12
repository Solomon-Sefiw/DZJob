using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using User.Managment.Service.Models.Authentication;
using User.Managment.Service.Models.Authentication.Login;
using User.Managment.Service.Models.Authentication.Signup;
using User.Managment.Service.Models.DTO;

namespace User.Managment.Service.Services
{
    public interface IUserService
    {
        public Task<ResponseDto> SeedRoleAsync();
        Task<ResponseDto> CreateuserAsync(RegisterUser registerUser);
        Task<ResponseDto> LoginAsync(Login login);
        Task<ResponseDto> ConfirmEmailAsync(string token,string email);
        Task<ResponseDto> ConfirmOTPAsync(string code, string username);
        Task<ResponseDto> ForgetPasswordAsync(string email);
        Task<ResponseDto> ResetPasswordAsync(ResetPassword resetPassword);
        Task<ResponseDto> MakeAdminAsync(UpdatePermissionDto updatePermissionDto);
        Task<ResponseDto> MakeOwnerAsync(UpdatePermissionDto updatePermissionDto);
        Task<ResponseDto> MakeUserAsync(UpdatePermissionDto updatePermissionDto);
        Task<ICollection<IdentityUser>> GetAllUserAsync();
    }
}
