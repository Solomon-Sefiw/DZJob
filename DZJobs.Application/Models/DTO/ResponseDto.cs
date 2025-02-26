namespace User.Managment.Service.Models.DTO
{
    public class ResponseDto
    {
        public string UserId { get; set; }
        public string? Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
        public string Token  { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
