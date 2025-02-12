using System.ComponentModel.DataAnnotations;

namespace User.Managment.Service.Models.DTO
{
    public class UpdatePermissionDto
    {
        [Required(ErrorMessage = "Email is Required !")]
        public string Email { get; set; }
    }
}
