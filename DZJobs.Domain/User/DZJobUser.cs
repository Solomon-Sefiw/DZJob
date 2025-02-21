using Microsoft.AspNetCore.Identity;

public class DZJobUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsVerified { get; set; }
    public string ProfilePictureUrl { get; set; } // Profile picture
    public string Bio { get; set; } // Short description

    public ICollection<Job> JobsPosted { get; set; } = new List<Job>();
    public ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
    public ICollection<Contract> Contracts { get; set; } = new List<Contract>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<Message> Messages { get; set; } = new List<Message>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
