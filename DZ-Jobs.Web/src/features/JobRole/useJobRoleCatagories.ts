// import { useMemo } from "react";
// import { SelectOption } from "../../../types";
// import { useGetAllLookupsQuery } from "../../../app/api/HCMSApi";

// export const useJobRoleCategories = () => {
//   const { data } = useGetAllLookupsQuery();
//   const { jobRoleCatagoriesLookups, jobRoleCategories } = useMemo(() => {
//     const jobRoleCatagoriesLookups = (
//       data?.jobRoleCategories || []
//     ).map<SelectOption>(({ id, jobRoleCategoryName }) => ({
//       label: jobRoleCategoryName || "",
//       value: id,
//     }));
//     return {
//       jobRoleCatagoriesLookups,
//       jobRoleCategories: data?.jobRoleCategories || [],
//     };
//   }, [data]);
//   return {
//     jobRoleCategories,
//     jobRoleCatagoriesLookups,
//   };
// };
