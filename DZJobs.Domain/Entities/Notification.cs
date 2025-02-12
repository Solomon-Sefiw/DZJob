using DZJobs.Domain.Entities;
using DZJobs.Domain.User;

public class Notification : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; }
    public NotificationType Type { get; set; }  // Enum: Job Application, Contract Update
    public DateTime CreatedAt { get; set; }
}
