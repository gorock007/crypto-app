import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_COINRANKING_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_COINRANKING_HOST,
}

const baseUrl = process.env.REACT_APP_COINRANKING_URL;

const createRequest = (url) =>({
    url, headers: cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query:(count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinuuid) => createRequest(`/coin/${coinuuid}`), 
        }),
        getCryptoHistory: builder.query({
            query: ({coinuuid, timeperiod}) => createRequest(`coin/${coinuuid}/history/?timeperiod=${timeperiod}`), 
        })
    })        
})    

//redux-toolkit creates a hook that you can 
//call instantly to get all the data
//
export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery}  = cryptoApi;  