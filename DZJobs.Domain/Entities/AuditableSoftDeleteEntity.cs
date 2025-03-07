

namespace DZJobs.Domain.Entities
{
    public class AuditableSoftDeleteEntity
    {
        public bool? IsDeleted { get; set; }
        public string? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletionComment { get; set; }
    }
}
