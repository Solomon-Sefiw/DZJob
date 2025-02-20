import { emptySplitApi as api } from "./emptySplitApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiAuthenticationSeedRoles: build.mutation<
      PostApiAuthenticationSeedRolesApiResponse,
      PostApiAuthenticationSeedRolesApiArg
    >({
      query: () => ({ url: `/api/Authentication/seed-Roles`, method: "POST" }),
    }),
    postApiAuthenticationGiveFreelancerRole: build.mutation<
      PostApiAuthenticationGiveFreelancerRoleApiResponse,
      PostApiAuthenticationGiveFreelancerRoleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Give-Freelancer-Role`,
        method: "POST",
        body: queryArg.updatePermissionDto,
      }),
    }),
    postApiAuthenticationGiveAdminRole: build.mutation<
      PostApiAuthenticationGiveAdminRoleApiResponse,
      PostApiAuthenticationGiveAdminRoleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Give-Admin-Role`,
        method: "POST",
        body: queryArg.updatePermissionDto,
      }),
    }),
    postApiAuthenticationGiveEmployerRole: build.mutation<
      PostApiAuthenticationGiveEmployerRoleApiResponse,
      PostApiAuthenticationGiveEmployerRoleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Give-Employer-Role`,
        method: "POST",
        body: queryArg.updatePermissionDto,
      }),
    }),
    getApiAuthenticationGetAllUser: build.query<
      GetApiAuthenticationGetAllUserApiResponse,
      GetApiAuthenticationGetAllUserApiArg
    >({
      query: () => ({ url: `/api/Authentication/GetAllUser` }),
    }),
    postApiAuthenticationCreate: build.mutation<
      PostApiAuthenticationCreateApiResponse,
      PostApiAuthenticationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Create`,
        method: "POST",
        body: queryArg.registerUser,
      }),
    }),
    getApiAuthenticationConfiremEmailAuto: build.query<
      GetApiAuthenticationConfiremEmailAutoApiResponse,
      GetApiAuthenticationConfiremEmailAutoApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Confirem Email/Auto`,
        params: { token: queryArg.token, email: queryArg.email },
      }),
    }),
    postApiAuthenticationLogin: build.mutation<
      PostApiAuthenticationLoginApiResponse,
      PostApiAuthenticationLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Login`,
        method: "POST",
        body: queryArg.login,
      }),
    }),
    postApiAuthenticationConfirmOtp: build.mutation<
      PostApiAuthenticationConfirmOtpApiResponse,
      PostApiAuthenticationConfirmOtpApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Confirm-OTP`,
        method: "POST",
        params: { code: queryArg.code, email: queryArg.email },
      }),
    }),
    postApiAuthenticationForgotPassword: build.mutation<
      PostApiAuthenticationForgotPasswordApiResponse,
      PostApiAuthenticationForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Forgot-Password`,
        method: "POST",
        params: { email: queryArg.email },
      }),
    }),
    getApiAuthenticationResetPasswordAuto: build.query<
      GetApiAuthenticationResetPasswordAutoApiResponse,
      GetApiAuthenticationResetPasswordAutoApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Authentication/Reset-Password/Auto`,
        params: { token: queryArg.token, email: queryArg.email },
      }),
    }),
    postApiAuthenticationResetPassword: build.mutation<
      PostApiAuthenticationResetPasswordApiResponse,
      PostApiAuthenticationResetPasswordApiArg
    >({
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
    postApiEducations: build.mutation<
      PostApiEducationsApiResponse,
      PostApiEducationsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Educations`,
        method: "POST",
        body: queryArg.createEducationCommand,
      }),
    }),
    putApiEducations: build.mutation<
      PutApiEducationsApiResponse,
      PutApiEducationsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Educations`,
        method: "PUT",
        body: queryArg.updateEducationCommand,
      }),
    }),
    getApiEducations: build.query<
      GetApiEducationsApiResponse,
      GetApiEducationsApiArg
    >({
      query: () => ({ url: `/api/Educations` }),
    }),
    getApiEducationsById: build.query<
      GetApiEducationsByIdApiResponse,
      GetApiEducationsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Educations/${queryArg.id}` }),
    }),
    postApiEmployerProfile: build.mutation<
      PostApiEmployerProfileApiResponse,
      PostApiEmployerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmployerProfile`,
        method: "POST",
        body: queryArg.createEmployerProfileCommand,
      }),
    }),
    putApiEmployerProfile: build.mutation<
      PutApiEmployerProfileApiResponse,
      PutApiEmployerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/EmployerProfile`,
        method: "PUT",
        body: queryArg.updateEmployerProfileCommand,
      }),
    }),
    getApiEmployerProfile: build.query<
      GetApiEmployerProfileApiResponse,
      GetApiEmployerProfileApiArg
    >({
      query: () => ({ url: `/api/EmployerProfile` }),
    }),
    getApiEmployerProfileById: build.query<
      GetApiEmployerProfileByIdApiResponse,
      GetApiEmployerProfileByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/EmployerProfile/${queryArg.id}` }),
    }),
    postApiFreelancerProfile: build.mutation<
      PostApiFreelancerProfileApiResponse,
      PostApiFreelancerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/FreelancerProfile`,
        method: "POST",
        body: queryArg.createFreelancerProfileCommand,
      }),
    }),
    getApiFreelancerProfile: build.query<
      GetApiFreelancerProfileApiResponse,
      GetApiFreelancerProfileApiArg
    >({
      query: () => ({ url: `/api/FreelancerProfile` }),
    }),
    putApiFreelancerProfile: build.mutation<
      PutApiFreelancerProfileApiResponse,
      PutApiFreelancerProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/FreelancerProfile`,
        method: "PUT",
        body: queryArg.updateFreelancerProfileCommand,
      }),
    }),
    getApiFreelancerProfileById: build.query<
      GetApiFreelancerProfileByIdApiResponse,
      GetApiFreelancerProfileByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/FreelancerProfile/${queryArg.id}` }),
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
    postApiJobCreate: build.mutation<
      PostApiJobCreateApiResponse,
      PostApiJobCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Job/create`,
        method: "POST",
        body: queryArg.createJobCommand,
      }),
    }),
    getApiJob: build.query<GetApiJobApiResponse, GetApiJobApiArg>({
      query: () => ({ url: `/api/Job` }),
    }),
    putApiJob: build.mutation<PutApiJobApiResponse, PutApiJobApiArg>({
      query: (queryArg) => ({
        url: `/api/Job`,
        method: "PUT",
        body: queryArg.updateJobCommand,
      }),
    }),
    getApiJobById: build.query<GetApiJobByIdApiResponse, GetApiJobByIdApiArg>({
      query: (queryArg) => ({ url: `/api/Job/${queryArg.id}` }),
    }),
    postApiJobApplications: build.mutation<
      PostApiJobApplicationsApiResponse,
      PostApiJobApplicationsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications`,
        method: "POST",
        body: queryArg.createJobApplicationCommand,
      }),
    }),
    getApiJobApplications: build.query<
      GetApiJobApplicationsApiResponse,
      GetApiJobApplicationsApiArg
    >({
      query: () => ({ url: `/api/JobApplications` }),
    }),
    putApiJobApplications: build.mutation<
      PutApiJobApplicationsApiResponse,
      PutApiJobApplicationsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/JobApplications`,
        method: "PUT",
        body: queryArg.updateJobApplicationCommand,
      }),
    }),
    getApiJobApplicationsById: build.query<
      GetApiJobApplicationsByIdApiResponse,
      GetApiJobApplicationsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/JobApplications/${queryArg.id}` }),
    }),
    postApiSkill: build.mutation<PostApiSkillApiResponse, PostApiSkillApiArg>({
      query: (queryArg) => ({
        url: `/api/Skill`,
        method: "POST",
        body: queryArg.createSkillCommand,
      }),
    }),
    putApiSkill: build.mutation<PutApiSkillApiResponse, PutApiSkillApiArg>({
      query: (queryArg) => ({
        url: `/api/Skill`,
        method: "PUT",
        body: queryArg.updateSkillCommand,
      }),
    }),
    getApiSkill: build.query<GetApiSkillApiResponse, GetApiSkillApiArg>({
      query: () => ({ url: `/api/Skill` }),
    }),
    getApiSkillById: build.query<
      GetApiSkillByIdApiResponse,
      GetApiSkillByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Skill/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as SMSApi };
export type PostApiAuthenticationSeedRolesApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationSeedRolesApiArg = void;
export type PostApiAuthenticationGiveFreelancerRoleApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationGiveFreelancerRoleApiArg = {
  updatePermissionDto: UpdatePermissionDto;
};
export type PostApiAuthenticationGiveAdminRoleApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationGiveAdminRoleApiArg = {
  updatePermissionDto: UpdatePermissionDto;
};
export type PostApiAuthenticationGiveEmployerRoleApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationGiveEmployerRoleApiArg = {
  updatePermissionDto: UpdatePermissionDto;
};
export type GetApiAuthenticationGetAllUserApiResponse =
  /** status 200 OK */ DzJobUser[];
export type GetApiAuthenticationGetAllUserApiArg = void;
export type PostApiAuthenticationCreateApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationCreateApiArg = {
  registerUser: RegisterUser;
};
export type GetApiAuthenticationConfiremEmailAutoApiResponse =
  /** status 200 OK */ Response;
export type GetApiAuthenticationConfiremEmailAutoApiArg = {
  token?: string;
  email?: string;
};
export type PostApiAuthenticationLoginApiResponse = unknown;
export type PostApiAuthenticationLoginApiArg = {
  login: Login;
};
export type PostApiAuthenticationConfirmOtpApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationConfirmOtpApiArg = {
  code?: string;
  email?: string;
};
export type PostApiAuthenticationForgotPasswordApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationForgotPasswordApiArg = {
  email: string;
};
export type GetApiAuthenticationResetPasswordAutoApiResponse =
  /** status 200 OK */ ResetPassword;
