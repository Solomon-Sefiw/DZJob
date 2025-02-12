using DZJobs.Domain.User;

public class FileUpload : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public string FileType { get; set; }  // e.g., PDF, DOCX, Image
    public DateTime UploadedDate { get; set; }
}
