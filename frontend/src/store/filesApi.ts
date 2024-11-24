import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFile } from '../interfaces';

export const filesApi = createApi({
  reducerPath: 'files',
  baseQuery: fetchBaseQuery({
    baseUrl: `api/files`,
    credentials: 'include',
  }),
  tagTypes: ['files', 'file'],

  endpoints: (builder) => ({
    getFiles: builder.query<IFile[], void>({
      query: () => ({
        url: '',
      }),
      providesTags: ['files'],
    }),

    uploadFile: builder.mutation<void, FormData>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['files'],
    }),

    getFile: builder.query<IFile, string | undefined>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ['file'],
    }),

    editFile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['file', 'files'],
    }),

    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['files'],
    }),

    // searchFiles: builder.query({
    //   query: (params) => ({
    //     url: `/search?${params}`,
    //   }),
    // }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileQuery,
  useDeleteFileMutation,
  useEditFileMutation,
  useUploadFileMutation,
} = filesApi;
