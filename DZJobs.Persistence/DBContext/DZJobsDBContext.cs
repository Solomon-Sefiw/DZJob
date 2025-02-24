

using System.Reflection.Emit;
using DZJobs.Domain.Entities;
using DZJobs.Domain.User;
using HCMS.Services.DataService;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
        }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<FreelancerProfile> FreelancerProfiles { get; set; }
        public DbSet<EmployerProfile> EmployerProfiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Geolocation> Geolocations { get; set; }
        public DbSet<EmploymentHistory> EmploymentHistories { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
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
                    // Technical Skills
                    new Skill { Name = "JavaScript", Description = "Programming language for web development" },
                    new Skill { Name = "TypeScript", Description = "Superset of JavaScript for better development" },
                    new Skill { Name = "Python", Description = "High-level programming language" },
                    new Skill { Name = "Java", Description = "Object-oriented programming language" },
                    new Skill { Name = "C#", Description = "Programming language developed by Microsoft" },
                    new Skill { Name = "C++", Description = "General-purpose programming language" },
                    new Skill { Name = "Swift", Description = "Programming language for iOS development" },
                    new Skill { Name = "Kotlin", Description = "Programming language for Android development" },
                    new Skill { Name = "PHP", Description = "Server-side scripting language" },
                    new Skill { Name = "Ruby", Description = "Dynamic programming language" },
                    new Skill { Name = "Go", Description = "Statically typed programming language" },
                    new Skill { Name = "Rust", Description = "System programming language" },
                    new Skill { Name = "Dart", Description = "Client-optimized programming language for apps" },
                    new Skill { Name = "SQL", Description = "Language for managing databases" },
                    new Skill { Name = "NoSQL (MongoDB, Firebase)", Description = "Non-relational database systems" },
                    new Skill { Name = "GraphQL", Description = "Query language for APIs" },
                    new Skill { Name = "RESTful APIs", Description = "Architectural style for web services" },
                    new Skill { Name = "ASP.NET Core", Description = "Framework for building web applications" },
                    new Skill { Name = "Node.js", Description = "JavaScript runtime for server-side programming" },
                    new Skill { Name = "Express.js", Description = "Web framework for Node.js" },
                    new Skill { Name = "Django", Description = "High-level Python web framework" },
                    new Skill { Name = "Flask", Description = "Micro web framework for Python" },
                    new Skill { Name = "Spring Boot", Description = "Framework for Java applications" },
                    new Skill { Name = "Laravel", Description = "PHP web framework" },
                    new Skill { Name = "CodeIgniter", Description = "PHP framework for web development" },
                    new Skill { Name = "Ruby on Rails", Description = "Web application framework for Ruby" },
                    new Skill { Name = "FastAPI", Description = "Fast web framework for building APIs with Python" },
                    new Skill { Name = "NestJS", Description = "Framework for building efficient server-side applications" },
                    new Skill { Name = "HTML5", Description = "Markup language for structuring web content" },
                    new Skill { Name = "CSS3", Description = "Style sheet language for designing web pages" },
                    new Skill { Name = "SASS/SCSS", Description = "CSS preprocessor for writing styles" },
                    new Skill { Name = "Tailwind CSS", Description = "Utility-first CSS framework" },
                    new Skill { Name = "Bootstrap", Description = "Front-end framework for responsive design" },
                    new Skill { Name = "Material-UI", Description = "React UI framework with Material Design" },
                    new Skill { Name = "React.js", Description = "JavaScript library for building UIs" },
                    new Skill { Name = "Next.js", Description = "React framework for server-rendered applications" },
                    new Skill { Name = "Vue.js", Description = "Progressive JavaScript framework" },
                    new Skill { Name = "Nuxt.js", Description = "Framework for Vue.js applications" },
                    new Skill { Name = "Angular", Description = "Web application framework by Google" },
                    new Skill { Name = "Svelte", Description = "Compiler for building UIs" },
                    new Skill { Name = "Remix", Description = "Framework for building fast web applications" },
                    new Skill { Name = "WebAssembly", Description = "Binary instruction format for web" },
                    new Skill { Name = "Three.js", Description = "JavaScript library for 3D graphics" },
                    new Skill { Name = "WebGL", Description = "JavaScript API for rendering 2D and 3D graphics" },
                    new Skill { Name = "Progressive Web Apps (PWA)", Description = "Web applications that use modern web capabilities" },
                    new Skill { Name = "React Native", Description = "Framework for building native apps using React" },
                    new Skill { Name = "Flutter", Description = "UI toolkit for building natively compiled apps" },
                    new Skill { Name = "Objective-C", Description = "Programming language for iOS apps" },
                    new Skill { Name = "Xamarin", Description = "Framework for cross-platform mobile apps" },
                    new Skill { Name = "Ionic", Description = "Framework for building mobile apps" },
                    new Skill { Name = "Docker", Description = "Platform for developing containerized applications" },
                    new Skill { Name = "Kubernetes", Description = "Container orchestration platform" },
                    new Skill { Name = "AWS (EC2, S3, Lambda, DynamoDB)", Description = "Amazon Web Services cloud platform" },
                    new Skill { Name = "Microsoft Azure", Description = "Cloud computing service created by Microsoft" },
                    new Skill { Name = "Google Cloud Platform (GCP)", Description = "Cloud computing services by Google" },
                    new Skill { Name = "Terraform", Description = "Infrastructure as code tool" },
                    new Skill { Name = "CI/CD (Jenkins, GitHub Actions, GitLab CI/CD)", Description = "Continuous integration and deployment tools" },
                    new Skill { Name = "Ansible", Description = "Automation tool for configuration management" },
                    new Skill { Name = "Helm", Description = "Package manager for Kubernetes" },
                    new Skill { Name = "OpenShift", Description = "Kubernetes platform for enterprise" },
                    new Skill { Name = "Serverless Architecture", Description = "Building and running applications without managing servers" },
                    new Skill { Name = "Penetration Testing", Description = "Testing system security by simulating attacks" },
                    new Skill { Name = "Ethical Hacking", Description = "Authorized testing of systems to find vulnerabilities" },
                    new Skill { Name = "Network Security", Description = "Protecting networks from attacks" },
                    new Skill { Name = "Cryptography", Description = "Practice of securing information" },
                    new Skill { Name = "Web Security (OWASP Top 10)", Description = "Top 10 security vulnerabilities in web applications" },
                    new Skill { Name = "Zero Trust Security", Description = "Security model that assumes breaches are inevitable" },
                    new Skill { Name = "SIEM (Security Information and Event Management)", Description = "Solutions for security management" },
                    new Skill { Name = "Machine Learning", Description = "Subset of AI for building predictive models" },
                    new Skill { Name = "Deep Learning", Description = "Subset of machine learning with neural networks" },
                    new Skill { Name = "Natural Language Processing (NLP)", Description = "AI for understanding and processing human language" },
                    new Skill { Name = "Computer Vision", Description = "Field of AI that enables computers to interpret images" },
                    new Skill { Name = "TensorFlow", Description = "Open-source platform for machine learning" },
                    new Skill { Name = "PyTorch", Description = "Open-source machine learning library" },
                    new Skill { Name = "Scikit-Learn", Description = "Library for machine learning in Python" },
                    new Skill { Name = "Pandas", Description = "Data manipulation and analysis library for Python" },
                    new Skill { Name = "NumPy", Description = "Library for numerical computations in Python" },
                    new Skill { Name = "Matplotlib", Description = "Library for creating static, animated, and interactive visualizations in Python" },
                    new Skill { Name = "OpenAI APIs", Description = "APIs for AI models developed by OpenAI" },
                    new Skill { Name = "Big Data (Hadoop, Spark)", Description = "Technologies for handling large datasets" },
                    new Skill { Name = "Smart Contracts", Description = "Self-executing contracts with the terms directly written into code" },
                    new Skill { Name = "Solidity", Description = "Programming language for writing smart contracts" },
                    new Skill { Name = "Ethereum", Description = "Decentralized platform for building applications" },
                    new Skill { Name = "Binance Smart Chain", Description = "Blockchain platform for running smart contracts" },
                    new Skill { Name = "Polygon", Description = "Layer-2 scaling solution for Ethereum" },
                    new Skill { Name = "Hyperledger", Description = "Open-source collaborative effort to advance cross-industry blockchain technologies" },
                    new Skill { Name = "IPFS", Description = "InterPlanetary File System for decentralized storage" },
                    new Skill { Name = "DeFi", Description = "Decentralized finance ecosystem" },
                    new Skill { Name = "NFT Development", Description = "Creating non-fungible tokens" },

                    // Business & Marketing Skills
                    new Skill { Name = "Digital Marketing", Description = "Marketing through digital channels" },
                    new Skill { Name = "SEO (Search Engine Optimization)", Description = "Optimizing websites for search engines" },
                    new Skill { Name = "SEM (Search Engine Marketing)", Description = "Promoting websites through paid advertising" },
                    new Skill { Name = "Content Marketing", Description = "Creating valuable content to attract and engage audience" },
                    new Skill { Name = "Social Media Marketing", Description = "Using social media platforms for marketing" },
                    new Skill { Name = "Google Ads", Description = "Online advertising platform by Google" },
                    new Skill { Name = "Facebook Ads", Description = "Online advertising platform by Facebook" },
                    new Skill { Name = "Email Marketing", Description = "Marketing through email communication" },
                    new Skill { Name = "Affiliate Marketing", Description = "Promoting products/services through affiliates" },
                    new Skill { Name = "Influencer Marketing", Description = "Collaborating with influencers for marketing" },
                    new Skill { Name = "Growth Hacking", Description = "Experiment-driven approach to grow business" },
                    new Skill { Name = "Copywriting", Description = "Writing persuasive content for marketing" },
                    new Skill { Name = "Financial Analysis", Description = "Analyzing financial data to inform business decisions" },
                    new Skill { Name = "Business Development", Description = "Strategies for business growth" },
                    new Skill { Name = "Project Management", Description = "Planning, executing, and closing projects" },
                    new Skill { Name = "Agile Methodologies (Scrum, Kanban)", Description = "Approaches to project management" },
                    new Skill { Name = "Lean Management", Description = "Improving efficiency and minimizing waste" },
                    new Skill { Name = "Stakeholder Management", Description = "Managing relationships with stakeholders" },
                    new Skill { Name = "Data Analysis", Description = "Inspecting and interpreting data" },
                    new Skill { Name = "Market Research", Description = "Gathering information about market conditions" },
                    new Skill { Name = "Business Strategy", Description = "Plans for achieving business goals" },
                    new Skill { Name = "Risk Management", Description = "Identifying and mitigating risks" },

                    // Creative Skills
                    new Skill { Name = "Graphic Design", Description = "Creating visual content using design software" },
                    new Skill { Name = "UX/UI Design", Description = "Designing user experiences and interfaces" },
                    new Skill { Name = "Animation", Description = "Creating moving images or graphics" },
                    new Skill { Name = "Video Editing", Description = "Editing video footage into a coherent product" },
                    new Skill { Name = "Photography", Description = "Capturing images using a camera" },
                    new Skill { Name = "Illustration", Description = "Creating visual representations of concepts" },
                    new Skill { Name = "3D Modeling", Description = "Creating three-dimensional representations of objects" },
                    new Skill { Name = "Sound Design", Description = "Creating and manipulating audio elements" },
                    new Skill { Name = "Web Design", Description = "Designing the layout and visual elements of websites" },
                    new Skill { Name = "Branding", Description = "Creating a unique name and image for a product" },
                    new Skill { Name = "Content Creation", Description = "Producing engaging content for various platforms" },

                    // Soft Skills
                    new Skill { Name = "Communication", Description = "Effective exchange of information" },
                    new Skill { Name = "Teamwork", Description = "Collaborating effectively with others" },
                    new Skill { Name = "Problem Solving", Description = "Finding solutions to complex issues" },
                    new Skill { Name = "Critical Thinking", Description = "Analyzing facts to make informed decisions" },
                    new Skill { Name = "Adaptability", Description = "Adjusting to new conditions" },
                    new Skill { Name = "Time Management", Description = "Managing time efficiently" },
                    new Skill { Name = "Emotional Intelligence", Description = "Understanding and managing emotions" },
                    new Skill { Name = "Leadership", Description = "Guiding and influencing others" },
                    new Skill { Name = "Negotiation", Description = "Reaching agreements through discussion" },
                    new Skill { Name = "Conflict Resolution", Description = "Resolving disagreements effectively" },

                    // Industry-Specific Skills
                    new Skill { Name = "Healthcare", Description = "Knowledge of healthcare practices and systems" },
                    new Skill { Name = "Finance", Description = "Understanding financial principles and practices" },
                    new Skill { Name = "Legal", Description = "Knowledge of laws and legal procedures" },
                    new Skill { Name = "Education", Description = "Understanding of educational theories and practices" },
                    new Skill { Name = "Manufacturing", Description = "Knowledge of manufacturing processes" },
                    new Skill { Name = "Construction", Description = "Knowledge of construction practices and regulations" },
                    new Skill { Name = "Retail", Description = "Understanding retail practices and customer service" },
                    new Skill { Name = "Hospitality", Description = "Knowledge of hospitality industry standards" },
                    new Skill { Name = "Logistics", Description = "Understanding of logistics and supply chain management" },
                    new Skill { Name = "Information Technology", Description = "Knowledge of IT practices and systems" },
                    new Skill { Name = "Telecommunications", Description = "Understanding telecommunications systems" },
                    new Skill { Name = "Real Estate", Description = "Knowledge of real estate market and practices" }
                };

                context.Skills.AddRange(skills);
                context.SaveChanges();
            }
        }
        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await SaveChangesAsync(cancellationToken);
        }
    }
}


