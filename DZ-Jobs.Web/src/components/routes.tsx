import { useEffect } from "react";
import {
  matchRoutes,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  RegisterNewUser
} from "../features/SysAdmin";

import { Login } from "../features";
import { RegisterEducation } from "../features/Education/RegisterEducation";
import { ClosedJobs, InprogressJobs, OpenJobs } from "../features/Job/JobGrids";
import { ArchivedJobs } from "../features/Job/JobGrids/ArchivedJobs";
import { JobRoleHome } from "../features/Job/JobRoleHome";
import { AcceptedJobApplication } from "../features/JobApplication/JobApplicationGrids/AcceptedJobApplication";
import { OpenJobsForApplication } from "../features/JobApplication/JobApplicationGrids/OpenJobsForApplication";
import { PendingJobApplication } from "../features/JobApplication/JobApplicationGrids/PendingJobApplication";
import { RejectedJobApplication } from "../features/JobApplication/JobApplicationGrids/RejectedJobApplication";
import { JobApplicationHome } from "../features/JobApplication/JobApplicationHome";
import UserSkillSelector from "../features/Skill/UserSkillSelector";
import { MFA } from "../features/user/mfa";
import { RoleSelection } from "../features/user/RoleSelection";
import { RegisterEmployerProfile } from "../features/userProfile/EmployerProfile/RegisterEmployerProfile";
import { RegisterFreelancerProfile } from "../features/userProfile/freelancerProfile/RegisterFreelancerProfile";
import { useAuth } from "../hooks";


const AppRoutes = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const location = useLocation();
  const matches = matchRoutes([{ path: "/login" }], location);

  useEffect(() => {
    if (loggedIn && matches && matches[0]?.route.path === "/login") {
      navigate("/login");
    }
  }, [loggedIn, navigate, matches]);

  return (
    <Routes>
      <Route index path="login" element={<Login />} />
      <Route path="verify" element={<MFA />} />
      <Route path="new-user" element={<RegisterNewUser />} />
      <Route path="frelancer-profile" element={<RegisterFreelancerProfile />} />
      <Route path="employer-profile" element={<RegisterEmployerProfile />} />
      <Route path="education" element={<RegisterEducation />} />
      <Route path="skills" element={<UserSkillSelector />} />
      <Route path="/employer-dashboard" element={<JobRoleHome />}>
        <Route index element={<ClosedJobs />} />
        <Route path="inprogress-jobs" element={<InprogressJobs />} />
        <Route path="archived-jobs" element={<ArchivedJobs />}/>
        <Route path="open-jobs" element={<OpenJobs />} />
      </Route>
      <Route path="/freelancer-dashboard" element={<JobApplicationHome />}>
        <Route index element={<OpenJobsForApplication />} />
        <Route path="rejected" element={<RejectedJobApplication />} />
        <Route path="accepted" element={<AcceptedJobApplication />}/>
        <Route path="pending" element={<PendingJobApplication />} />
      </Route>
      <Route path="role-selection" element={<RoleSelection />} />
  
      {/* <Route path="dashboard" element={<Dashboard />} /> */}

      {/* <Route element={<AuthenticatedRoutes />}> */}
        <Route path="/" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default AppRoutes;