export type GetApiAuthenticationResetPasswordAutoApiArg = {
  token?: string;
  email?: string;
};
export type PostApiAuthenticationResetPasswordApiResponse =
  /** status 200 OK */ Response;
export type PostApiAuthenticationResetPasswordApiArg = {
  resetPassword: ResetPassword;
};
export type GetApiAuthenticationTestEmailApiResponse =
  /** status 200 OK */ Response;
export type GetApiAuthenticationTestEmailApiArg = void;
export type PostApiEducationsApiResponse = /** status 200 OK */ number;
export type PostApiEducationsApiArg = {
  createEducationCommand: CreateEducationCommand;
};
export type PutApiEducationsApiResponse = /** status 200 OK */ number;
export type PutApiEducationsApiArg = {
  updateEducationCommand: UpdateEducationCommand;
};
export type GetApiEducationsApiResponse = /** status 200 OK */ EducationDto[];
export type GetApiEducationsApiArg = void;
export type GetApiEducationsByIdApiResponse = /** status 200 OK */ EducationDto;
export type GetApiEducationsByIdApiArg = {
  id: number;
};
export type PostApiEmployerProfileApiResponse = /** status 200 OK */ number;
export type PostApiEmployerProfileApiArg = {
  createEmployerProfileCommand: CreateEmployerProfileCommand;
};
export type PutApiEmployerProfileApiResponse = /** status 200 OK */ number;
export type PutApiEmployerProfileApiArg = {
  updateEmployerProfileCommand: UpdateEmployerProfileCommand;
};
export type GetApiEmployerProfileApiResponse =
  /** status 200 OK */ EmployerProfileDto[];
export type GetApiEmployerProfileApiArg = void;
export type GetApiEmployerProfileByIdApiResponse =
  /** status 200 OK */ EmployerProfileDto;
export type GetApiEmployerProfileByIdApiArg = {
  id: number;
};
export type PostApiFreelancerProfileApiResponse = /** status 200 OK */ number;
export type PostApiFreelancerProfileApiArg = {
  createFreelancerProfileCommand: CreateFreelancerProfileCommand;
};
export type GetApiFreelancerProfileApiResponse =
  /** status 200 OK */ FreelancerProfileDto[];
export type GetApiFreelancerProfileApiArg = void;
export type PutApiFreelancerProfileApiResponse = /** status 200 OK */ number;
export type PutApiFreelancerProfileApiArg = {
  updateFreelancerProfileCommand: UpdateFreelancerProfileCommand;
};
export type GetApiFreelancerProfileByIdApiResponse =
  /** status 200 OK */ FreelancerProfileDto;
