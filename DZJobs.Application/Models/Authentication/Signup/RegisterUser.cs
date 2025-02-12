namespace User.Managment.Service.Models.Authentication.Signup
{
    public class RegisterUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Location { get; set; }
        public string Bio { get; set; }
        public string Skills { get; set; }
        public decimal Rating { get; set; }
        public bool IsVerified { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
