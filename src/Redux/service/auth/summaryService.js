import { apiSlice } from "../../apiSlice";

export const summaryService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getsummary: builder.query({
      query: () => {
        return {
          url: "summary",
          method: "GET",
        };
      },
    }),
    deleteSummary: builder.mutation({
      query: (id) => ({
        url: `summary/${id}`,
        method: "DELETE",
      }),
    }),
    createSummary: builder.mutation({
      query: ({ postBody }) => ({
        url: "summary",
        method: "POST",
        body: postBody,
      }),
    }),
  }),
});

export const {
  useGetsummaryQuery,
  useDeleteSummaryMutation,
  useCreateSummaryMutation,
} = summaryService;
