import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = 'http://localhost:10000'

export const statusesApi = createApi({
    reducerPath: 'statusesApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getStatuses: builder.query<any[], void>({
            query: () => '/statuses'
        })
    })
});

export const { useGetStatusesQuery } = statusesApi

