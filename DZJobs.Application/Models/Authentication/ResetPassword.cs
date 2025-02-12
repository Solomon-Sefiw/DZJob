using System.ComponentModel.DataAnnotations;

namespace User.Managment.Service.Models.Authentication
{
    public class ResetPassword
    {
        public string Password { get; set; } = null;
        [Compare("Password", ErrorMessage = "The Password And Confierm Password Not Match")]
        public string ConfirmPassword { get; set; } = null;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}
