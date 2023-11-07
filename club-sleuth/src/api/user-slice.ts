import { User } from '../domain/user';
import { apiSlice } from './api-slice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserByID: builder.query({
      query: ({ id }) => ({ url: `user/${id}`, method: 'POST', body: id }),
      transformResponse: (reponseData: User) => reponseData,
      providesTags: ['User'],
    }),
    getUserByInfo: builder.mutation({
      query: ({ email, password }) => ({
        url: `users/${email}/${password}`,
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (reponseData: User) => reponseData,
    }),
    createUser: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: `users/new/${firstName}/${lastName}/${email}/${password}`,
        method: 'POST',
        body: { firstName, lastName, email, password },
      }),
      transformResponse: (reponseData: any) => reponseData,
      invalidatesTags: ['User']
    }),
  }),
});

export const { useGetUserByIDQuery, useGetUserByInfoMutation, useCreateUserMutation } = userSlice;
