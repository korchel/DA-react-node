import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../interfaces';
import { IEditUserForm } from '../components/ModalComponent/user/userUpdateSchema';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.URL}/api/users`,
    credentials: 'include',
  }),
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: '',
      }),
      providesTags: ['users'],
    }),

    getUser: builder.query<IUser, string | undefined>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ['user'],
    }),

    deleteUser: builder.mutation<boolean, string | undefined>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),

    editUser: builder.mutation<
      void,
      { data: IEditUserForm; id: string | undefined }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['users', 'user'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = usersApi;
