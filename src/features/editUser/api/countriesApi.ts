import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const base_url = 'https://react-test-task.onrender.com'

export const countriesApi = createApi({
    reducerPath: 'countriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCountries: builder.query<any[], void>({
            query: () => '/countries'
        })
    })
})

export const {useGetCountriesQuery} = countriesApi