export type GetApiFreelancerProfileByIdApiArg = {
  id: number;
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
export type PostApiJobCreateApiResponse = /** status 200 OK */ number;
export type PostApiJobCreateApiArg = {
  createJobCommand: CreateJobCommand;
};
export type GetApiJobApiResponse = /** status 200 OK */ JobDto[];
export type GetApiJobApiArg = void;
export type PutApiJobApiResponse = /** status 200 OK */ number;
export type PutApiJobApiArg = {
  updateJobCommand: UpdateJobCommand;
};
export type GetApiJobByIdApiResponse = /** status 200 OK */ JobDto;
export type GetApiJobByIdApiArg = {
  id: number;
};
export type PostApiJobApplicationsApiResponse = unknown;
export type PostApiJobApplicationsApiArg = {
  createJobApplicationCommand: CreateJobApplicationCommand;
};
export type GetApiJobApplicationsApiResponse =
  /** status 200 OK */ JobApplicationDto[];
export type GetApiJobApplicationsApiArg = void;
export type PutApiJobApplicationsApiResponse = /** status 200 OK */ number;
export type PutApiJobApplicationsApiArg = {
  updateJobApplicationCommand: UpdateJobApplicationCommand;
};
export type GetApiJobApplicationsByIdApiResponse = unknown;
export type GetApiJobApplicationsByIdApiArg = {
  id: number;
};
export type PostApiSkillApiResponse = /** status 200 OK */ number;
export type PostApiSkillApiArg = {
  createSkillCommand: CreateSkillCommand;
};
export type PutApiSkillApiResponse = /** status 200 OK */ number;
export type PutApiSkillApiArg = {
  updateSkillCommand: UpdateSkillCommand;
};
export type GetApiSkillApiResponse = /** status 200 OK */ SkillDto[];
export type GetApiSkillApiArg = void;
export type GetApiSkillByIdApiResponse = /** status 200 OK */ SkillDto;
export type GetApiSkillByIdApiArg = {
  id: number;
};
export type Response = {
  status?: boolean;
  message?: string | null;
  statusCode?: number;
};
export type UpdatePermissionDto = {
  email: string;
};
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
  agreedSalary?: number;
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
  category?: string | null;
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
export type DzJobUser = {
  id?: string | null;
  userName?: string | null;
  normalizedUserName?: string | null;
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
  email?: string | null;
  isVerified?: boolean;
  jobsPosted?: Job[] | null;
  jobApplications?: JobApplication[] | null;
  contracts?: Contract[] | null;
  reviews?: Review[] | null;
  messages?: Message[] | null;
  notifications?: Notification[] | null;
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
  educationLevel?: string | null;
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
  category?: string | null;
  jobType?: JobType;
  salary?: number;
  employerId?: string | null;
};
export type JobDto = {
  id?: number;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  jobType?: string | null;
  salary?: number;
  postedDate?: string;
  employerId?: string | null;
  employerName?: string | null;
  status?: string | null;
};
export type UpdateJobCommand = {
  jobId?: number;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  jobType?: number;
  salary?: number;
  status?: number;
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
export type UpdateJobApplicationCommand = {
  id?: number;
  coverLetter?: string | null;
  proposedSalary?: number;
  status?: number;
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
export const {
  usePostApiAuthenticationSeedRolesMutation,
  usePostApiAuthenticationGiveFreelancerRoleMutation,
  usePostApiAuthenticationGiveAdminRoleMutation,
  usePostApiAuthenticationGiveEmployerRoleMutation,
  useGetApiAuthenticationGetAllUserQuery,
  useLazyGetApiAuthenticationGetAllUserQuery,
  usePostApiAuthenticationCreateMutation,
  useGetApiAuthenticationConfiremEmailAutoQuery,
  useLazyGetApiAuthenticationConfiremEmailAutoQuery,
  usePostApiAuthenticationLoginMutation,
  usePostApiAuthenticationConfirmOtpMutation,
  usePostApiAuthenticationForgotPasswordMutation,
  useGetApiAuthenticationResetPasswordAutoQuery,
  useLazyGetApiAuthenticationResetPasswordAutoQuery,
  usePostApiAuthenticationResetPasswordMutation,
  useGetApiAuthenticationTestEmailQuery,
  useLazyGetApiAuthenticationTestEmailQuery,
  usePostApiEducationsMutation,
  usePutApiEducationsMutation,
  useGetApiEducationsQuery,
  useLazyGetApiEducationsQuery,
  useGetApiEducationsByIdQuery,
  useLazyGetApiEducationsByIdQuery,
  usePostApiEmployerProfileMutation,
  usePutApiEmployerProfileMutation,
  useGetApiEmployerProfileQuery,
  useLazyGetApiEmployerProfileQuery,
  useGetApiEmployerProfileByIdQuery,
  useLazyGetApiEmployerProfileByIdQuery,
  usePostApiFreelancerProfileMutation,
  useGetApiFreelancerProfileQuery,
  useLazyGetApiFreelancerProfileQuery,
  usePutApiFreelancerProfileMutation,
  useGetApiFreelancerProfileByIdQuery,
  useLazyGetApiFreelancerProfileByIdQuery,
  usePostApiGeolocationMutation,
  usePutApiGeolocationMutation,
  useGetApiGeolocationQuery,
  useLazyGetApiGeolocationQuery,
  useGetApiGeolocationByIdQuery,
  useLazyGetApiGeolocationByIdQuery,
  usePostApiJobCreateMutation,
  useGetApiJobQuery,
  useLazyGetApiJobQuery,
  usePutApiJobMutation,
  useGetApiJobByIdQuery,
  useLazyGetApiJobByIdQuery,
  usePostApiJobApplicationsMutation,
  useGetApiJobApplicationsQuery,
  useLazyGetApiJobApplicationsQuery,
  usePutApiJobApplicationsMutation,
  useGetApiJobApplicationsByIdQuery,
  useLazyGetApiJobApplicationsByIdQuery,
  usePostApiSkillMutation,
  usePutApiSkillMutation,
  useGetApiSkillQuery,
  useLazyGetApiSkillQuery,
  useGetApiSkillByIdQuery,
  useLazyGetApiSkillByIdQuery,
} = injectedRtkApi;
