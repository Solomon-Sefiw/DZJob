using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DZJobs.Domain.Entities
{
    public enum UserRole
    {
        Freelancer = 1,
        Employer = 2,
        Admin = 3
    }
    public enum JobStatus
    {
        Open = 1,
        InProgress = 2,
        Closed = 3,
        Archived = 4
    }
    public enum ApplicationStatus
    {
        Pending = 1,
        Accepted = 2,
        Rejected = 3
    }

    public enum ContractStatus
    {
        Ongoing = 1,
        Completed = 2,
        Terminated = 3,
        OnHold = 4
    }
    public enum MilestoneStatus
    {
        Pending = 1,
        Completed = 2,
        Released = 3
    }
    public enum PaymentStatus
    {
        Pending = 1,
        Successful = 2,
        Failed = 3,
        Refunded = 4
    }
    public enum NotificationType
    {
        JobApplication = 1,
        ContractUpdate = 2,
        PaymentNotification = 3,
        MessageReceived = 4,
        SystemAlert = 5
    }
    public enum DisputeStatus
    {
        Open = 1,
        Resolved = 2,
        Escalated = 3
    }
    public enum SocialLoginProvider
    {
        Google = 1,
        Facebook = 2,
        LinkedIn = 3
    }
    public enum ContractPaymentMethod
    {
        Stripe = 1,
        PayPal = 2,
        BankTransfer = 3,
        Crypto = 4
    }
    public enum UserVerificationStatus
    {
        Unverified = 1,
        Verified = 2
    }
    public enum JobCategoryType
    {
        Design = 1,
        Development = 2,
        Marketing = 3,
        Writing = 4,
        CustomerSupport = 5,
        Finance = 6,
        Legal = 7
    }
    public enum JobType
    {
        FullTime = 1,
        PartTime = 2,
        Contract = 3,
        Freelance = 4
    }
    public enum JobPaymentType
    {
        Hourly = 1,
        FixedPrice = 2
    }
    public enum ReviewType
    {
        JobReview = 1,
        FreelancerReview = 2
    }
    public enum MessageType
    {
        Text = 1,
        File = 2,
        Image = 3
    }
    public enum RatingLevel
    {
        Poor = 1,
        Fair = 2,
        Good = 3,
        VeryGood = 4,
        Excellent = 5
    }
    public enum GeolocationType
    {
        FreelanceLocation = 1,
        JobLocation = 2
    }
    public enum FileType
    {
        PDF = 1,
        WordDocument = 2,
        Excel = 3,
        Image = 4,
        Video = 5,
        Audio = 6
    }
    public enum NotificationStatus
    {
        Read = 1,
        Unread = 2
    }
    public enum PaymentMethod
    {
        CreditCard = 1,
        DebitCard = 2,
        PayPal = 3,
        BankTransfer = 4
    }

}
