using DZJobs.Domain.User;

public class Skill : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<DZJobUser> DZJobUsers { get; set; }
}
