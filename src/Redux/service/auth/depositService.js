import { apiSlice } from "../../apiSlice";

export const depositService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeposite: builder.query({
      query: () => {
        return {
          url: "deposit",
          method: "GET",
        };
      },
    }),
    createDeposit: builder.mutation({
      query: ({ postBody }) => ({
        url: "deposit",
        method: "POST",
        body: postBody,
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            dispatch(
              apiSlice.util.updateQueryData(
                "getDeposite",
                undefined,
                (draft) => {
                  draft.unshift(data?.data?.deposit);
                }
              )
            );
          })
          .catch(({ error }) => {
            console.log(error);
          });
      },
    }),
    deleteDeposit: builder.mutation({
      query: (id) => ({
        url: `deposit/${id}`,
        method: "DELETE",
      }),
    }),
    editDeposit: builder.mutation({
      query: ({ postBody, id }) => ({
        url: `deposit/${id}`,
        method: "PUT",
        body: postBody,
      }),
    }),
    singleDeposit: builder.query({
      query: ({ id }) => {
        return {
          url: `deposit/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetDepositeQuery,
  useCreateDepositMutation,
  useDeleteDepositMutation,
  useEditDepositMutation,
  useSingleDepositQuery,
} = depositService;
