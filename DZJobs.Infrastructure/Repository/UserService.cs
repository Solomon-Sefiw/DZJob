using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using User.Managment.Service.Models.Authentication;
using User.Managment.Service.Models.Authentication.Login;
using User.Managment.Service.Models.Authentication.Signup;
using User.Managment.Service.Models.DTO;
using User.Managment.Service.Services;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace User.Managment.Service.Repository
{
    public class UserService : IUserService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<IdentityUser> _signInManager;

        public UserService(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configuration,
            SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
        }

        public async Task<ResponseDto> SeedRoleAsync()
        {
            bool isAdminExist = await _roleManager.RoleExistsAsync(StaticUserRole.ADMIN);
            bool isOwnerExist = await _roleManager.RoleExistsAsync(StaticUserRole.OWNER);
            bool isUserExist = await _roleManager.RoleExistsAsync(StaticUserRole.USER);

            if (isAdminExist && isOwnerExist && isUserExist)
            {
                return new ResponseDto
                {
                    Status = false,
                    Message = "Role Seeding Allready Exist !!"
                };
            }
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRole.USER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRole.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRole.OWNER));

            return new ResponseDto
            {
                Status = true,
                Message = "User Seeding Successfully"
            };
        }
        public async Task<ResponseDto> MakeUserAsync(UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByEmailAsync(updatePermissionDto.Email);
            if (user is null)
            {
                return new ResponseDto()
                {
                    Status = false,
                    Message = "Invalid User Email or User Not Exist"
                };
            }
            await _userManager.AddToRoleAsync(user, StaticUserRole.USER);
            return new ResponseDto()
            {
                Status = true,
                Message = $"You Have Add new Role : User Role And User is Confirmd on Email {user.Email} ",
                StatusCode = StatusCodes.Status200OK,
                Email = user.Email!
            };

        }
        public async Task<ResponseDto> MakeAdminAsync(UpdatePermissionDto updatePermissionDto)
        {

            var user = await _userManager.FindByEmailAsync(updatePermissionDto.Email);
            if (user is null)
            {
                return new ResponseDto()
                {
                    Status = false,
                    Message = "Invalid User Email or User Not Exist"
                };
            }
            await _userManager.AddToRoleAsync(user, StaticUserRole.ADMIN);
            return new ResponseDto()
            {
                Status = true,
                Message = $"You Have Add new Role : Admin Role And User is Confirmd on Email {user.Email} ",
                StatusCode = StatusCodes.Status200OK,
                Email = user.Email!
            };
        }

        public async Task<ResponseDto> MakeOwnerAsync(UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByEmailAsync(updatePermissionDto.Email);
            if (user is null)
            {
                return new ResponseDto()
                {
                    Status = false,
                    Message = "Invalid User Email or User Not Exist"
                };
            }
            await _userManager.AddToRoleAsync(user, StaticUserRole.OWNER);
            return new ResponseDto()
            {
                Status = true,
                Message = $"You Have Add new Role : Owner Role And User is Confirmd on Email {user.Email} ",
                StatusCode = StatusCodes.Status200OK,
                Email = user.Email!
            };
        }

        public async Task<ResponseDto> ConfirmEmailAsync(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return new ResponseDto
                    {
                        Status = true,
                        Message = $"Confirmed Successfully by your Email {email} ",
                        StatusCode = StatusCodes.Status200OK
                    };
                }
                else
                    return new ResponseDto { Status = false, Message = "Faild to Confirem", };
            }
            else
                return new ResponseDto { Status = false, Message = "User Not Exist", StatusCode = StatusCodes.Status404NotFound };
        }

        public async Task<ResponseDto> ConfirmOTPAsync(string code, string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var signIn = await _signInManager.TwoFactorSignInAsync("Email", code, false, false);
            if (user != null)
            {
                if (signIn.Succeeded)
                {
                    var jwtToken = await GetToken(user);

                    return new ResponseDto { Status = true, Message = "Login Success ", StatusCode = StatusCodes.Status200OK, Email = user.Email!, Token = new JwtSecurityTokenHandler().WriteToken(jwtToken) };
                }
                //if not Exist
                else
                    return new ResponseDto { Status = false, Message = $"Incorrect OTP Please Check Your Email {user.Email} And Try Again !!", StatusCode = StatusCodes.Status401Unauthorized };
            }
            //if not Exist
            else
                return new ResponseDto { Status = false, Message = $"your Email {user!.Email} Is Not Exist Please Check It.", StatusCode = StatusCodes.Status404NotFound };

        }

        public async Task<ResponseDto> CreateuserAsync(RegisterUser registerUser)
        {
            //if (user == null) 
            //    throw new ArgumentNullException(nameof(user));

            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
                return new ResponseDto { Status = false, Message = $"User Email {userExist.Email} Already Registerd", StatusCode = StatusCodes.Status302Found };
            var newUser = new IdentityUser()
            {
                Email = registerUser.Email,
                UserName = registerUser.Username,
                SecurityStamp = Guid.NewGuid().ToString(),
                TwoFactorEnabled = true
            };

            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var password = new string(Enumerable.Repeat(chars, random.Next(8, 12))
                .Select(s => s[random.Next(s.Length)]).ToArray());

            while (!password.Any(char.IsDigit))
            {
                password = password + new string(Enumerable.Repeat("0123456789", random.Next(1, 3))
               .Select(s => s[random.Next(s.Length)]).ToArray());
            }
            var response = await _userManager.CreateAsync(newUser, password);
            if (response.Succeeded)
            {
                // Verfy Email by Conformation Link
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                return new ResponseDto
                {
                    Status = true,
                    Message = $"User Created Successfully And Password is Sent, Please Comform The Email By Click the Link on Email : {newUser.Email}"
                    ,
                    StatusCode = StatusCodes.Status201Created,
                    Token = token,
                    Email = newUser.Email,
                    Password = password
                };
            }
            else
                return new ResponseDto { Status = false, Message = "Failed to Create User", StatusCode = StatusCodes.Status500InternalServerError };

        }

        public async Task<ResponseDto> ForgetPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                return new ResponseDto { Status = true, Message = $"Forget Password Link Send to {user.Email} Please Confierm", StatusCode = StatusCodes.Status202Accepted, Email = user.Email!, Token = token };
            }
            //if not Exist
            else
                return new ResponseDto { Status = false, Message = $"User Email {email} Not Exist Please Contact Admin", StatusCode = StatusCodes.Status404NotFound };
        }

        public async Task<ResponseDto> LoginAsync(Login login)
        {
            var user = await _userManager.FindByNameAsync(login.Username);
            // Auth With 2FA
            if (user!.TwoFactorEnabled)
            {
                if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
                {
                    await _signInManager.SignOutAsync();
                    await _signInManager.PasswordSignInAsync(user, login.Password, false, true);
                    var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");
                    return new ResponseDto { Status = true, Message = $"We Have Send OTP to your Email {user.Email} Please Comfirm ASAP.", StatusCode = StatusCodes.Status202Accepted, Email = user.Email!, Token = token };
                }
                else
                    return new ResponseDto { Status = false, Message = $"User Account on Email {user!.Email} Not Exist", StatusCode = StatusCodes.Status404NotFound };
            }
            else
            //With Out 2FA
            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {

                var jwtToken = await GetToken(user);
                return new ResponseDto { Status = true, Message = $"Login Successfully ", StatusCode = StatusCodes.Status200OK, Email = user.Email!, Token = new JwtSecurityTokenHandler().WriteToken(jwtToken) };
            }
            //if not Exist
            else
                return new ResponseDto { Status = false, Message = $"User Account Not Exist on Email {user!.Email}", StatusCode = StatusCodes.Status404NotFound };
        }

        public async Task<ResponseDto> ResetPasswordAsync(ResetPassword resetPassword)
        {
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            if (user != null)
            {
                var passwordResset = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
                if (!passwordResset.Succeeded)
                {
                    return new ResponseDto { Status = false, Message = "Faild to rest Password", StatusCode = StatusCodes.Status501NotImplemented };
                }
                else
                    return new ResponseDto { Status = true, Message = " Password Reset Success !!", StatusCode = StatusCodes.Status202Accepted, Token = resetPassword.Token, Email = resetPassword.Email };
            }
            //if not Exist
            else
                return new ResponseDto { Status = false, Message = $"Faild to rest Password on Email {resetPassword.Email}", StatusCode = StatusCodes.Status501NotImplemented };


        }

        private async Task<JwtSecurityToken> GetToken(IdentityUser user)
        {
            var authClimes = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
            var Roles = await _userManager.GetRolesAsync(user);
            foreach (var role in Roles)
            {
                authClimes.Add(new Claim(ClaimTypes.Role, role!));
            }
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(2),
                claims: authClimes,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        public async Task<ICollection<IdentityUser>> GetAllUserAsync() => await _userManager.Users.ToListAsync();
    }
}
