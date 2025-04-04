import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "DZJobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dzjobs-api.somee.com", // Base API URL
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
