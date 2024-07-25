/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { apiSlice } from "../../apiSlice";

export const userService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query({
      query: () => ({
        url: `users`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    userCreate: builder.mutation({
      query: (postBody) => ({
        url: `users`,
        method: "POST",
        body: postBody,
      }),
      async onQueryStarted({ postBody }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, message },
          } = await queryFulfilled;
        } catch (error) {}
      },
    }),

    userUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: postBody,
      }),
      onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        queryFulfilled;
        queryFulfilled
          .then(({ data: { data, message } }) => {})
          .catch(({ error }) => {});
      },
    }),
    userDelete: builder.mutation({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        queryFulfilled;
        queryFulfilled
          .then(({ data: { data, message } }) => {})
          .catch(({ error }) => {});
      },
    }),
  }),
});
export const { useUserCreateMutation, useUserListQuery } = userService;
