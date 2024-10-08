import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const base_url = 'https://react-test-task.onrender.com/'

export const departmentsApi = createApi({
    reducerPath: 'departmentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getDepartments: builder.query<any[], void>({
            query: () => 'departments'
        })
    })
})

export const { useGetDepartmentsQuery } = departmentsApi