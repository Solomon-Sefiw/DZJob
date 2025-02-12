using System.ComponentModel.DataAnnotations.Schema;
using DZJobs.Domain.User;

public class Message : BaseEntity
{
    //public int JobId { get; set; }
    //public Job Job { get; set; }
    public string SenderId { get; set; }
    [ForeignKey("SenderId")]
    public DZJobUser Sender { get; set; }
    //public string ReceiverId { get; set; }
    //[ForeignKey("ReceiverId")]
    //public User Receiver { get; set; }
    public string Content { get; set; }
    public DateTime SentDate { get; set; }
}
