import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'fbb8fcade8mshd2f5cead3355549p1ba9a5jsn41c8de5511af',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

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