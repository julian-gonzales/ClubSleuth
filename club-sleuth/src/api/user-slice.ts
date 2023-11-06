import { User } from '../domain/user';
import { apiSlice } from './api-slice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ id }) => `user/${id}`,
      transformResponse: (reponseData: User) => reponseData,
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery } = userSlice;
