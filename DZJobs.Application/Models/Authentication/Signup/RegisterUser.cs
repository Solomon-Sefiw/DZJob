namespace User.Managment.Service.Models.Authentication.Signup
{
    public class RegisterUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string password { get; set; }

        public bool IsVerified { get; set; }
    }
}
