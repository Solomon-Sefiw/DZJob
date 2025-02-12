namespace HCMS.Domain.User.UserNotification
{
    public class VerificationCode
    {
        public string Code { get; set; }
    }
    public record LoginRes(bool IsSuccess, bool? NeedVerification = false, bool? IsLockedOut = false);
}
