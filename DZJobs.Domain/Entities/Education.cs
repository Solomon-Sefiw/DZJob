﻿using DZJobs.Domain.User;
using HCMS.Domain.Enum;

public class Education : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public EducationLevelEnum EducationLevel { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string SchoolName { get; set; }
    public string SchoolCity { get; set; }
    public string FieldOfStudy { get; set; }
    public DateTime GraduationDate { get; set; }
}
