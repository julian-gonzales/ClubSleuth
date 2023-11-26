import { Club } from '../domain/club';
import { apiSlice } from './api-slice';

export const clubSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query({
      query: ({ province, city }) => `clubs/${province}/${city}`,
      transformResponse: (reponseData: Club[]) => reponseData,
      providesTags: ['Clubs'],
    }),
    getSingleClubQuery: builder.query({
      query: ({ id }) => `clubs/${id}`,
      transformResponse: (responseData: Club) => responseData,
      providesTags: ['Clubs'],
    }),
    getUserClubs: builder.query({
      query: ({ id }) => `user-clubs/${id}`,
      transformResponse: (responseData: Club[]) => responseData,
      providesTags: ['Clubs'],
    }),
    updateUserClub: builder.mutation({
      query: ({
        id,
        name,
        description,
        active,
        province,
        city,
        members,
        participation,
        reoccuringEvents,
        futureEvents,
        website,
      }) => ({
        url: `user/update-club`,
        method: 'PUT',
        body: {
          id,
          name,
          description,
          active,
          province,
          city,
          members,
          participation,
          reoccuringEvents,
          futureEvents,
          website,
        },
      }),
      transformResponse: (responseData: Club) => responseData,
      invalidatesTags: ['Clubs'],
    }),
    createUserClub: builder.mutation({
      query: ({
        user,
        name,
        description,
        active,
        province,
        city,
        members,
        participation,
        reoccuringEvents,
        futureEvents,
        website,
      }) => ({
        url: `users/create-club`,
        method: 'POST',
        body: {
          user,
          name,
          description,
          active,
          province,
          city,
          members,
          participation,
          reoccuringEvents,
          futureEvents,
          website,
        },
      }),
      transformResponse: (responseData: Club) => responseData,
      invalidatesTags: ['Clubs'],
    }),
    deleteClub: builder.mutation({
      query: ({ id }) => ({
        url: `user/delete-club`,
        method: 'PUT',
        body: {
          id,
        },
      }),
      transformResponse: (responseData: Club) => responseData,
      invalidatesTags: ['Clubs'],
    }),
  }),
});

export const {
  useGetClubsQuery,
  useGetSingleClubQueryQuery,
  useGetUserClubsQuery,
  useUpdateUserClubMutation,
  useCreateUserClubMutation,
  useDeleteClubMutation,
} = clubSlice;
