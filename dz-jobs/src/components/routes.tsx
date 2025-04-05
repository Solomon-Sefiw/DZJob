// src/routes/AppRoutes.tsx
import { Navigate, Route, Routes } from "react-router-dom";
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
import { Login } from "../features/user";
import { RegisterNewUser } from "../features/user/RegisterNewUser";
import Layout from "./layout/Layout";
import AboutMe from "../pages/AboutMe";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import { EmployerContractHome } from "../features/Contract/Employer/EmployerContractHome";
import { DraftEmployerContract } from "../features/Contract/Employer/EmployerContractGrids/DraftEmployerContract";
import { PendingEmployerContract } from "../features/Contract/Employer/EmployerContractGrids/PendingEmployerContract";
import { FreelancerContractHome } from "../features/Contract/Freelancer/FreelancerContractHome";
import { PendingFreelancerContract } from "../features/Contract/Freelancer/FreelancerContractGrids/PendingFreelancerContract";
import { ActiveEmployerContract } from "../features/Contract/Employer/EmployerContractGrids/ActiveEmployerContract";
import { CompletedEmployerContract } from "../features/Contract/Employer/EmployerContractGrids/CompletedEmployerContract";
import { ActiveFreelancerContract } from "../features/Contract/Freelancer/FreelancerContractGrids/ActiveFreelancerContract";
import { CompletedFreelancerContract } from "../features/Contract/Freelancer/FreelancerContractGrids/CompletedFreelancerContract";
import ChatList from "../features/Chat/ChatList";
import ChatDetail from "../features/Chat/ChatDetail";
import PrivateRoute from "./PrivateRoute";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index path="login" element={<Login />} />
        <Route path="about" element={<AboutMe />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="verify" element={<MFA />} />
        <Route path="new-user" element={<RegisterNewUser />} />
        <Route path="role-selection" element={<RoleSelection />} />

        {/* Protected Routes */}
        <Route
          path="frelancer-profile"
          element={<PrivateRoute><RegisterFreelancerProfile /></PrivateRoute>}
        />
        <Route
          path="employer-profile"
          element={<PrivateRoute><RegisterEmployerProfile /></PrivateRoute>}
        />
        <Route
          path="education"
          element={<PrivateRoute><RegisterEducation /></PrivateRoute>}
        />
        <Route
          path="skills"
          element={<PrivateRoute><UserSkillSelector /></PrivateRoute>}
        />
        <Route
          path="message"
          element={<PrivateRoute><ChatList /></PrivateRoute>}
        />
        <Route
          path="/chat/:chatPartnerId"
          element={<PrivateRoute><ChatDetail /></PrivateRoute>}
        />
        <Route
          path="/employer-dashboard"
          element={<PrivateRoute><JobHome /></PrivateRoute>}
        >
          <Route index element={<ClosedJobs />} />
          <Route path="inprogress-jobs" element={<InprogressJobs />} />
          <Route path="archived-jobs" element={<ArchivedJobs />} />
          <Route path="open-jobs" element={<OpenJobs />} />
        </Route>
        <Route
          path="/employer-Contract"
          element={<PrivateRoute><EmployerContractHome /></PrivateRoute>}
        >
          <Route index element={<CompletedEmployerContract />} />
          <Route path="active-Contract" element={<ActiveEmployerContract />} />
          <Route path="pending-Contract" element={<PendingEmployerContract />} />
          <Route path="draft-Contract" element={<DraftEmployerContract />} />
        </Route>
        <Route
          path="/freelancer-Contract"
          element={<PrivateRoute><FreelancerContractHome /></PrivateRoute>}
        >
          <Route index element={<CompletedFreelancerContract />} />
          <Route path="active-Contract" element={<ActiveFreelancerContract />} />
          <Route path="pending-Contract" element={<PendingFreelancerContract />} />
          <Route path="draft-Contract" element={<DraftEmployerContract />} />
        </Route>
        <Route
          path="/freelancer-dashboard"
          element={<PrivateRoute><JobApplicationHome /></PrivateRoute>}
        >
          <Route index element={<OpenJobsForApplication />} />
          <Route path="rejected" element={<RejectedJobApplication />} />
          <Route path="accepted" element={<AcceptedJobApplication />} />
          <Route path="pending" element={<PendingJobApplication />} />
        </Route>

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
