import { apiSlice } from "../../apiSlice";

export const mealService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getmeal: builder.query({
      query: () => {
        return {
          url: "meal",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetmealQuery } = mealService;
