import { useMemo } from "react";
//import { useGetAllLookupsQuery } from "../app/api";

export const useCurrentDividendPeriod = () => {
 // const { data } = useGetAllLookupsQuery();

  const periods = useMemo(
    () => ({

    }),
    []
  );

  return periods;
};
