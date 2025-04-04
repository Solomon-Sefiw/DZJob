﻿using HCMS.Domain.Enum;
using HCMS.Domain;
using System.Diagnostics.Contracts;
using DZJobs.Domain.Entities;
public class Job : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public JobCategory JobCategory  { get; set; }
    public JobType JobType { get; set; }  // Enum: Full-time, Part-time, Freelance
    public string? Location { get; set; }
    public decimal Salary { get; set; }
    public DateTime PostedDate { get; set; }
    public string EmployerId { get; set; }
    public DZJobUser Employer { get; set; }
    public JobStatus Status { get; set; }  // Enum: Open, In Progress, Closed
    public ICollection<JobApplication> Applications { get; set; }
    public ICollection<Contract> Contracts { get; set; }
    public ICollection<Review> Reviews { get; set; }
    public ICollection<JobSkill> JobSkills { get; set; }
}
