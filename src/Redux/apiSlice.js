import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  return localStorage.getItem("token");
};

const baseQuery = fetchBaseQuery({
  baseUrl: "https://be-mms-nestjs.onrender.com",
  prepareHeaders: (headers) => {
    const token = getBearerToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
