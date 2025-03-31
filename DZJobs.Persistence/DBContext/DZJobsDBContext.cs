

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

// from Zelalem 
new Skill { Name = "Plant operators", Category = "Fruit and Vegetable Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Machine operators", Category = "Fruit and Vegetable Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Packers", Category = "Fruit and Vegetable Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Quality control inspectors", Category = "Fruit and Vegetable Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drivers", Category = "Fruit and Vegetable Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Lab technicians", Category = "Fruit and Vegetable Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mill workers", Category = "Grain Milling", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Machine technicians", Category = "Grain Milling", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Quality inspectors", Category = "Grain Milling", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Warehouse workers", Category = "Grain Milling", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Delivery drivers", Category = "Grain Milling", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Production operators", Category = "Dairy Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pasteurization technicians", Category = "Dairy Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Packaging assistants", Category = "Dairy Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sanitation workers", Category = "Dairy Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Butchers", Category = "Meat and Fish Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Packers", Category = "Meat and Fish Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cold storage assistants", Category = "Meat and Fish Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Food safety inspectors", Category = "Meat and Fish Processing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Grinders", Category = "Spice Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Blender operators", Category = "Spice Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Packing supervisors", Category = "Spice Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Warehouse managers", Category = "Spice Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Press operators", Category = "Edible Oil Extraction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Boiler technicians", Category = "Edible Oil Extraction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Laboratory analysts", Category = "Edible Oil Extraction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Filtration assistants", Category = "Edible Oil Extraction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Bakers", Category = "Food Product Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Formulation chemists", Category = "Food Product Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Machine operators", Category = "Food Product Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Packaging designers", Category = "Food Product Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Logistics coordinators", Category = "Food Product Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Agrochemical mixers", Category = "Agriculture Inputs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fertilizer and feed packers", Category = "Agriculture Inputs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sales representatives", Category = "Agriculture Inputs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Warehouse supervisors", Category = "Agriculture Inputs", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Facility managers", Category = "Cold Storage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Preservation technicians", Category = "Cold Storage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Transport workers", Category = "Cold Storage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Inventory assistants", Category = "Cold Storage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Crop farm workers", Category = "Farming", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Livestock farm hands", Category = "Farming", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Equipment operators", Category = "Farming", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Agricultural extension officers", Category = "Farming", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Marketing executives", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "IT support staff", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Geologists", Category = "Exploration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Geophysicists", Category = "Exploration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Prospectors", Category = "Exploration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sampling technicians", Category = "Exploration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Miners", Category = "Extraction/Mining", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drill operators", Category = "Extraction/Mining", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Blasting technicians", Category = "Extraction/Mining", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Heavy equipment operators", Category = "Extraction/Mining", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Haul truck drivers", Category = "Extraction/Mining", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Processing plant operators", Category = "Processing/Beneficiation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Flotation technicians", Category = "Processing/Beneficiation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Metallurgists", Category = "Processing/Beneficiation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Chemical technologists", Category = "Processing/Beneficiation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mining engineers", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Metallurgical engineers", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Safety engineers", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Environmental engineers", Category = "Engineering", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mechanics", Category = "Mine support services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Electricians", Category = "Mine support services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Inventory managers", Category = "Mine support services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Procurement officers", Category = "Mine support services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Logistics coordinators", Category = "Mine support services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Finance managers", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "HR managers", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "IT support", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Community liaison officers", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Extension workers", Category = "Artisanal Mining Support", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mine supervisors", Category = "Artisanal Mining Support", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Equipment operators", Category = "Artisanal Mining Support", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Training facilitators", Category = "Artisanal Mining Support", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Civil works", Category = "Construction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Electrical works", Category = "Construction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Construction laborers", Category = "Construction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Welders", Category = "Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fabricators", Category = "Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Process technicians", Category = "Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Haulage truck drivers", Category = "Transportation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fuel truck drivers", Category = "Transportation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Loader operators", Category = "Transportation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Solar panel assemblers", Category = "Renewable Energy Equipment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Wind turbine technicians", Category = "Renewable Energy Equipment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Hydropower plant operators", Category = "Renewable Energy Equipment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Geothermal engineer", Category = "Renewable Energy Equipment", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Insulation installers", Category = "Green Building Materials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sustainable carpenters", Category = "Green Building Materials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Bamboo craftspeople", Category = "Green Building Materials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Alternative cement producer", Category = "Green Building Materials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Bioprocess technicians", Category = "Bioplastics/Biomaterials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fiber extraction specialists", Category = "Bioplastics/Biomaterials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pilot plant operators", Category = "Bioplastics/Biomaterials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Enzyme engineers", Category = "Bioplastics/Biomaterials", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Green chemists", Category = "Eco-friendly Chemicals", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Industrial biotechnologists", Category = "Eco-friendly Chemicals", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Microbial fermentation specialists", Category = "Eco-friendly Chemicals", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Formulation scientists", Category = "Eco-friendly Chemicals", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Remanufacturing technicians", Category = "Circular Economy Initiatives", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Leasing program coordinators", Category = "Circular Economy Initiatives", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sorting/processing workers", Category = "Circular Economy Initiatives", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Waste conversion plant operators", Category = "Circular Economy Initiatives", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Certified weavers/spinners", Category = "Sustainable Textiles", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Natural dyers", Category = "Sustainable Textiles", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fabric inspectors", Category = "Sustainable Textiles", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fiber recycling technicians", Category = "Sustainable Textiles", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Electrician/technicians", Category = "Clean Transportation Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Charging station maintenance", Category = "Clean Transportation Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Battery technicians", Category = "Clean Transportation Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Public transport mechanics", Category = "Clean Transportation Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landscape designers", Category = "Commercial/Residential Installation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Construction crews", Category = "Commercial/Residential Installation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Hardscaping installers", Category = "Commercial/Residential Installation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Irrigation technicians", Category = "Commercial/Residential Installation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Horticulturalists", Category = "Nursery Operations", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Plant propagation specialists", Category = "Nursery Operations", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Nursery managers", Category = "Nursery Operations", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landscape suppliers", Category = "Nursery Operations", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Orchard workers", Category = "Horticulture", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Vegetable gardeners", Category = "Horticulture", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Greenhouse attendants", Category = "Horticulture", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Hydroponics technicians", Category = "Horticulture", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Lawn technicians", Category = "Lawn Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landscape maintenance workers", Category = "Lawn Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landscape equipment operators", Category = "Lawn Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Weed/pest control specialists", Category = "Lawn Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Masons", Category = "Hardscaping", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pavers", Category = "Hardscaping", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fence installers", Category = "Hardscaping", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Concrete workers", Category = "Hardscaping", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Low-voltage electricians", Category = "Landscape Lighting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Holiday lighting installers", Category = "Landscape Lighting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Lighting technicians", Category = "Landscape Lighting", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Arborists", Category = "Tree Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tree trimmers/removers", Category = "Tree Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Forest pest management workers", Category = "Tree Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Chain saw operators", Category = "Tree Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landscape designers/architects", Category = "Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Horticultural supplies managers", Category = "Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landscape business owners", Category = "Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Administrative support roles", Category = "Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Garbage collection", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Recycling", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Composting", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landfill management", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Solar power installation and maintenance", Category = "Green Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Wind turbine technician", Category = "Green Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Energy efficiency auditors", Category = "Green Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tree planting", Category = "Forestry and Wildlife Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Forest management", Category = "Forestry and Wildlife Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Park ranger", Category = "Forestry and Wildlife Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Habitat restoration", Category = "Forestry and Wildlife Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Wildlife monitoring and protection", Category = "Biodiversity Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Conservation education", Category = "Biodiversity Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Nursery and plantation management", Category = "Biodiversity Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Invasive species control", Category = "Biodiversity Conservation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Watershed rehabilitation", Category = "Water Resources Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Water quality testing", Category = "Water Resources Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Irrigation infrastructure", Category = "Water Resources Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Rainwater harvesting", Category = "Water Resources Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Community outreach workers", Category = "Environmental Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Environmental educators", Category = "Environmental Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Campaign coordinators", Category = "Environmental Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Researchers and data analysts", Category = "Environmental Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tour guides", Category = "Eco-tourism", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Lodge staff", Category = "Eco-tourism", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Transport operators", Category = "Eco-tourism", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Souvenir producers", Category = "Eco-tourism", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Air quality monitoring", Category = "Pollution Control", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Water treatment facility operators", Category = "Pollution Control", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Environmental inspectors", Category = "Pollution Control", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Emissions testing technicians", Category = "Pollution Control", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Waste collectors", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Landfill equipment operators", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Solar installers", Category = "Green Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Wind turbine technicians", Category = "Green Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Biogas plant operators", Category = "Green Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Energy auditors", Category = "Green Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Reforestation crews", Category = "Forestry and Wildlife", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Forestry technicians", Category = "Forestry and Wildlife", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Park rangers", Category = "Forestry and Wildlife", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Conservation officers", Category = "Forestry and Wildlife", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Wildlife biologists", Category = "Biodiversity", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Habitat restoration crews", Category = "Biodiversity", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Nursery technicians", Category = "Biodiversity", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Invasive species controllers", Category = "Biodiversity", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Watershed rehabilitation crews", Category = "Water Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Water quality technicians", Category = "Water Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Irrigation technicians", Category = "Water Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Rainwater harvesting system installers", Category = "Water Resources", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Environmental educators", Category = "Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Community outreach officers", Category = "Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Campaign coordinators", Category = "Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Data analysts", Category = "Education and Advocacy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Craft producers", Category = "Eco-tourism", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Air quality technicians", Category = "Pollution Control", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Water treatment operators", Category = "Pollution Control", CreatedAt = DateTime.UtcNow },
new Skill { Name = "IT support/helpdesk", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Software development", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mobile app development", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cyber security", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Coding boot camps", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Data analytics programs", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Software testing courses", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "UX/UI design training", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Solar PV installation/maintenance", Category = "Renewable Energy Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Battery storage", Category = "Renewable Energy Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mini-grid development", Category = "Renewable Energy Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Smart metering", Category = "Renewable Energy Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Precision agriculture", Category = "Agricultural Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drone services", Category = "Agricultural Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Agricultural data analytics", Category = "Agricultural Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Livestock monitoring systems", Category = "Agricultural Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mobile payments", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Digital lending/crowdfunding", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Insurtech", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Blockchain solutions", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Online marketplace development", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Logistics technology", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drone delivery services", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Supply chain management systems", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Medical diagnostics", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Vaccine production", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Food biotechnology", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Bioscience research", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Automation/robotics", Category = "Manufacturing Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "3D printing", Category = "Manufacturing Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Machine learning applications", Category = "Manufacturing Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Additive manufacturing", Category = "Manufacturing Technology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Software developers", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Web designers", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cybersecurity specialists", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Helpdesk technicians", Category = "IT Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Coding instructors", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Data analysts", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Software testers", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Designers", Category = "Digital Skills Training", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Solar installers", Category = "Renewable Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Energy storage technicians", Category = "Renewable Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Technicians", Category = "Renewable Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Smart meter technicians", Category = "Renewable Energy", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Precision agriculture technicians", Category = "Agri-tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drone pilots", Category = "Agri-tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Agricultural data analysts", Category = "Agri-tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Livestock monitoring operators", Category = "Agri-tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Mobile payments developers", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Digital lending specialists", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Insurtech developers", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Blockchain engineers", Category = "FinTech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Online marketplace managers", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Logistics coordinators", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drone delivery pilots", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Supply chain analysts", Category = "E-commerce/Logistics", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Medical lab technicians", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Vaccine production associates", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Food scientists", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Bioscience researchers", Category = "Biotechnology", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Automation engineers", Category = "Manufacturing Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "3D printing specialists", Category = "Manufacturing Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Machine learning developers", Category = "Manufacturing Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Additive manufacturing technicians", Category = "Manufacturing Tech", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Office cleaning", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Retail/store cleaning", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Restaurant cleaning", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Hospital/medical cleaning", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Home cleaning services", Category = "Residential Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Airbnb/short term rental cleaning", Category = "Residential Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Post-construction cleaning", Category = "Residential Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Carpet cleaning", Category = "Floor Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Hard floor care and maintenance", Category = "Floor Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Floor finishing and stripping", Category = "Floor Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Exterior and interior window cleaning", Category = "Window Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "High rise commercial window cleaning", Category = "Window Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Building exteriors", Category = "Pressure Washing and Steam Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Parking lots", Category = "Pressure Washing and Steam Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sidewalks and pavement cleaning", Category = "Pressure Washing and Steam Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sustainable cleaning product development", Category = "Janitorial Supply", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Distribution of green cleaning supplies", Category = "Janitorial Supply", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Garbage and recycling collection", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Composting and waste diversion", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pottering and janitorial support", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Public restroom cleaning and maintenance", Category = "Restroom Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Plumbing and related services", Category = "Restroom Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Janitors", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cleaners", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Office cleaners", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Restroom attendants", Category = "Commercial Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Housekeepers", Category = "Residential Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Maid services", Category = "Residential Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Post-construction cleaners", Category = "Residential Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Carpet cleaners", Category = "Floor Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Floor technicians", Category = "Floor Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Floor strippers", Category = "Floor Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Waxers", Category = "Floor Care", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Window washers", Category = "Window Cleaning", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pressure washing operators", Category = "Pressure Washing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Pressure washer operators", Category = "Pressure Washing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Steam cleaner operators", Category = "Pressure Washing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Product developers", Category = "Janitorial Supply", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Distribution drivers", Category = "Janitorial Supply", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Warehouse workers", Category = "Janitorial Supply", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Garbage collectors", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Recycling sorters", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Compost operators", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Porters", Category = "Waste Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Restroom attendants", Category = "Restroom Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Plumbers", Category = "Restroom Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drain cleaners", Category = "Restroom Services", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cleaning company managers", Category = "Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Route supervisors", Category = "Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Customer service roles", Category = "Management", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Plantation managers", Category = "Medicinal Plant Cultivation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Nursery technicians", Category = "Medicinal Plant Cultivation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Herbal farmers", Category = "Medicinal Plant Cultivation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Gardeners", Category = "Medicinal Plant Cultivation", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Biochemists", Category = "Phytochemical Extraction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Plant extractors", Category = "Phytochemical Extraction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Laboratory technicians", Category = "Phytochemical Extraction", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Herbal product formulators", Category = "Formulation and Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Manufacturing operators", Category = "Formulation and Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Packaging staff", Category = "Formulation and Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Quality controllers", Category = "Formulation and Manufacturing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Clinical researchers", Category = "Clinical Research", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Trial coordinators", Category = "Clinical Research", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Biostatisticians", Category = "Clinical Research", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Traditional healers", Category = "Clinical Research", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Ethnobotanists", Category = "Biodiscovery", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Bio prospectors", Category = "Biodiscovery", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Taxonomists", Category = "Biodiscovery", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Field researchers", Category = "Biodiscovery", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Quality assurance managers", Category = "Regulatory", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Regulatory affairs specialists", Category = "Regulatory", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Compliance officers", Category = "Regulatory", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Documentation specialists", Category = "Regulatory", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Marketing executives", Category = "Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Brand managers", Category = "Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Digital marketers", Category = "Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sales representatives", Category = "Marketing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Finance staff", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "HR personnel", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Office managers", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Drivers", Category = "Administration", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Theater, dance, music, comedy", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Arts education and workshops", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Event production and promotion", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Painting, sculpture, photography", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Artisan crafts like pottery, weaving", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Gallery and exhibition management", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Book and newspaper publishing", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Digital publishing and e-books", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Printing and bookbinding services", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Film and video production", Category = "Audiovisual Media", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Animation and visual effects", Category = "Audiovisual Media", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Post-production and sound services", Category = "Audiovisual Media", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Graphic and web design", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Product, textile, jewelry design", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Interior design and architecture", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural heritage sites management", Category = "Heritage Promotion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Museums, libraries, archives", Category = "Heritage Promotion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural tourism and guides", Category = "Heritage Promotion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Resources for creators and innovators", Category = "Copyright and Intellectual Property", CreatedAt = DateTime.UtcNow },
new Skill { Name = "IP law and commercialization support", Category = "Copyright and Intellectual Property", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural Entrepreneur", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fashion Designer", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Musician", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Dancer", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Visual Artist", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Filmmaker", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Events Manager", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Copyright Agent", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural Marketing Executive", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Gallery Curator", Category = "Creative/Cultural Industry", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Dancers", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Musicians", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Arts teachers/instructors", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Event planners", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Promoters", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Artists", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sculptors", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Photographers", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Artisans", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Potters", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Weavers", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Gallery attendants", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Writers", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Editors", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Journalists", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Printers", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Binders", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Distributors", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sales agents", Category = "Publishing", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Filmmakers", Category = "Audiovisual", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Camera operators", Category = "Audiovisual", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Animators", Category = "Audiovisual", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Visual effects artists", Category = "Audiovisual", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Editors", Category = "Audiovisual", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sound engineers", Category = "Audiovisual", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Graphic designers", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Web designers", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Interior designers", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Architects", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Fashion designers", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Jewelry designers", Category = "Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Museum curators", Category = "Heritage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Guides", Category = "Heritage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Archivists", Category = "Heritage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Librarians", Category = "Heritage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural tourism operators", Category = "Heritage", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Copyright administrators", Category = "Intellectual Property", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Technology transfer specialists", Category = "Intellectual Property", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Innovation scouts", Category = "Intellectual Property", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Researchers", Category = "Intellectual Property", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Film production", Category = "Movies and Television", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Videography", Category = "Movies and Television", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Editing and post-production", Category = "Movies and Television", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Recording and production", Category = "Music", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Music performance", Category = "Music", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Music instruction", Category = "Music", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Theater production", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Dance and performances", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural events management", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Painting", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Sculpture", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Crafts", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Photography", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Illustrations", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Art galleries and exhibitions", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Textile design", Category = "Fashion Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Clothing production", Category = "Fashion Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Costume design", Category = "Fashion Design", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Printing services", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Publishing houses", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Editing and creative writing", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural research and documentation", Category = "Ethnographic Projects", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Film crew - directors, DP, audio etc.", Category = "Movies/TV", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Editors", Category = "Movies/TV", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Producers", Category = "Movies/TV", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Videographers", Category = "Movies/TV", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Actors", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Stage managers", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Costume designers", Category = "Performing Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Gallery assistants", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Curators", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Illustrators", Category = "Visual Arts", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Textile designers", Category = "Fashion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Seamstresses", Category = "Fashion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tailors", Category = "Fashion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Milliners", Category = "Fashion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Costume designers", Category = "Fashion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Writers", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Editors", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Journalists", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Publishers", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Printers", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Creative directors", Category = "Publications", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Cultural researchers", Category = "Ethnography", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Museum curators", Category = "Ethnography", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Exhibit designers", Category = "Ethnography", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Tour guides", Category = "Cultural Promotion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Event organizers", Category = "Cultural Promotion", CreatedAt = DateTime.UtcNow },
new Skill { Name = "Artisan producers", Category = "Cultural Promotion", CreatedAt = DateTime.UtcNow },



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


