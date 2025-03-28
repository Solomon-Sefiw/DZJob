import { useState } from "react";
//import { useCurrentUserInfoQuery, UserDto } from "../app/api";

export const useAuth = () => {
  const [state,] = useState<{
    loggedIn?: boolean;
    user?: any;
    isLoading?: boolean;
  }>({ loggedIn: false, isLoading: true });
 
  return state;
};
