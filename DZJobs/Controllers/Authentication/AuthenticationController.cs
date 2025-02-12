
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using User.Managment.Service.Models;
using User.Managment.Service.Models.Authentication;
using User.Managment.Service.Models.Authentication.Login;
using User.Managment.Service.Models.Authentication.Signup;
using User.Managment.Service.Models.DTO;
using User.Managment.Service.Services;

namespace ANCIA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IEmailServices _emailService;
        private readonly IUserService _userService;

        public AuthenticationController( IEmailServices emailService,IUserService userService)
        {

            _emailService = emailService;
            _userService = userService;
        }

        [HttpPost]
        [Route("seed-Roles")]
        public async Task<IActionResult> SeedRoles()
        {
            var seedRole = await _userService.SeedRoleAsync();
            return Ok(new Response { Status= seedRole.Status,Message = seedRole.Message, StatusCode=seedRole.StatusCode});
        }
        // Route Make User Admin
        [HttpPost]
        [Route("Give-User-Role")]
        public async Task<IActionResult> MakeUser([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var response = await _userService.MakeUserAsync(updatePermissionDto);
            if (response.Status)
            {
                    var message = new EmailContent(new string[] { response.Email },"Congratulation","you have Guaranted for <b>User Role</b> As Requested");
                     _emailService.SendEmail(message);

                return Ok(new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode });
            }
            return Ok(new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode });
        }
        [HttpPost]
        [Route("Give-Admin-Role")]
        public async Task<IActionResult> MakeUserAdmin([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var response = await _userService.MakeAdminAsync(updatePermissionDto);
            if (response.Status)
            {
                var message = new EmailContent(new string[] { response.Email }, "Congratulation", "you have Guaranted for <b>Admin Role</b> As Requested");
                _emailService.SendEmail(message);

                return Ok(new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode });
            }
            return Ok(new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode });
        }
        [HttpPost]
        [Route("Give-Owner-Role")]
        public async Task<IActionResult> MakeUserOwner(UpdatePermissionDto updatePermissionDto)
        {
            var response = await _userService.MakeOwnerAsync(updatePermissionDto);
            if (response.Status)
            {
                var message = new EmailContent(new string[] { response.Email }, "Congratulation ", "you have Guaranted for <b>Owner Role</b> As Requested");
                _emailService.SendEmail(message);
                return Ok(new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode });
            }
            return Ok(new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode });
        }
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {
            var response = await _userService.GetAllUserAsync();
            return Ok(response);
        }
        [HttpPost("Create")]
        public async Task<ActionResult<Response>> Create([FromBody] RegisterUser user)
        {
           var response = await _userService.CreateuserAsync(user);
            if (response.Status == true)
            {
                var conformationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token = response.Token, email = response.Email }, Request.Scheme);
                var message = new EmailContent(new string[] { response.Email }, " Password And Conformation Link", " <h4> Well Come to Our Org, your Password is :<H2> " + response.Password + ".</H2> <br></br>!!! Please Comfirm with this Link <b>Unless you are not conformed./b> </H4>" + conformationLink);
                _emailService.SendEmail(message);
            }
            return Ok(new Response { Status = response.Status,Message = response.Message,StatusCode = response.StatusCode});

        }

        [HttpGet("Confirem Email/Auto")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var response = await _userService.ConfirmEmailAsync(token, email);
            return Ok(new Response { Status = response.Status, Message = response.Message,StatusCode = response.StatusCode });

        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(Login login) { 

        var response = await _userService.LoginAsync(login);
            if (response.Status == true)
            {
                var message = new EmailContent(new string[] { response.Email }, "OTP from Sola Please Confierm it ASAP", response.Token);
                _emailService.SendEmail(message);
            }
                return Ok(new Response { Status = response.Status, Message = response.Message,StatusCode = response.StatusCode });
        }

        [HttpPost("Confirm-OTP")]
        public async Task<IActionResult> ConfirmOTP(string code, string username)
        {
            var response = await _userService.ConfirmOTPAsync(code,username);
             return BadRequest(new Response { Status = response.Status,Message = response.Token,StatusCode = response.StatusCode });
        }


        [HttpPost("Forgot-Password")]
        public async Task<IActionResult> ForgetPassword([Required] string email)
        {
            var response = await _userService.ForgetPasswordAsync(email);
            var forgotePasswordlink = Url.Action(nameof(ResetPassword), "Authentication", new { token = response.Token, email = response.Email }, Request.Scheme);
            var message = new EmailContent(new string[] { response.Email }, "Forget Password Email", forgotePasswordlink!);
            _emailService.SendEmail(message); 
            return NotFound(new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode });
        }
        [HttpGet("Reset-Password/Auto")]
        public IActionResult ResetPassword(string token, string email)
        {
            var model = new ResetPassword { Token = token, Email = email };
            return Ok(new { model });
        }
        [HttpPost("Reset-Password")]
        [AllowAnonymous]
        public async Task<ActionResult<Response>> ResetPassword(ResetPassword resetPassword)
        {
          var response = await _userService.ResetPasswordAsync(resetPassword);
            return new Response { Status = response.Status, Message = response.Message, StatusCode = response.StatusCode };

            }


        [HttpGet("Test Email")]
        public async Task<IActionResult> TestEmail()
        {
            var message = new EmailContent(new string[] { "solomonsefiw91@gmail.com","solayemam1234@gmail.com" }, "Melti Msg Test Message", "this is test message");
            _emailService.SendEmail(message);
            return Ok(new Response{ Status = true, Message = "Mail Server Worked Successfully"});

        }
    }
}
