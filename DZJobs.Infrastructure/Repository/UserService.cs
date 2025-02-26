using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using User.Managment.Service.Models.Authentication;
using User.Managment.Service.Models.DTO;
using User.Managment.Service.Services;
using Microsoft.EntityFrameworkCore;
using DZJobs.Domain.User;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Org.BouncyCastle.Crypto;
using DZJobs.Application.Models.Authentication.Login;
using DZJobs.Application.Models.Authentication.Signup;

namespace User.Managment.Service.Repository
{
    public class UserService : IUserService
    {
        private readonly UserManager<DZJobUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<DZJobUser> _signInManager;

        public UserService(UserManager<DZJobUser> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configuration,
            SignInManager<DZJobUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
        }

        public async Task<ResponseDto> SeedRoleAsync()
        {
            bool isAdminExist = await _roleManager.RoleExistsAsync(StaticUserRole.ADMIN);
            bool isOwnerExist = await _roleManager.RoleExistsAsync(StaticUserRole.EMPLOYER);
            bool isUserExist = await _roleManager.RoleExistsAsync(StaticUserRole.FREELANCER);

            if (isAdminExist && isOwnerExist && isUserExist)
            {
                return new ResponseDto
                {
                    Status = false,
                    Message = "Role Seeding Allready Exist !!"
                };
            }
           
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRole.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRole.EMPLOYER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRole.FREELANCER));

