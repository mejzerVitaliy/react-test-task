import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../../app/types/UsersDataTypes";

const base_url = 'https://react-test-task.onrender.com/'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes:['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
            providesTags: ['User']
        }),
        createUser: builder.mutation<void, User>({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation<void, { id: string, updatedUser: User }>({
            query: ({ id, updatedUser }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: updatedUser,
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } = usersApi
