import { apiSlice } from "../../apiSlice";

export const bazarService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBazar: builder.query({
      query: () => {
        return {
          url: "bazar",
          method: "GET",
        };
      },
    }),
    //start Create data
    createBazar: builder.mutation({
      query: ({ postBody }) => ({
        url: "bazar",
        method: "POST",
        body: postBody,
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            dispatch(
              apiSlice.util.updateQueryData("getBazar", undefined, (draft) => {
                draft.unshift(data?.data);
              })
            );
          })
          .catch(({ error }) => {
            console.log(error);
          });
      },
    }),
    //end create data
    //start update data
    editBazar: builder.mutation({
      query: ({ postBody, id }) => ({
        url: `bazar/${id}`,
        method: "PUT",
        body: postBody,
      }),
      onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        queryFulfilled;
        queryFulfilled
          .then(({ data }) => {
            dispatch(
              apiSlice.util.updateQueryData("getBazar", undefined, (draft) => {
                const findIndex = draft.findIndex((item) => item._id === id);
                draft[findIndex] = data?.data;
              })
            );
          })
          .catch(({ error }) => {
            console.log(error);
          });
      },
    }),
    //end update data
    //start delete data
    deletebazar: builder.mutation({
      query: ({ id }) => ({
        url: `bazar/${id}`,
        method: "DELETE",
      }),
      onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        queryFulfilled;
        queryFulfilled
          .then(({ massage }) => {
            console.log(massage);
            dispatch(
              apiSlice.util.updateQueryData("getBazar", undefined, (draft) => {
                return (draft = draft.filter((item) => item._id !== id));
              })
            );
          })
          .catch(({ error }) => {
            console.log(error);
          });
      },
    }),
    //end delete data
    singleBazar: builder.query({
      query: ({ id }) => {
        return {
          url: `bazar/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetBazarQuery,
  useCreateBazarMutation,
  useEditBazarMutation,
  useDeletebazarMutation,
  useSingleBazarQuery,
} = bazarService;
