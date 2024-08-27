import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = 'http://localhost:5000'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getUsers: builder.query<any[], void>({
            query: () => '/users'
        })
    })
})

export const { useGetUsersQuery } = usersApi
