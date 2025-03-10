import { emptySplitApi as api } from "./emptySplitApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiAuthenticationSeedRoles: build.mutation<
      PostApiAuthenticationSeedRolesApiResponse,
      PostApiAuthenticationSeedRolesApiArg
    >({
      query: () => ({ url: `/api/Authentication/seed-Roles`, method: "POST" }),
    }),
    makeUserFreelancer: build.mutation<
      MakeUserFreelancerApiResponse,
      MakeUserFreelancerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/addRole/Freelancer`,
        method: "POST",
        body: queryArg.updatePermissionDto,
      }),
    }),
    makeUserAdmin: build.mutation<
      MakeUserAdminApiResponse,
      MakeUserAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/addRole/Admin`,
        method: "POST",
        body: queryArg.updatePermissionDto,
      }),
    }),
    makeUserEmployer: build.mutation<
      MakeUserEmployerApiResponse,
      MakeUserEmployerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/addRole/Employer`,
        method: "POST",
        body: queryArg.updatePermissionDto,
      }),
    }),
    getAllUser: build.query<GetAllUserApiResponse, GetAllUserApiArg>({
      query: () => ({ url: `/api/Authentication/GetAll` }),
    }),
    getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/Authentication/GetById`,
        params: { Id: queryArg.id },
      }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/api/Authentication/Create`,
        method: "POST",
        body: queryArg.registerUser,
      }),
    }),
    confirmEmail: build.query<ConfirmEmailApiResponse, ConfirmEmailApiArg>({
      query: (queryArg) => ({
        url: `/api/Authentication/Confirem/Auto`,
        params: { token: queryArg.token, email: queryArg.email },
      }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/api/Authentication/login`,
        method: "POST",
        body: queryArg.login,
      }),
    }),
    confirmOtp: build.mutation<ConfirmOtpApiResponse, ConfirmOtpApiArg>({
      query: (queryArg) => ({
        url: `/api/Authentication/Confirm-OTP`,
        method: "POST",
        params: { code: queryArg.code, email: queryArg.email },
      }),
    }),
    forgetPassword: build.mutation<
      ForgetPasswordApiResponse,
      ForgetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Forgot-Password`,
        method: "POST",
        params: { email: queryArg.email },
      }),
    }),
    resetPassword: build.query<ResetPasswordApiResponse, ResetPasswordApiArg>({
      query: (queryArg) => ({
        url: `/api/Authentication/Reset-Password/Auto`,
        params: { token: queryArg.token, email: queryArg.email },
      }),
    }),
    passwordRest: build.mutation<PasswordRestApiResponse, PasswordRestApiArg>({
      query: (queryArg) => ({
        url: `/api/Authentication/Reset-Password`,
        method: "POST",
        body: queryArg.resetPassword,
      }),
    }),
    getApiAuthenticationTestEmail: build.query<
      GetApiAuthenticationTestEmailApiResponse,
      GetApiAuthenticationTestEmailApiArg
    >({
      query: () => ({ url: `/api/Authentication/Test Email` }),
    }),
    createEducation: build.mutation<
      CreateEducationApiResponse,
      CreateEducationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Educations/Create`,
        method: "POST",
        body: queryArg.createEducationCommand,
      }),
    }),
    updateEducation: build.mutation<
      UpdateEducationApiResponse,
      UpdateEducationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Educations/update`,
        method: "PUT",
        body: queryArg.updateEducationCommand,
      }),
    }),
    getEducationById: build.query<
      GetEducationByIdApiResponse,
      GetEducationByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Educations/getById${queryArg.id}` }),
    }),
    getAllEducation: build.query<
      GetAllEducationApiResponse,
      GetAllEducationApiArg
    >({
      query: () => ({ url: `/api/Educations/all` }),
    }),
    createEmployerProfile: build.mutation<
      CreateEmployerProfileApiResponse,
      CreateEmployerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmployerProfile/Create`,
        method: "POST",
        body: queryArg.createEmployerProfileCommand,
      }),
    }),
    updateEmployerProfile: build.mutation<
      UpdateEmployerProfileApiResponse,
      UpdateEmployerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmployerProfile/Create`,
        method: "PUT",
        body: queryArg.updateEmployerProfileCommand,
      }),
    }),
    getEmployerProfileById: build.query<
      GetEmployerProfileByIdApiResponse,
      GetEmployerProfileByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmployerProfile/getById${queryArg.id}`,
      }),
    }),
    getAllEmployerProfile: build.query<
      GetAllEmployerProfileApiResponse,
      GetAllEmployerProfileApiArg
    >({
      query: () => ({ url: `/api/EmployerProfile/all` }),
    }),
    createEmploymentHistory: build.mutation<
      CreateEmploymentHistoryApiResponse,
      CreateEmploymentHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmploymentHistory/Create`,
        method: "POST",
        body: queryArg.createEmploymentHistoryCommand,
      }),
    }),
    updateEmploymentHistory: build.mutation<
      UpdateEmploymentHistoryApiResponse,
      UpdateEmploymentHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmploymentHistory/update`,
        method: "PUT",
        body: queryArg.updateEmploymentHistoryCommand,
        params: { id: queryArg.id },
      }),
    }),
    getEmploymentHistoryById: build.query<
      GetEmploymentHistoryByIdApiResponse,
      GetEmploymentHistoryByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmploymentHistory/getById${queryArg.id}`,
      }),
    }),
    getAllEmploymentHistory: build.query<
      GetAllEmploymentHistoryApiResponse,
      GetAllEmploymentHistoryApiArg
    >({
      query: () => ({ url: `/api/EmploymentHistory/all` }),
    }),
    createFreelancerProfile: build.mutation<
      CreateFreelancerProfileApiResponse,
      CreateFreelancerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/FreelancerProfile/Create`,
        method: "POST",
        body: queryArg.createFreelancerProfileCommand,
      }),
    }),
    getFreelancerProfileById: build.query<
      GetFreelancerProfileByIdApiResponse,
      GetFreelancerProfileByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/FreelancerProfile/getById${queryArg.id}`,
      }),
    }),
    getAllFreelancerProfiles: build.query<
      GetAllFreelancerProfilesApiResponse,
      GetAllFreelancerProfilesApiArg
    >({
      query: () => ({ url: `/api/FreelancerProfile/all` }),
    }),
    updateFreelancerProfile: build.mutation<
      UpdateFreelancerProfileApiResponse,
      UpdateFreelancerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/FreelancerProfile/update`,
        method: "PUT",
        body: queryArg.updateFreelancerProfileCommand,
      }),
    }),
    postApiGeolocation: build.mutation<
      PostApiGeolocationApiResponse,
      PostApiGeolocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Geolocation`,
        method: "POST",
        body: queryArg.createGeolocationCommand,
      }),
    }),
    putApiGeolocation: build.mutation<
      PutApiGeolocationApiResponse,
      PutApiGeolocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Geolocation`,
        method: "PUT",
        body: queryArg.updateGeolocationCommand,
      }),
    }),
    getApiGeolocation: build.query<
      GetApiGeolocationApiResponse,
      GetApiGeolocationApiArg
    >({
      query: () => ({ url: `/api/Geolocation` }),
    }),
    getApiGeolocationById: build.query<
      GetApiGeolocationByIdApiResponse,
      GetApiGeolocationByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Geolocation/${queryArg.id}` }),
    }),
    createJob: build.mutation<CreateJobApiResponse, CreateJobApiArg>({
      query: (queryArg) => ({
        url: `/api/Job/Create`,
        method: "POST",
        body: queryArg.createJobCommand,
      }),
    }),
    getAllJobs: build.query<GetAllJobsApiResponse, GetAllJobsApiArg>({
      query: () => ({ url: `/api/Job/allJobs` }),
    }),
    getJobCById: build.query<GetJobCByIdApiResponse, GetJobCByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/Job/getById`,
        params: { id: queryArg.id },
      }),
    }),
    updateJob: build.mutation<UpdateJobApiResponse, UpdateJobApiArg>({
      query: (queryArg) => ({
        url: `/api/Job/update`,
        method: "PUT",
        body: queryArg.updateJobCommand,
      }),
    }),
    getJobCountByStatus: build.query<
      GetJobCountByStatusApiResponse,
      GetJobCountByStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Job/counts`,
        params: { EmployerId: queryArg.employerId },
      }),
    }),
    getAllJobByStatus: build.query<
      GetAllJobByStatusApiResponse,
      GetAllJobByStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Job/allJobByStatus`,
        params: {
          status: queryArg.status,
          EmployerId: queryArg.employerId,
          pageNumber: queryArg.pageNumber,
          pageSize: queryArg.pageSize,
        },
      }),
    }),
    createJobApplication: build.mutation<
      CreateJobApplicationApiResponse,
      CreateJobApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/Create`,
        method: "POST",
        body: queryArg.createJobApplicationCommand,
      }),
    }),
    getJobApplicationByJobId: build.query<
      GetJobApplicationByJobIdApiResponse,
      GetJobApplicationByJobIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/getByJobId${queryArg.id}`,
      }),
    }),
    getAllJobApplications: build.query<
      GetAllJobApplicationsApiResponse,
      GetAllJobApplicationsApiArg
    >({
      query: () => ({ url: `/api/JobApplications/all` }),
    }),
    updateJobApplication: build.mutation<
      UpdateJobApplicationApiResponse,
      UpdateJobApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/all`,
        method: "PUT",
        body: queryArg.updateJobApplicationCommand,
      }),
    }),
    getJobApplicationCountByStatus: build.query<
      GetJobApplicationCountByStatusApiResponse,
      GetJobApplicationCountByStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/counts`,
        params: { FreelancerId: queryArg.freelancerId },
      }),
    }),
    getAllJobApplicationByStatus: build.query<
      GetAllJobApplicationByStatusApiResponse,
      GetAllJobApplicationByStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/allByStatus`,
        params: {
          status: queryArg.status,
          FreelancerId: queryArg.freelancerId,
          pageNumber: queryArg.pageNumber,
          pageSize: queryArg.pageSize,
        },
      }),
    }),
    getAllOpenJobByStatus: build.query<
      GetAllOpenJobByStatusApiResponse,
      GetAllOpenJobByStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/allOpenJobByStatus`,
        params: {
          status: queryArg.status,
          pageNumber: queryArg.pageNumber,
          pageSize: queryArg.pageSize,
        },
      }),
    }),
    approveJobApplication: build.mutation<
      ApproveJobApplicationApiResponse,
      ApproveJobApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/approve`,
        method: "PATCH",
        body: queryArg.approveJobApplicationCommand,
      }),
    }),
    closeJobApplication: build.mutation<
      CloseJobApplicationApiResponse,
      CloseJobApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/close`,
        method: "PATCH",
        body: queryArg.closeJobApplicationCommand,
      }),
    }),
    rejectJobApplication: build.mutation<
      RejectJobApplicationApiResponse,
      RejectJobApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications/reject`,
        method: "PATCH",
        body: queryArg.rejectJobApplicationCommand,
      }),
    }),
    createSkill: build.mutation<CreateSkillApiResponse, CreateSkillApiArg>({
      query: (queryArg) => ({
        url: `/api/Skill/Create`,
        method: "POST",
        body: queryArg.createSkillCommand,
      }),
    }),
    updateSkill: build.mutation<UpdateSkillApiResponse, UpdateSkillApiArg>({
      query: (queryArg) => ({
        url: `/api/Skill/update`,
        method: "PUT",
        body: queryArg.updateSkillCommand,
      }),
    }),
    getSkillById: build.query<GetSkillByIdApiResponse, GetSkillByIdApiArg>({
      query: (queryArg) => ({ url: `/api/Skill/getById${queryArg.id}` }),
    }),
    getAllSkill: build.query<GetAllSkillApiResponse, GetAllSkillApiArg>({
      query: () => ({ url: `/api/Skill/all` }),
    }),
    getUserSkill: build.query<GetUserSkillApiResponse, GetUserSkillApiArg>({
      query: (queryArg) => ({
        url: `/api/UserSkills/getByUserId${queryArg.userId}`,
      }),
    }),
    addUserSkill: build.mutation<AddUserSkillApiResponse, AddUserSkillApiArg>({
      query: (queryArg) => ({
        url: `/api/UserSkills/add`,
        method: "POST",
        body: queryArg.addUserSkillCommand,
      }),
    }),
    removeUserSkill: build.mutation<
      RemoveUserSkillApiResponse,
      RemoveUserSkillApiArg
    >({
      query: (queryArg) => ({
        url: `/api/UserSkills/remove${queryArg.userSkillId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as SMSApi };
export type PostApiAuthenticationSeedRolesApiResponse =
  /** status 200 OK */ ResponseDto;
export type PostApiAuthenticationSeedRolesApiArg = void;
export type MakeUserFreelancerApiResponse = /** status 200 OK */ ResponseDto;
export type MakeUserFreelancerApiArg = {
  updatePermissionDto: UpdatePermissionDto;
};
export type MakeUserAdminApiResponse = /** status 200 OK */ ResponseDto;
export type MakeUserAdminApiArg = {
  updatePermissionDto: UpdatePermissionDto;
};
export type MakeUserEmployerApiResponse = /** status 200 OK */ ResponseDto;
export type MakeUserEmployerApiArg = {
  updatePermissionDto: UpdatePermissionDto;
};
export type GetAllUserApiResponse = /** status 200 OK */ DzJobUser[];
export type GetAllUserApiArg = void;
export type GetUserByIdApiResponse = /** status 200 OK */ DzJobUser;
export type GetUserByIdApiArg = {
  id?: string;
};
export type CreateUserApiResponse = /** status 200 OK */ ResponseDto;
export type CreateUserApiArg = {
  registerUser: RegisterUser;
};
export type ConfirmEmailApiResponse = /** status 200 OK */ ResponseDto;
export type ConfirmEmailApiArg = {
  token?: string;
  email?: string;
};
export type LoginApiResponse = /** status 200 OK */ ResponseDto;
export type LoginApiArg = {
  login: Login;
};
export type ConfirmOtpApiResponse = /** status 200 OK */ ResponseDto;
export type ConfirmOtpApiArg = {
  code?: string;
  email?: string;
};
export type ForgetPasswordApiResponse = /** status 200 OK */ Response;
export type ForgetPasswordApiArg = {
  email: string;
};
export type ResetPasswordApiResponse = /** status 200 OK */ ResetPassword;
export type ResetPasswordApiArg = {
  token?: string;
  email?: string;
};
export type PasswordRestApiResponse = /** status 200 OK */ Response;
export type PasswordRestApiArg = {
  resetPassword: ResetPassword;
};
export type GetApiAuthenticationTestEmailApiResponse =
  /** status 200 OK */ Response;
export type GetApiAuthenticationTestEmailApiArg = void;
export type CreateEducationApiResponse = /** status 200 OK */ number;
export type CreateEducationApiArg = {
  createEducationCommand: CreateEducationCommand;
};
export type UpdateEducationApiResponse = /** status 200 OK */ number;
export type UpdateEducationApiArg = {
  updateEducationCommand: UpdateEducationCommand;
};
export type GetEducationByIdApiResponse = /** status 200 OK */ EducationDto;
export type GetEducationByIdApiArg = {
  id: number;
};
export type GetAllEducationApiResponse = /** status 200 OK */ EducationDto[];
export type GetAllEducationApiArg = void;
export type CreateEmployerProfileApiResponse = /** status 200 OK */ number;
export type CreateEmployerProfileApiArg = {
  createEmployerProfileCommand: CreateEmployerProfileCommand;
};
export type UpdateEmployerProfileApiResponse = /** status 200 OK */ number;
export type UpdateEmployerProfileApiArg = {
  updateEmployerProfileCommand: UpdateEmployerProfileCommand;
};
export type GetEmployerProfileByIdApiResponse =
  /** status 200 OK */ EmployerProfileDto;
export type GetEmployerProfileByIdApiArg = {
  id: number;
};
export type GetAllEmployerProfileApiResponse =
  /** status 200 OK */ EmployerProfileDto[];
export type GetAllEmployerProfileApiArg = void;
export type CreateEmploymentHistoryApiResponse = /** status 200 OK */ number;
export type CreateEmploymentHistoryApiArg = {
  createEmploymentHistoryCommand: CreateEmploymentHistoryCommand;
};
export type UpdateEmploymentHistoryApiResponse = unknown;
export type UpdateEmploymentHistoryApiArg = {
  id?: number;
  updateEmploymentHistoryCommand: UpdateEmploymentHistoryCommand;
};
export type GetEmploymentHistoryByIdApiResponse =
  /** status 200 OK */ EmploymentHistoryDto;
export type GetEmploymentHistoryByIdApiArg = {
  id: number;
};
export type GetAllEmploymentHistoryApiResponse =
  /** status 200 OK */ EmploymentHistoryDto[];
export type GetAllEmploymentHistoryApiArg = void;
export type CreateFreelancerProfileApiResponse = /** status 200 OK */ number;
export type CreateFreelancerProfileApiArg = {
  createFreelancerProfileCommand: CreateFreelancerProfileCommand;
};
export type GetFreelancerProfileByIdApiResponse =
  /** status 200 OK */ FreelancerProfileDto;
export type GetFreelancerProfileByIdApiArg = {
  id: number;
};
export type GetAllFreelancerProfilesApiResponse =
  /** status 200 OK */ FreelancerProfileDto[];
export type GetAllFreelancerProfilesApiArg = void;
export type UpdateFreelancerProfileApiResponse = /** status 200 OK */ number;
export type UpdateFreelancerProfileApiArg = {
  updateFreelancerProfileCommand: UpdateFreelancerProfileCommand;
};
export type PostApiGeolocationApiResponse = /** status 200 OK */ number;
export type PostApiGeolocationApiArg = {
  createGeolocationCommand: CreateGeolocationCommand;
};
export type PutApiGeolocationApiResponse = /** status 200 OK */ number;
export type PutApiGeolocationApiArg = {
  updateGeolocationCommand: UpdateGeolocationCommand;
};
export type GetApiGeolocationApiResponse =
  /** status 200 OK */ GeolocationDto[];
export type GetApiGeolocationApiArg = void;
export type GetApiGeolocationByIdApiResponse =
  /** status 200 OK */ GeolocationDto;
export type GetApiGeolocationByIdApiArg = {
  id: number;
};
export type CreateJobApiResponse = /** status 200 OK */ number;
export type CreateJobApiArg = {
  createJobCommand: CreateJobCommand;
};
export type GetAllJobsApiResponse = /** status 200 OK */ JobDto[];
export type GetAllJobsApiArg = void;
export type GetJobCByIdApiResponse = /** status 200 OK */ JobDto;
export type GetJobCByIdApiArg = {
  id?: number;
};
export type UpdateJobApiResponse = /** status 200 OK */ number;
export type UpdateJobApiArg = {
  updateJobCommand: UpdateJobCommand;
};
export type GetJobCountByStatusApiResponse =
  /** status 200 OK */ JobCountsByStatus;
export type GetJobCountByStatusApiArg = {
  employerId?: string;
};
export type GetAllJobByStatusApiResponse = /** status 200 OK */ JobSearchResult;
export type GetAllJobByStatusApiArg = {
  status?: JobStatus;
  employerId?: string;
  pageNumber?: number;
  pageSize?: number;
};
export type CreateJobApplicationApiResponse = unknown;
export type CreateJobApplicationApiArg = {
  createJobApplicationCommand: CreateJobApplicationCommand;
};
export type GetJobApplicationByJobIdApiResponse =
  /** status 200 OK */ JobApplicationSearchByJobIdResult;
export type GetJobApplicationByJobIdApiArg = {
  id: number;
};
export type GetAllJobApplicationsApiResponse =
  /** status 200 OK */ JobApplicationDto[];
export type GetAllJobApplicationsApiArg = void;
export type UpdateJobApplicationApiResponse = /** status 200 OK */ number;
export type UpdateJobApplicationApiArg = {
  updateJobApplicationCommand: UpdateJobApplicationCommand;
};
export type GetJobApplicationCountByStatusApiResponse =
  /** status 200 OK */ JobApplicationCountsByStatus;
export type GetJobApplicationCountByStatusApiArg = {
  freelancerId?: string;
};
export type GetAllJobApplicationByStatusApiResponse =
  /** status 200 OK */ JobApplicationSearchResult;
export type GetAllJobApplicationByStatusApiArg = {
  status?: ApplicationStatus;
  freelancerId?: string;
  pageNumber?: number;
  pageSize?: number;
};
export type GetAllOpenJobByStatusApiResponse =
  /** status 200 OK */ OpenJobSearchResult;
export type GetAllOpenJobByStatusApiArg = {
  status?: JobStatus;
  pageNumber?: number;
  pageSize?: number;
};
export type ApproveJobApplicationApiResponse = /** status 200 OK */ number;
export type ApproveJobApplicationApiArg = {
  approveJobApplicationCommand: ApproveJobApplicationCommand;
};
export type CloseJobApplicationApiResponse = /** status 200 OK */ number;
export type CloseJobApplicationApiArg = {
  closeJobApplicationCommand: CloseJobApplicationCommand;
};
export type RejectJobApplicationApiResponse = /** status 200 OK */ number;
export type RejectJobApplicationApiArg = {
  rejectJobApplicationCommand: RejectJobApplicationCommand;
};
export type CreateSkillApiResponse = /** status 200 OK */ number;
export type CreateSkillApiArg = {
  createSkillCommand: CreateSkillCommand;
};
export type UpdateSkillApiResponse = /** status 200 OK */ number;
export type UpdateSkillApiArg = {
  updateSkillCommand: UpdateSkillCommand;
};
export type GetSkillByIdApiResponse = /** status 200 OK */ SkillDto;
export type GetSkillByIdApiArg = {
  id: number;
};
export type GetAllSkillApiResponse = /** status 200 OK */ SkillDto[];
export type GetAllSkillApiArg = void;
export type GetUserSkillApiResponse = /** status 200 OK */ UserSkillDto[];
export type GetUserSkillApiArg = {
  userId: string;
};
export type AddUserSkillApiResponse = /** status 200 OK */ number;
export type AddUserSkillApiArg = {
  addUserSkillCommand: AddUserSkillCommand;
};
export type RemoveUserSkillApiResponse = /** status 200 OK */ boolean;
export type RemoveUserSkillApiArg = {
  userSkillId: number;
};
export type ResponseDto = {
  userId?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  status?: boolean;
  message?: string | null;
  statusCode?: number;
  token?: string | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
};
export type UpdatePermissionDto = {
  email: string;
};
export type JobCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type JobType = 1 | 2 | 3 | 4;
export type JobStatus = 1 | 2 | 3 | 4;
export type ApplicationStatus = 1 | 2 | 3;
export type JobApplication = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  jobId?: number;
  job?: Job;
  freelancerId?: string | null;
  freelancer?: DzJobUser;
  coverLetter?: string | null;
  proposedSalary?: number;
  appliedDate?: string;
  status?: ApplicationStatus;
};
export type ContractStatus = 1 | 2 | 3 | 4;
export type MilestoneStatus = 1 | 2 | 3;
export type Milestone = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  contractId?: string | null;
  contract?: Contract;
  title?: string | null;
  amount?: number;
  dueDate?: string;
  status?: MilestoneStatus;
};
export type Contract = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  jobId?: number;
  job?: Job;
  freelancerId?: string | null;
  freelancer?: DzJobUser;
  employerId?: string | null;
  employer?: DzJobUser;
  agreedAmount?: number;
  startDate?: string;
  endDate?: string;
  status?: ContractStatus;
  milestones?: Milestone[] | null;
};
export type Review = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  jobId?: number;
  job?: Job;
  reviewerId?: string | null;
  reviewer?: DzJobUser;
  content?: string | null;
  rating?: number;
  reviewDate?: string;
};
export type Job = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  title?: string | null;
  description?: string | null;
  jobCategory?: JobCategory;
  jobType?: JobType;
  salary?: number;
  postedDate?: string;
  employerId?: string | null;
  employer?: DzJobUser;
  status?: JobStatus;
  applications?: JobApplication[] | null;
  contracts?: Contract[] | null;
  reviews?: Review[] | null;
};
export type Message = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  jobId?: number;
  job?: Job;
  senderId?: string | null;
  sender?: DzJobUser;
  receiverId?: string | null;
  receiver?: DzJobUser;
  content?: string | null;
  sentDate?: string;
};
export type NotificationType = 1 | 2 | 3 | 4 | 5;
export type Notification = {
  id?: number;
  updatedAt?: string;
  userId?: string | null;
  user?: DzJobUser;
  message?: string | null;
  isRead?: boolean;
  type?: NotificationType;
  createdAt?: string;
};
export type Skill = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name?: string | null;
  description?: string | null;
  userSkills?: UserSkill[] | null;
};
export type UserSkill = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string | null;
  user?: DzJobUser;
  skillId?: number;
  skill?: Skill;
};
export type DzJobUser = {
  id?: string | null;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed?: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  firstName?: string | null;
  lastName?: string | null;
  isVerified?: boolean;
  jobsPosted?: Job[] | null;
  jobApplications?: JobApplication[] | null;
  contracts?: Contract[] | null;
  reviews?: Review[] | null;
  messages?: Message[] | null;
  notifications?: Notification[] | null;
  userSkills?: UserSkill[] | null;
};
export type RegisterUser = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  isVerified?: boolean;
};
export type Login = {
  email?: string | null;
  password?: string | null;
};
export type Response = {
  userId?: string | null;
  email?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: string | null;
  password?: string | null;
  token?: string | null;
  message?: string | null;
  statusCode?: number;
  status?: boolean;
};
export type ResetPassword = {
  password?: string | null;
  confirmPassword?: string | null;
  email?: string | null;
  token?: string | null;
};
export type EducationLevelEnum =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;
export type CreateEducationCommand = {
  userId?: string | null;
  educationLevel?: EducationLevelEnum;
  startDate?: string;
  endDate?: string;
  schoolName?: string | null;
  schoolCity?: string | null;
  fieldOfStudy?: string | null;
  graduationDate?: string;
};
export type UpdateEducationCommand = {
  id?: number;
  educationLevel?: EducationLevelEnum;
  startDate?: string;
  endDate?: string;
  schoolName?: string | null;
  schoolCity?: string | null;
  fieldOfStudy?: string | null;
  graduationDate?: string;
};
export type EducationDto = {
  id?: number;
  userId?: string | null;
  user?: string | null;
  educationLevel?: EducationLevelEnum;
  startDate?: string;
  endDate?: string;
  schoolName?: string | null;
  schoolCity?: string | null;
  fieldOfStudy?: string | null;
  graduationDate?: string;
};
export type CreateEmployerProfileCommand = {
  companyName?: string | null;
  companyDescription?: string | null;
  logo?: string | null;
  jobHistoryCount?: number;
  averageRating?: number;
  dzJobUserId?: string | null;
};
export type UpdateEmployerProfileCommand = {
  id?: number;
  companyName?: string | null;
  companyDescription?: string | null;
  logo?: string | null;
  jobHistoryCount?: number;
  averageRating?: number;
};
export type EmployerProfileDto = {
  id?: number;
  companyName?: string | null;
  companyDescription?: string | null;
  logo?: string | null;
  jobHistoryCount?: number;
  averageRating?: number;
  dzJobUserId?: string | null;
};
export type CreateEmploymentHistoryCommand = {
  userId?: string | null;
  companyName?: string | null;
  jobTitle?: string | null;
  startDate?: string;
  endDate?: string;
  description?: string | null;
};
export type UpdateEmploymentHistoryCommand = {
  id?: number;
  companyName?: string | null;
  jobTitle?: string | null;
  startDate?: string;
  endDate?: string;
  description?: string | null;
};
export type EmploymentHistoryDto = {
  id?: number;
  userId?: string | null;
  companyName?: string | null;
  jobTitle?: string | null;
  startDate?: string;
  endDate?: string;
  description?: string | null;
};
export type CreateFreelancerProfileCommand = {
  bio?: string | null;
  skills?: string | null;
  portfolio?: string | null;
  rating?: number;
  experience?: number;
  hourlyRate?: number;
  location?: string | null;
  dzJobUserId?: string | null;
};
export type FreelancerProfileDto = {
  id?: number;
  bio?: string | null;
  skills?: string | null;
  portfolio?: string | null;
  rating?: number;
  experience?: number;
  hourlyRate?: number;
  location?: string | null;
  dzJobUserId?: string | null;
  dzJobUser?: string | null;
};
export type UpdateFreelancerProfileCommand = {
  id?: number;
  bio?: string | null;
  skills?: string | null;
  portfolio?: string | null;
  rating?: number;
  experience?: number;
  hourlyRate?: number;
  location?: string | null;
};
export type CreateGeolocationCommand = {
  userId?: string | null;
  latitude?: number;
  longitude?: number;
};
export type UpdateGeolocationCommand = {
  id?: number;
  latitude?: number;
  longitude?: number;
};
export type GeolocationDto = {
  id?: number;
  userId?: string | null;
  latitude?: number;
  longitude?: number;
};
export type CreateJobCommand = {
  title?: string | null;
  description?: string | null;
  jobCategory?: JobCategory;
  jobType?: JobType;
  salary?: number;
  employerId?: string | null;
};
export type JobDto = {
  id?: number;
  title?: string | null;
  description?: string | null;
  jobCategory?: JobCategory;
  jobType?: JobType;
  salary?: number;
  postedDate?: string;
  employerId?: string | null;
  employerName?: string | null;
  status?: JobStatus;
};
export type UpdateJobCommand = {
  id?: number;
  title?: string | null;
  description?: string | null;
  jobCategory?: JobCategory;
  jobType?: number;
  salary?: number;
  status?: number;
};
export type JobCountsByStatus = {
  closed?: number;
  inProgress?: number;
  archived?: number;
  open?: number;
};
export type JobSearchResult = {
  items?: JobDto[] | null;
  totalCount?: number;
};
export type CreateJobApplicationCommand = {
  jobId?: number;
  freelancerId?: string | null;
  coverLetter?: string | null;
  proposedSalary?: number;
};
export type JobApplicationDto = {
  id?: number;
  jobId?: number;
  job?: string | null;
  freelancerId?: string | null;
  freelancer?: string | null;
  coverLetter?: string | null;
  proposedSalary?: number;
  appliedDate?: string;
  status?: ApplicationStatus;
  createdAt?: string;
  updatedAt?: string;
};
export type JobApplicationSearchByJobIdResult = {
  items?: JobApplicationDto[] | null;
  totalCount?: number;
};
export type UpdateJobApplicationCommand = {
  id?: number;
  coverLetter?: string | null;
  proposedSalary?: number;
  status?: number;
};
export type JobApplicationCountsByStatus = {
  accepted?: number;
  rejected?: number;
  pending?: number;
};
export type JobApplicationSearchResult = {
  items?: JobApplicationDto[] | null;
  totalCount?: number;
};
export type OpenJobSearchResult = {
  items?: JobDto[] | null;
  totalCount?: number;
};
export type ApproveJobApplicationCommand = {
  applicantId?: number;
  jobId?: number;
};
export type CloseJobApplicationCommand = {
  applicantId?: number;
  jobId?: number;
};
export type RejectJobApplicationCommand = {
  applicantId?: number;
  jobId?: number;
};
export type CreateSkillCommand = {
  name?: string | null;
  description?: string | null;
};
export type UpdateSkillCommand = {
  id?: number;
  name?: string | null;
  description?: string | null;
};
export type SkillDto = {
  id?: number;
  name?: string | null;
  description?: string | null;
};
export type UserSkillDto = {
  id?: number;
  skillId?: number;
  skillName?: string | null;
  userId?: string | null;
};
export type AddUserSkillCommand = {
  userId?: string | null;
  skillId?: number;
};
export const {
  usePostApiAuthenticationSeedRolesMutation,
  useMakeUserFreelancerMutation,
  useMakeUserAdminMutation,
  useMakeUserEmployerMutation,
  useGetAllUserQuery,
  useLazyGetAllUserQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useCreateUserMutation,
  useConfirmEmailQuery,
  useLazyConfirmEmailQuery,
  useLoginMutation,
  useConfirmOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordQuery,
  useLazyResetPasswordQuery,
  usePasswordRestMutation,
  useGetApiAuthenticationTestEmailQuery,
  useLazyGetApiAuthenticationTestEmailQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useGetEducationByIdQuery,
  useLazyGetEducationByIdQuery,
  useGetAllEducationQuery,
  useLazyGetAllEducationQuery,
  useCreateEmployerProfileMutation,
  useUpdateEmployerProfileMutation,
  useGetEmployerProfileByIdQuery,
  useLazyGetEmployerProfileByIdQuery,
  useGetAllEmployerProfileQuery,
  useLazyGetAllEmployerProfileQuery,
  useCreateEmploymentHistoryMutation,
  useUpdateEmploymentHistoryMutation,
  useGetEmploymentHistoryByIdQuery,
  useLazyGetEmploymentHistoryByIdQuery,
  useGetAllEmploymentHistoryQuery,
  useLazyGetAllEmploymentHistoryQuery,
  useCreateFreelancerProfileMutation,
  useGetFreelancerProfileByIdQuery,
  useLazyGetFreelancerProfileByIdQuery,
  useGetAllFreelancerProfilesQuery,
  useLazyGetAllFreelancerProfilesQuery,
  useUpdateFreelancerProfileMutation,
  usePostApiGeolocationMutation,
  usePutApiGeolocationMutation,
  useGetApiGeolocationQuery,
  useLazyGetApiGeolocationQuery,
  useGetApiGeolocationByIdQuery,
  useLazyGetApiGeolocationByIdQuery,
  useCreateJobMutation,
  useGetAllJobsQuery,
  useLazyGetAllJobsQuery,
  useGetJobCByIdQuery,
  useLazyGetJobCByIdQuery,
  useUpdateJobMutation,
  useGetJobCountByStatusQuery,
  useLazyGetJobCountByStatusQuery,
  useGetAllJobByStatusQuery,
  useLazyGetAllJobByStatusQuery,
  useCreateJobApplicationMutation,
  useGetJobApplicationByJobIdQuery,
  useLazyGetJobApplicationByJobIdQuery,
  useGetAllJobApplicationsQuery,
  useLazyGetAllJobApplicationsQuery,
  useUpdateJobApplicationMutation,
  useGetJobApplicationCountByStatusQuery,
  useLazyGetJobApplicationCountByStatusQuery,
  useGetAllJobApplicationByStatusQuery,
  useLazyGetAllJobApplicationByStatusQuery,
  useGetAllOpenJobByStatusQuery,
  useLazyGetAllOpenJobByStatusQuery,
  useApproveJobApplicationMutation,
  useCloseJobApplicationMutation,
  useRejectJobApplicationMutation,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useGetSkillByIdQuery,
  useLazyGetSkillByIdQuery,
  useGetAllSkillQuery,
  useLazyGetAllSkillQuery,
  useGetUserSkillQuery,
  useLazyGetUserSkillQuery,
  useAddUserSkillMutation,
  useRemoveUserSkillMutation,
} = injectedRtkApi;
