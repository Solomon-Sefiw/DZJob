using System.ComponentModel.DataAnnotations.Schema;
using DZJobs.Domain.User;

public class Message : BaseEntity
{
    //public int JobId { get; set; }
    //public Job Job { get; set; }
    public string SenderId { get; set; }
    [ForeignKey("SenderId")]
    public DZJobUser Sender { get; set; }
    public string ReceiverId { get; set; }
    [ForeignKey("ReceiverId")]
    public DZJobUser Receiver { get; set; }
    public string Content { get; set; }
    public DateTime SentAt { get; set; } // When the message was sent
    public bool IsRead { get; set; } // Whether the message is read or not
}
