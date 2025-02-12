public class Proposal : BaseEntity
{
    public string JobApplicationId { get; set; }
    public JobApplication JobApplication { get; set; }
    public string Content { get; set; }
    public decimal ProposedPrice { get; set; }
    public DateTime SubmittedDate { get; set; }
}
