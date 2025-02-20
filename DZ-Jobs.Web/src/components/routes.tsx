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

import { Dashboard, Login } from "../features";
import { MFA } from "../features/user/mfa";
import { RoleSelection } from "../features/user/RoleSelection";
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
      <Route path="role-selection" element={<RoleSelection />} />
  
      <Route path="dashboard" element={<Dashboard />} />

      {/* <Route element={<AuthenticatedRoutes />}> */}
        <Route path="/" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default AppRoutes;
