using DZJobs.Domain.User;

public class FileUpload : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public string FileType { get; set; }  // e.g., PDF, DOCX, Image11
    public DateTime UploadedDate { get; set; }
}
