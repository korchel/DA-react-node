import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDocument } from '../interfaces';
import { IDocForm } from '../components/ModalComponent/document/docFormSchema';

export const docsApi = createApi({
  reducerPath: 'documents',
  baseQuery: fetchBaseQuery({
    baseUrl: `api/documents`,
    credentials: 'include',
  }),
  tagTypes: ['docs', 'doc'],
  endpoints: (builder) => ({
    getDocs: builder.query<IDocument[], void>({
      query: () => ({
        url: '',
      }),
      providesTags: ['docs'],
    }),

    getDoc: builder.query<IDocument, string | undefined>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ['doc'],
    }),

    createDoc: builder.mutation<void, IDocForm>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['docs'],
    }),

    deleteDoc: builder.mutation<void, string | undefined>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['docs'],
    }),

    editDoc: builder.mutation<
      boolean,
      { data: IDocForm; id: string | undefined }
    >({
      query: ({ data, id }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['docs', 'doc'],
    }),

    // searchDoc: builder.query({
    //   //pageNumber
    //   query: (params) => ({
    //     url: `/search?${params}`,
    //   }),
    // }),
  }),
});

export const {
  useGetDocsQuery,
  useGetDocQuery,
  useDeleteDocMutation,
  useCreateDocMutation,
  useEditDocMutation,
} = docsApi;
