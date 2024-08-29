import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const base_url = 'http://localhost:10000'

export const departmentsApi = createApi({
    reducerPath: 'departmentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getDepartments: builder.query<any[], void>({
            query: () => '/departments'
        })
    })
})

export const { useGetDepartmentsQuery } = departmentsApi