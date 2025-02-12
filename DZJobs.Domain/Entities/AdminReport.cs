public class AdminReport : BaseEntity
{
    public string ReportName { get; set; }
    public string Content { get; set; }
    public DateTime GeneratedDate { get; set; }
}
