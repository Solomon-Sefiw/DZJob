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
  /** status 200 OK */ Response;
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
export type PostApiJobCreateApiResponse = /** status 200 OK */ number;
export type PostApiJobCreateApiArg = {
  createJobCommand: CreateJobCommand;
};
export type GetApiJobApiResponse = /** status 200 OK */ JobDto[];
export type GetApiJobApiArg = void;
export type Response = {
  status?: boolean;
  message?: string | null;
  statusCode?: number;
};
export type UpdatePermissionDto = {
  email: string;
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
export type JobType = 1 | 2 | 3 | 4;
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
  usePostApiJobCreateMutation,
  useGetApiJobQuery,
  useLazyGetApiJobQuery,
} = injectedRtkApi;
