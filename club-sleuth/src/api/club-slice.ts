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
        active,
        description,
        province,
        city,
        members,
        participation,
      }) => ({
        url: `user/update-club/${id}/${name}/${active}/${description}/${province}/${city}/${members}/${participation}`,
        method: 'POST',
        body: {
          id,
          name,
          active,
          description,
          province,
          city,
          members,
          participation,
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
} = clubSlice;
