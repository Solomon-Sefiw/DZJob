

using System.Reflection.Emit;
using DZJobs.Domain.Entities;
using DZJobs.Domain.User;
using HCMS.Domain.Document;
using HCMS.Persistance.Interceptors;
using HCMS.Services.DataService;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SMS.Persistence.Interceptors;

namespace DZJobs.Persistence.DBContext
{
    public class DZJobsDBContext : IdentityDbContext<DZJobUser>, IDataService
    {
        public DZJobsDBContext(DbContextOptions<DZJobsDBContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ContractPayment>()
                        .HasOne(c => c.Employer)
                        .WithMany(u => u.ContractPayments)
                        .HasForeignKey(c => c.EmployerId)
                        .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            modelBuilder.Entity<ContractPayment>()
                        .HasOne(c => c.Freelancer)
                        .WithMany() // You can define this if JobSeeker has Contracts
                        .HasForeignKey(c => c.FreelancerId)
                        .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete
            modelBuilder.Entity<UserDocument>()
                        .HasOne(d => d.User)
                        .WithMany(u => u.UserDocuments)
                        .HasForeignKey(d => d.userId)
                        .OnDelete(DeleteBehavior.Cascade); // Cascade delete if needed
            modelBuilder.Entity<Document>()
                         .HasKey(d => d.Id); // Ensure Id is primary key
            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Job)  // Assuming 'Job' navigation exists in Contract
                        .WithMany(j => j.Contracts)
                        .HasForeignKey(c => c.JobId)
                        .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Review>()
                        .HasOne(c => c.Job)  // Assuming 'Job' navigation exists in Contract
                        .WithMany(j => j.Reviews)
                        .HasForeignKey(c => c.JobId)
                        .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<JobApplication>()
                        .HasOne(c => c.Job)  // Assuming 'Job' navigation exists in Contract
                        .WithMany(j => j.Applications)
                        .HasForeignKey(c => c.JobId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Employer) // Navigation property in Contract
                        .WithMany(u => u.Contracts) // Navigation property in DZJobUser
                        .HasForeignKey(c => c.EmployerId); // Foreign key in Contract
            modelBuilder.Entity<Message>()
                        .HasOne(m => m.Sender) // Navigation property in Message
                        .WithMany(u => u.Messages) // Navigation property in DZJobUser
                        .HasForeignKey(m => m.SenderId) // Foreign key in Message

                        .OnDelete(DeleteBehavior.Restrict); // Optional: Set delete behavior

