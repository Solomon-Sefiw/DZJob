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
        Approved = 3,
        Archived = 4,
        Closed = 5
    }
    public enum ApplicationStatus
    {
        Pending = 1,
        Accepted = 2,
        Rejected = 3,
        Approved = 4,
        InContract = 5
    }

    public enum ContractStatus
    {
        Draft = 0,
        Pending = 1,      // Contract is created but not yet signed by both parties
        Active = 2,       // Both freelancer and employer have agreed, and work has started
        Completed = 3,    // All milestones are completed, and the contract is successfully finished
        Terminated = 4,    // Contract was canceled before completion
        Disputed = 5
    }
    public enum MilestoneStatus
    {
        Pending = 1,
        InProgress,
        Completed,
        Canceled
    }
    public enum PaymentStatus
    {
        Pending = 1,
        Completed = 2,
        Failed = 3,
        Refunded = 4
    }
    public enum PaymentMethod
    {
        BankTransfer = 1,
        Stripe = 2,
       CreditCard = 3,
        DebitCard = 4,
        PayPal = 5,
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
    public enum JobCategory
    {
        IT = 1,
        Marketing,
        Finance,
        Healthcare,
        Education,
        Engineering,
        Sales,
        CustomerService,
        Writing,
        Design,
        Legal,
        Consulting,
        Others
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
    //public enum PaymentMethod
    //{
    //    CreditCard = 1,
    //    DebitCard = 2,
    //    PayPal = 3,
    //    BankTransfer = 4
    //}

}
