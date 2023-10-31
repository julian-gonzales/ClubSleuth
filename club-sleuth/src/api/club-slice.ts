import { Club } from '../domain/club';
import { apiSlice } from './api-slice';

export const clubSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query({
      query: ({ province, city }) => `clubs/${province}/${city}`,
      transformResponse: (reponseData: Club[]) => reponseData,
      providesTags: ['Clubs'],
    }),
    getSingleClub: builder.query({
      query: ({ id }) => `clubs/${id}`,
      transformResponse: (responseData: Club) => responseData,
      providesTags: ['Clubs'],
    }),
  }),
});

export const { useGetClubsQuery, useGetSingleClubQuery } = clubSlice;