            return new ResponseDto
            {
                Status = true,
                Message = "User Seeding Successfully"
            };
        }
        public async Task<ResponseDto> MakeFreelancerAsync(UpdatePermissionDto updatePermissionDto)
        {
            // Try to find the user by email.
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == updatePermissionDto.Email);
            if (user is null)
            {
                return new ResponseDto
                {
                    Status = false,
                    Message = "Invalid FREELANCER Email or user does not exist."
                };
            }

            // Add the user to the FREELANCER role and check the result.
            var result = await _userManager.AddToRoleAsync(user, StaticUserRole.FREELANCER);
            if (!result.Succeeded)
            {
                // If there are errors, join the error messages.
                var errorMessage = string.Join(" | ", result.Errors.Select(e => e.Description));
                return new ResponseDto
                {
                    Status = false,
                    Message = $"Failed to add role: {errorMessage}"
                };
            }

            return new ResponseDto
            {
                Status = true,
                Message = $"You have added a new role: FREELANCER. The role has been confirmed for email {user.Email}.",
                StatusCode = StatusCodes.Status200OK,
                Email = user.Email!
            };
        }

        public async Task<ResponseDto> MakeAdminAsync(UpdatePermissionDto updatePermissionDto)
        {

            // var user = await _userManager.FindByEmailAsync(updatePermissionDto.Email);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == updatePermissionDto.Email);

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
                Message = $"You Have Add new Role : ADMIN Role And User is Confirmd on Email {user.Email} ",
                StatusCode = StatusCodes.Status200OK,
                Email = user.Email!
            };
        }

        public async Task<ResponseDto> MakeEmployerAsync(UpdatePermissionDto updatePermissionDto)
        {
            // var user = await _userManager.FindByEmailAsync(updatePermissionDto.Email);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == updatePermissionDto.Email);

            if (user is null)
            {
                return new ResponseDto()
                {
                    Status = false,
                    Message = "Invalid User Email or User Not Exist"
                };
            }
            await _userManager.AddToRoleAsync(user, StaticUserRole.EMPLOYER);
            return new ResponseDto()
            {
                Status = true,
                Message = $"You Have Add new Role : EMPLOYER Role And User is Confirmd on Email {user.Email} ",
                StatusCode = StatusCodes.Status200OK,
                Email = user.Email!
            };
        }

        public async Task<ResponseDto> ConfirmEmailAsync(string token, string email)
        {
           // var user = await _userManager.FindByEmailAsync(email);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email);

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


        public async Task<ResponseDto> ConfirmOTPAsync(string code, string email)
        {
            // Find the user by email
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email);
            
            if (user == null)
            {
                return new ResponseDto
                {
                    Status = false,
                    Message = $"Email {email} does not exist. Please check it.",
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            // Validate the OTP using the VerifyTwoFactorTokenAsync method
            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, "Email", code);
            if (!isValid)
            {
                return new ResponseDto
                {
                    Status = false,
                    Message = $"Incorrect OTP. Please check your email {user.Email} and try again.",
                    StatusCode = StatusCodes.Status401Unauthorized
                };
            }

            // If valid, generate the JWT token and return success
            var role = await _userManager.GetRolesAsync(user);
            var jwtToken = await GetToken(user);
            return new ResponseDto
            {
                Status = true,
                UserId = user.Id,
                Message = "Success",
                Role = role[0].ToString(),
                StatusCode = StatusCodes.Status200OK,
                Email = user.Email,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtToken)
            };
        }

        public async Task<ResponseDto> CreateuserAsync(RegisterUser registerUser)
        {
            //if (user == null) 
            //    throw new ArgumentNullException(nameof(user));

            //var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            var userExist = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == registerUser.Email);

            if (userExist != null)
                return new ResponseDto { Status = false, Message = $"User Email {userExist.Email} Already Registerd", StatusCode = StatusCodes.Status302Found };
            var newUser = new DZJobUser()
            {
                UserName = registerUser.Username,
                IsVerified = registerUser.IsVerified,
                SecurityStamp = Guid.NewGuid().ToString(),
                TwoFactorEnabled = true,
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                Email = registerUser.Email,
                NormalizedEmail = registerUser.Email?.Trim().ToUpper()


            };
        //var random = new Random();
        //    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        //    var password = new string(Enumerable.Repeat(chars, random.Next(8, 12))
        //        .Select(s => s[random.Next(s.Length)]).ToArray());

        //    while (!password.Any(char.IsDigit))
        //    {
        //        password = password + new string(Enumerable.Repeat("0123456789", random.Next(1, 3))
        //       .Select(s => s[random.Next(s.Length)]).ToArray());
        //    }
            var response = await _userManager.CreateAsync(newUser, registerUser.password);
            if (response.Succeeded)
            {
                // Verfy Email by Conformation Link
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                return new ResponseDto
                {
                    Status = true,
                    Message = $"User Created Successfully And Password is Sent, Please Comform The Email By Click the Link on Email : {newUser.Email}",
                    StatusCode = StatusCodes.Status201Created,
                    Token = token,
                    Email = newUser.Email,
                    Password = registerUser.password,
                    UserId = newUser.Id,
                    Username = newUser.UserName,
                    FirstName = newUser.FirstName,
                    LastName = newUser.LastName
                };
            }
            else
                return new ResponseDto { Status = false, Message = "Failed to Create User", StatusCode = StatusCodes.Status500InternalServerError };

        }

        public async Task<ResponseDto> ForgetPasswordAsync(string email)
        {
          //  var user = await _userManager.FindByEmailAsync(email);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email);

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
           // var user = await _userManager.FindByEmailAsync(login.Email);
            //var normalizedEmail = login.Email?.Trim().ToUpper();
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == login.Email);
            if (user == null)
            {
                return new ResponseDto { Status = false, Message = "Invalid username or password", StatusCode = StatusCodes.Status401Unauthorized };
            }

            if (!await _userManager.CheckPasswordAsync(user, login.Password))
            {
                return new ResponseDto { Status = false, Message = "Invalid username or password", StatusCode = StatusCodes.Status401Unauthorized };
            }

            if (user.TwoFactorEnabled)
            {
                var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");
                return new ResponseDto
                {
                    Status = true,
                    Email = user.Email,
                    Username = user.UserName,
                    Message = $"We have sent an OTP to {user.Email}. Please confirm ASAP.",
                    StatusCode = StatusCodes.Status202Accepted,
                    Token = token
                };
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, login.Password, false, false);
            if (signInResult.Succeeded)
            {
                var jwtToken = await GetToken(user);
                return new ResponseDto
                {
                    Status = true,
                    Username = user.UserName,
                    StatusCode = StatusCodes.Status200OK,
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    Email = user.Email
                };
            }

            return new ResponseDto { Status = false, Message = "Login failed", StatusCode = StatusCodes.Status401Unauthorized };
        }


        //public async Task<ResponseDto> LoginAsync(Login login)
        //{
        //    var user = await _userManager.FindByNameAsync(login.Username);
        //    // Auth With 2FA
        //    if (user!.TwoFactorEnabled)
        //    {
        //        if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
        //        {
        //            await _signInManager.SignOutAsync();
        //            await _signInManager.PasswordSignInAsync(user, login.Password, false, true);
        //            var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");
        //            return new ResponseDto { Status = true, Message = $"We Have Send OTP to your Email {user.Email} Please Comfirm ASAP.", StatusCode = StatusCodes.Status202Accepted, Email = user.Email!, Token = token };
        //        }
        //        else
        //            return new ResponseDto { Status = false, Message = $"User Account on Email {user!.Email} Not Exist", StatusCode = StatusCodes.Status404NotFound };
        //    }
        //    else
        //    //With Out 2FA
        //    if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
        //    {

        //        var jwtToken = await GetToken(user);
        //        return new ResponseDto { Status = true, Message = $"Login Successfully ", StatusCode = StatusCodes.Status200OK, Email = user.Email!, Token = new JwtSecurityTokenHandler().WriteToken(jwtToken) };
        //    }
        //    //if not Exist
        //    else
        //        return new ResponseDto { Status = false, Message = $"User Account Not Exist on Email {user!.Email}", StatusCode = StatusCodes.Status404NotFound };
        //}

        public async Task<ResponseDto> ResetPasswordAsync(ResetPassword resetPassword)
        {
          //  var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == resetPassword.Email);

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

        private async Task<JwtSecurityToken> GetToken(DZJobUser user)
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

        public async Task<ICollection<DZJobUser>> GetAllUserAsync() => await _userManager.Users.ToListAsync();
    }
}
