
using DZJobs.Domain.Common;
using HCMS.Domain.Enum;

namespace DZJobs.Domain.Entities
{
    public class UserDocument : AuditableSoftDeleteEntity
    {
        public int Id { get; set; }
        public string userId { get; set; }
        public DocumentType DocumentType { get; set; }
        public string DocumentId { get; set; }
        public string FileName { get; set; }
    }
}
