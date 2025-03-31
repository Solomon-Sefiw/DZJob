
using DZJobs.Application.Features.Users.Commands.Documents;
using DZJobs.Application.Models.Authentication.Login;
using DZJobs.Application.Models.Authentication.Signup;
using DZJobs.Controllers;
using DZJobs.Domain.User;
using HCMS.Api.Dto;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using User.Managment.Service.Models;
using User.Managment.Service.Models.Authentication;
using User.Managment.Service.Models.DTO;
using User.Managment.Service.Services;

namespace ANCIA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : BaseController<AuthenticationController>
    {
        private readonly IEmailServices _emailService;
        private readonly IUserAccontService _userService;

        public AuthenticationController(IEmailServices emailService, IUserAccontService userService)
        {

            _emailService = emailService;
            _userService = userService;
        }

        [HttpPost]
        [Route("seed-Roles")]
        public async Task<ActionResult<ResponseDto>> SeedRoles()
        {
            var seedRole = await _userService.SeedRoleAsync();
            return Ok(seedRole);
        }
        // Route Make User Admin
        [HttpPost("addRole/Freelancer", Name = "MakeUserFreelancer")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> MakeUserFreelancer([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var response = await _userService.MakeFreelancerAsync(updatePermissionDto);
            if (response.Status)
            {
                //var message = new EmailContent([response.Email],"Congratulation", "you have Guaranted for <b>FREELANCER Role</b> As Requested");
                // _emailService.SendEmail(message);

                return Ok(response);
            }
            return Ok(response);
        }

        [HttpPost("addRole/Admin", Name = "MakeUserAdmin")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> MakeUserAdmin([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var response = await _userService.MakeAdminAsync(updatePermissionDto);
            if (response.Status)
            {
                //var message = new EmailContent([response.Email], "Congratulation", "you have Guaranted for <b>ADMIN Role</b> As Requested");
                //_emailService.SendEmail(message);

                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPost("addRole/Employer", Name = "MakeUserEmployer")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> MakeUserEmployer(UpdatePermissionDto updatePermissionDto)
        {
            var response = await _userService.MakeEmployerAsync(updatePermissionDto);
            if (response.Status)
            {
                //var message = new EmailContent(new string[] { response.Email }, "Congratulation ", "you have Guaranted for <b>EMPLOYER Role</b> As Requested");
                //_emailService.SendEmail(message);
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpGet("GetAll", Name = "GetAllUser")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<DZJobUser>>> GetAllUser()
        {
            var response = await _userService.GetAllUserAsync();
            return Ok(response);
        }

        [HttpGet("GetById", Name = "GetUserById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<DZJobUserDto>> GetUserById(string Id)
        {
            var response = await _userService.GetUserByIdAsync(Id); 
            response.PhotoUrl = GetDocumentUrl(response.PhotoId);
            return Ok(response);
        }

        [HttpPost("Create", Name = "CreateUser")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> CreateUser([FromBody] RegisterUser user)
        {
            var response = await _userService.CreateuserAsync(user);
            if (response.Status == true)
            {
                var conformationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token = response.Token, email = response.Email }, Request.Scheme);
                //var message = new EmailContent(new string[] { response.Email }, " Password And Conformation Link", " <h4> Well Come to DZ-Jobs , your Password is :<H2> " + response.Password + ".</H2> <br></br>!!! Please Comfirm with this Link <b>Unless you are not conformed./b> </H4>" + conformationLink);
                //_emailService.SendEmail(message);
            }
            return Ok(response);

        }

        [HttpGet("Confirem/Auto", Name = "ConfirmEmail")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> ConfirmEmail(string token, string email)
        {
            var response = await _userService.ConfirmEmailAsync(token, email);
            return Ok(response);

        }

        [HttpPost("login", Name = "Login")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> Login([FromBody] Login login)
        {
            var response = await _userService.LoginAsync(login);
            if (response.Status == true)
            {
                //var message = new EmailContent(new string[] { response.Email }, "OTP from Sola Please Confierm it ASAP", response.Token);
                //_emailService.SendEmail(message);

            }
            return Ok(response);
        }

        [HttpPost("Confirm-OTP", Name = "ConfirmOTP")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> ConfirmOTP(string code, string email)
        {
            var response = await _userService.ConfirmOTPAsync(code, email);
            if (response.Status)
                return Ok(response);
            else
                return BadRequest(response);
        }


        [HttpPost("Forgot-Password", Name = "ForgetPassword")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResponseDto>> ForgetPassword([Required] string email)
        {
            var response = await _userService.ForgetPasswordAsync(email);
            var forgotePasswordlink = Url.Action(nameof(ResetPassword), "Authentication", new { token = response.Token, email = response.Email }, Request.Scheme);
            var message = new EmailContent(new string[] { response.Email }, "Forget Password Email", forgotePasswordlink!);
            _emailService.SendEmail(message);
            return Ok(response);
        }

        //[HttpGet("Reset-Password/Auto", Name = "ResetPassword")]
        //[ProducesResponseType(200)]
        //public async Task<ActionResult<ResetPassword>> ResetPassword(string token, string email)
        //{
        //    var model = new ResetPassword { Token = token, Email = email };
        //    return Ok(new { model });
        //}

        //[HttpPost("Reset-Password", Name = "ResetPassword")]
        //[ProducesResponseType(200)]
        //[AllowAnonymous]
        //public async Task<ActionResult<Response>> ResetPassword(ResetPassword resetPassword)
        //{
        //    var response = await _userService.ResetPasswordAsync(resetPassword);
        //    return Ok(response);

        //}


        [HttpGet("Reset-Password/Auto", Name = "ResetPassword")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ResetPassword>> ResetPassword(string token, string email)
        {
            var model = new ResetPassword { Token = token, Email = email };
            return Ok(new { model });
        }

        [HttpPost("Reset-Password", Name = "PasswordRest")]
        [ProducesResponseType(200)]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto>> PasswordRest(ResetPassword resetPassword)
        {
            var response = await _userService.ResetPasswordAsync(resetPassword);
            return Ok(response);
        }
        //[HttpPost("{id}/add-photo", Name = "AddUserPhoto")]
        //[ProducesResponseType(200)]
        //public async Task<DocumentMetadataDto> AddUserPhoto(string id, [FromForm] UploadDocumentDto document)
        //{
        //    var command = new AddUserPhotoCommand(id, document.File);
        //    var doc = await mediator.Send(command);

        //    return new DocumentMetadataDto(GetDocumentUrl(doc.Id));
        //}
        [HttpPost("{id}/add-photo", Name = "AddUserPhoto")]
        [ProducesResponseType(200)]
        public async Task<DocumentMetadataDto> AddUserPhoto(string id, [FromForm] UploadDocumentDto document)
        {
            var command = new AddUserPhotoCommand(id, document.File);
            var doc = await mediator.Send(command);

            return new DocumentMetadataDto(GetDocumentUrl(doc.Id));
        }


        [HttpGet("Test Email")]
        public async Task<IActionResult> TestEmail()
        {
            var message = new EmailContent(new string[] { "solomonsefiw91@gmail.com", "solayemam1234@gmail.com" }, "Melti Msg Test Message", "this is test message");
            _emailService.SendEmail(message);
            return Ok("Mail Server Worked Successfully");

        }
    }
}
