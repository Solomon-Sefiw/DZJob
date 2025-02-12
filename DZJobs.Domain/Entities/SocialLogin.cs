using DZJobs.Domain.User;

public class SocialLogin : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public string Provider { get; set; }  // Google, Facebook, LinkedIn
    public string ProviderUserId { get; set; }
    public DateTime LinkedAt { get; set; }
}
