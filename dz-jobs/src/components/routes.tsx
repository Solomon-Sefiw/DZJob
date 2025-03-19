import { useEffect } from "react";
import {
  matchRoutes,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RegisterEducation } from "../features/Education/RegisterEducation";
import { ClosedJobs, InprogressJobs, OpenJobs } from "../features/Job/JobGrids";
import { ArchivedJobs } from "../features/Job/JobGrids/ArchivedJobs";
import { JobHome } from "../features/Job/JobHome";
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
import { useAuth } from "../features/hooks/useAuth";
import { Login } from "../features/user";
import { RegisterNewUser } from "../features/user/RegisterNewUser";
import Layout from "./layout/Layout";
import AboutMe from "../pages/AboutMe";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import Chat from "../features/Chat/Chat";
import { EmployerContractHome } from "../features/Contract/Employer/EmployerContractHome";
import { DraftEmployerContract } from "../features/Contract/Employer/EmployerContractGrids/DraftEmployerContract";



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

      <Route path="/" element={<Layout />}>
        <Route index path="login" element={<Login />} />
        <Route path="about" element={<AboutMe />} />
        {/* <Route path="skills" element={<Skills />} /> */}
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="/chat/:jobId/:senderId/:receiverId"
          element={<Chat />}
        />


        {/* <Route index path="login" element={<Login />} /> */}
        <Route path="verify" element={<MFA />} />
        <Route path="new-user" element={<RegisterNewUser />} />
        <Route path="frelancer-profile" element={<RegisterFreelancerProfile />} />
        <Route path="employer-profile" element={<RegisterEmployerProfile />} />
        <Route path="education" element={<RegisterEducation />} />
        <Route path="skills" element={<UserSkillSelector />} />
        <Route path="/employer-dashboard" element={<JobHome />}>
          <Route index element={<ClosedJobs />} />
          <Route path="inprogress-jobs" element={<InprogressJobs />} />
          <Route path="archived-jobs" element={<ArchivedJobs />} />
          <Route path="open-jobs" element={<OpenJobs />} />
        </Route>
        <Route path="/employer-Contract" element={<EmployerContractHome />}>
          <Route index element={<ClosedJobs />} />
          <Route path="inprogress-jobs" element={<InprogressJobs />} />
          <Route path="archived-jobs" element={<ArchivedJobs />} />
          <Route path="draft-Contract" element={<DraftEmployerContract />} />
        </Route>



        <Route path="/freelancer-dashboard" element={<JobApplicationHome />}>
          <Route index element={<OpenJobsForApplication />} />
          <Route path="rejected" element={<RejectedJobApplication />} />
          <Route path="accepted" element={<AcceptedJobApplication />} />
          <Route path="pending" element={<PendingJobApplication />} />
        </Route>
        <Route path="role-selection" element={<RoleSelection />} />


        {/* <Route path="dashboard" element={<Dashboard />} /> */}

        {/* <Route element={<AuthenticatedRoutes />}> */}
        <Route path="/" element={<Navigate to="/login" replace />} />




      </Route>

    </Routes>
  );
};

export default AppRoutes;
