import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../../app/types/UsersDataTypes";

const base_url = 'http://localhost:5000'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes:['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<any[], void>({
            query: () => '/users',
            providesTags: ['User']
        }),
        createUser: builder.mutation<void, User>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const { useGetUsersQuery, useCreateUserMutation } = usersApi
