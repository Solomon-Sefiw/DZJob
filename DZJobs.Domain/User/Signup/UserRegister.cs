using System.ComponentModel.DataAnnotations;

namespace HCMS.Domain.User.Signup
{
    public class UserRegister
    {
        public string UserName { get; set; }
        [EmailAddress]
        public string UserEmail { get; set; }
        public string Password { get; set; }
    }
}
