import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
//import {BING_IMAGES_RAPIDAPI_BASEURL, RAPIDAPI} from '@env';

export const bingImagesApi = createApi({
  reducerPath: 'bingImagesApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://bing-image-search1.p.rapidapi.com/',
    //baseUrl: 'https://api.bing.microsoft.com/',
    baseUrl: 'https://fakestoreapi.com/',
    prepareHeaders(headers) {
      headers.set('Accept', 'application/json');
      //  headers.set();
      headers.set(
        'X-RapidAPI-Key',
        '68d97d068amsh6e29993afa3d9b1p154d43jsnb7bfb59480e3',
      );
      headers.set('X-RapidAPI-Host', 'bing-image-search1.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: builder => ({
    getBingImages: builder.query({
      query: term => ({
        //  url: `v7.0/images/search?q=${term}`,
        //url: `images/search?q=${term}`,
        url: `products/category/${encodeURIComponent(term)}?limit=8`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetBingImagesQuery} = bingImagesApi;