            modelBuilder.Entity<Message>()
                        .HasOne(m => m.Receiver)
                        .WithMany() // You can add a collection to DZJobUser for received messages if needed
                        .HasForeignKey(m => m.ReceiverId)
                        .OnDelete(DeleteBehavior.Restrict); // Optional: Set delete behavior

            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Employer)
                        .WithMany(u => u.Contracts)
                        .HasForeignKey(c => c.EmployerId)
                        .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Freelancer)
                        .WithMany() // You can define this if JobSeeker has Contracts
                        .HasForeignKey(c => c.FreelancerId)
                        .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete
            // User and Skill Relation 
            modelBuilder.Entity<UserSkill>()
                        .HasKey(us => us.Id);

            modelBuilder.Entity<UserSkill>()
                        .HasOne(us => us.User)
                        .WithMany(u => u.UserSkills)
                        .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<UserSkill>()
                        .HasOne(us => us.Skill)
                        .WithMany(s => s.UserSkills)
                        .HasForeignKey(us => us.SkillId);
            // Job and Skill Relation 
            modelBuilder.Entity<JobSkill>()
                            .HasKey(us => us.Id);

            modelBuilder.Entity<JobSkill>()
                        .HasOne(us => us.Job)
                        .WithMany(u => u.JobSkills)
                        .HasForeignKey(us => us.JobId);

            modelBuilder.Entity<JobSkill>()
                        .HasOne(us => us.Skill)
                        .WithMany(s => s.JobSkills)
                        .HasForeignKey(us => us.SkillId);


        }


        private readonly AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor;
        private readonly PublishDomainEventsInterceptor publishDomainEventsInterceptor;
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<FreelancerProfile> FreelancerProfiles { get; set; }
        public DbSet<EmployerProfile> EmployerProfiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Geolocation> Geolocations { get; set; }
        public DbSet<EmploymentHistory> EmploymentHistories { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<JobSkill> JobSkills { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<UserDocument> UserDocuments { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Milestone> Milestones { get; set; }
        public DbSet<ContractPayment> ContractPayments { get; set; }
        public DbSet<Message> Messages { get; set; }

        public void Save()
        {
            SaveChanges();
        }
        public static void SeedData(DZJobsDBContext context)
        {
            context.Database.EnsureCreated();

            // Check if Skills table is already populated
            if (!context.Skills.Any())
            {
                var skills = new List<Skill>
                {
// Programming Languages
new Skill { Name = "JavaScript", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "TypeScript", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Python", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Java", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "C#", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "C++", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Swift", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Kotlin", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "PHP", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ruby", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Go", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Rust", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Dart", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },

// Databases & APIs
new Skill { Name = "SQL", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "NoSQL (MongoDB, Firebase)", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "GraphQL", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "RESTful APIs", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },

// Frameworks & Libraries
new Skill { Name = "ASP.NET Core", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Node.js", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Express.js", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Django", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Flask", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Spring Boot", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Laravel", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "CodeIgniter", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ruby on Rails", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "FastAPI", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "NestJS", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },

// Front-End Technologies
new Skill { Name = "HTML5", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "CSS3", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "SASS/SCSS", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tailwind CSS", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Bootstrap", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Material-UI", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "React.js", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Next.js", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Vue.js", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Nuxt.js", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Angular", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Svelte", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Remix", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },

// Mobile Development
new Skill { Name = "React Native", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Flutter", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Objective-C", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Xamarin", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ionic", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },

// DevOps & Cloud
new Skill { Name = "Docker", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Kubernetes", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "AWS (EC2, S3, Lambda, DynamoDB)", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Microsoft Azure", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Google Cloud Platform (GCP)", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Terraform", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },

// Security
new Skill { Name = "Penetration Testing", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ethical Hacking", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Network Security", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cryptography", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Web Security (OWASP Top 10)", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Zero Trust Security", Category = "Security", CreatedAt = DateTime.UtcNow },

// Machine Learning & AI
new Skill { Name = "Machine Learning", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Deep Learning", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Natural Language Processing (NLP)", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Computer Vision", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "TensorFlow", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },

// Blockchain & Smart Contracts
new Skill { Name = "Solidity", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ethereum", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Binance Smart Chain", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Polygon", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "IPFS", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },

// Business & Marketing
new Skill { Name = "Digital Marketing", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "SEO (Search Engine Optimization)", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Social Media Marketing", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Content Marketing", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Copywriting", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
// Additional Programming Languages
new Skill { Name = "Lua", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Perl", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "R", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Go", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Julia", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Shell Scripting", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },

// Additional Databases & APIs
new Skill { Name = "MySQL", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "PostgreSQL", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "SQLite", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Oracle DB", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Firebase", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },

// Additional Frameworks & Libraries
new Skill { Name = "Vuex", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Jest", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Gatsby", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ember.js", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Backbone.js", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "GraphQL Apollo", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },

// Additional Front-End Technologies
new Skill { Name = "SvelteKit", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Gulp", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Webpack", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Parcel", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Figma", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Storybook", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },

// Additional Mobile Development
new Skill { Name = "Android SDK", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "ReactXP", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "PhoneGap", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cordova", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },

// Additional DevOps & Cloud
new Skill { Name = "Ansible", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Jenkins", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "CircleCI", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Azure DevOps", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "CloudFormation", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },

// Additional Security
new Skill { Name = "Firewall Configuration", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Malware Analysis", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Security Auditing", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Network Monitoring", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Intrusion Detection Systems (IDS)", Category = "Security", CreatedAt = DateTime.UtcNow },

// Additional Machine Learning & AI
new Skill { Name = "Keras", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "PyTorch", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Scikit-Learn", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "OpenCV", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },

// Additional Blockchain & Smart Contracts
new Skill { Name = "Hyperledger", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Solana", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Avalanche", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Chainlink", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Smart Contract Auditing", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },

// Additional Business & Marketing
new Skill { Name = "Affiliate Marketing", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Marketing Automation", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Lead Generation", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Brand Strategy", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Google Analytics", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },

// Additional Programming Languages
new Skill { Name = "Erlang", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "F#", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ada", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "VHDL", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Racket", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Haskell", Category = "Programming Languages", CreatedAt = DateTime.UtcNow },

// Additional Databases & APIs
new Skill { Name = "Cassandra", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "MariaDB", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "CouchDB", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "ArangoDB", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "DynamoDB", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Couchbase", Category = "Databases & APIs", CreatedAt = DateTime.UtcNow },

// Additional Frameworks & Libraries
new Skill { Name = "Electron", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Golang Gin", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Hapi.js", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sencha Ext JS", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Koa.js", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pyramid", Category = "Frameworks & Libraries", CreatedAt = DateTime.UtcNow },

// Additional Front-End Technologies
new Skill { Name = "Alpine.js", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Three.js", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "GSAP (GreenSock)", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "LitElement", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Foundation", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Babel", Category = "Front-End Technologies", CreatedAt = DateTime.UtcNow },

// Additional Mobile Development
new Skill { Name = "AppGyver", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Appium", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Codename One", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Qt", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "PhoneGap Build", Category = "Mobile Development", CreatedAt = DateTime.UtcNow },

// Additional DevOps & Cloud
new Skill { Name = "Chef", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "GitLab CI", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "OpenShift", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Vagrant", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Jenkins X", Category = "DevOps & Cloud", CreatedAt = DateTime.UtcNow },

// Additional Security
new Skill { Name = "Security Information and Event Management (SIEM)", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Endpoint Protection", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Security Orchestration Automation and Response (SOAR)", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Data Loss Prevention (DLP)", Category = "Security", CreatedAt = DateTime.UtcNow },
new Skill { Name = "SOC Analyst", Category = "Security", CreatedAt = DateTime.UtcNow },

// Additional Machine Learning & AI
new Skill { Name = "Scikit-Optimize", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "XGBoost", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "LightGBM", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "FastAI", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },
new Skill { Name = "OpenAI Gym", Category = "Machine Learning & AI", CreatedAt = DateTime.UtcNow },

// Additional Blockchain & Smart Contracts
new Skill { Name = "Cosmos SDK", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Truffle Suite", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Chainlink VRF", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "NEAR Protocol", Category = "Blockchain & Smart Contracts", CreatedAt = DateTime.UtcNow },

// Additional Business & Marketing
new Skill { Name = "PPC (Pay-per-click)", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Influencer Marketing", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Email Marketing", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Brand Development", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Public Relations (PR)", Category = "Business & Marketing", CreatedAt = DateTime.UtcNow },

new Skill { Name = "Full Stack Developer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Node.js Developer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "ASP.NET Core Developer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Python Developer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "PHP Developer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "DevOps Engineer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Database Administrator", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cloud Engineer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Machine Learning Engineer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Artificial Intelligence Specialist", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cybersecurity Specialist", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Front-End Developer", Category = "Tech & Development", CreatedAt = DateTime.UtcNow },

// **Healthcare**
new Skill { Name = "Registered Nurse", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Physician", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pharmacist", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Medical Lab Technician", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Physical Therapist", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Medical Researcher", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Health Data Analyst", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Surgeon", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Dentist", Category = "Healthcare", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Healthcare Administrator", Category = "Healthcare", CreatedAt = DateTime.UtcNow },

// **Engineering**
new Skill { Name = "Mechanical Engineer", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Electrical Engineer", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Civil Engineer", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Chemical Engineer", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Software Engineer", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Architect", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Industrial Engineer", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Structural Engineer", Category = "Engineering", CreatedAt = DateTime.UtcNow },

// **Education**
new Skill { Name = "Elementary School Teacher", Category = "Education", CreatedAt = DateTime.UtcNow },
new Skill { Name = "University Lecturer", Category = "Education", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Educational Consultant", Category = "Education", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Special Education Teacher", Category = "Education", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Curriculum Developer", Category = "Education", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Education Administrator", Category = "Education", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Online Tutor", Category = "Education", CreatedAt = DateTime.UtcNow },
new Skill { Name = "School Counselor", Category = "Education", CreatedAt = DateTime.UtcNow },

// **Sales and Marketing**
new Skill { Name = "Digital Marketing Specialist", Category = "Sales and Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "SEO Specialist", Category = "Sales and Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sales Representative", Category = "Sales and Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Content Strategist", Category = "Sales and Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Brand Manager", Category = "Sales and Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Market Research Analyst", Category = "Sales and Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "E-commerce Manager", Category = "Sales and Marketing", CreatedAt = DateTime.UtcNow },

// **Finance & Accounting**
new Skill { Name = "Certified Public Accountant", Category = "Finance & Accounting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Financial Analyst", Category = "Finance & Accounting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tax Consultant", Category = "Finance & Accounting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Investment Analyst", Category = "Finance & Accounting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Auditor", Category = "Finance & Accounting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Treasury Analyst", Category = "Finance & Accounting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Forensic Accountant", Category = "Finance & Accounting", CreatedAt = DateTime.UtcNow },

// **Human Resources**
new Skill { Name = "HR Manager", Category = "Human Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Recruitment Specialist", Category = "Human Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Employee Relations Specialist", Category = "Human Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Compensation and Benefits Manager", Category = "Human Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Learning and Development Specialist", Category = "Human Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "HR Assistant", Category = "Human Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Talent Acquisition Manager", Category = "Human Resources", CreatedAt = DateTime.UtcNow },

// **Legal**
new Skill { Name = "Corporate Lawyer", Category = "Legal", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Intellectual Property Lawyer", Category = "Legal", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Paralegal", Category = "Legal", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Legal Counsel", Category = "Legal", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Litigation Specialist", Category = "Legal", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Contract Manager", Category = "Legal", CreatedAt = DateTime.UtcNow },

// **Hospitality**
new Skill { Name = "Hotel Manager", Category = "Hospitality", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Chef", Category = "Hospitality", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Event Planner", Category = "Hospitality", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tourism Specialist", Category = "Hospitality", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Waitstaff", Category = "Hospitality", CreatedAt = DateTime.UtcNow },

// **Transportation**
new Skill { Name = "Truck Driver", Category = "Transportation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pilot", Category = "Transportation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Logistics Manager", Category = "Transportation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Delivery Driver", Category = "Transportation", CreatedAt = DateTime.UtcNow },

// **Construction**
new Skill { Name = "Construction Project Manager", Category = "Construction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Site Supervisor", Category = "Construction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Plumber", Category = "Construction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Electrician", Category = "Construction", CreatedAt = DateTime.UtcNow },

// **Arts & Entertainment**
new Skill { Name = "Actor", Category = "Arts & Entertainment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Musician", Category = "Arts & Entertainment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Film Director", Category = "Arts & Entertainment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Graphic Designer", Category = "Arts & Entertainment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Painter", Category = "Arts & Entertainment", CreatedAt = DateTime.UtcNow },

// **Real Estate**
new Skill { Name = "Real Estate Agent", Category = "Real Estate", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Property Manager", Category = "Real Estate", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Real Estate Appraiser", Category = "Real Estate", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Real Estate Developer", Category = "Real Estate", CreatedAt = DateTime.UtcNow },

// **Customer Support**
new Skill { Name = "Customer Support Representative", Category = "Customer Support", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Technical Support Specialist", Category = "Customer Support", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Help Desk Technician", Category = "Customer Support", CreatedAt = DateTime.UtcNow },

// **Retail**
new Skill { Name = "Retail Manager", Category = "Retail", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cashier", Category = "Retail", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Store Associate", Category = "Retail", CreatedAt = DateTime.UtcNow },


                };

                context.Skills.AddRange(skills);
                context.SaveChanges();
            }
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await SaveChangesAsync(cancellationToken);
        }
        public DZJobsDBContext(DbContextOptions<DZJobsDBContext> options,
               AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor,
               PublishDomainEventsInterceptor publishDomainEventsInterceptor) : base(options)
        {
            this.auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
            this.publishDomainEventsInterceptor = publishDomainEventsInterceptor;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.AddInterceptors(publishDomainEventsInterceptor, auditableEntitySaveChangesInterceptor);

            base.OnConfiguring(optionsBuilder);
        }
    }
}


