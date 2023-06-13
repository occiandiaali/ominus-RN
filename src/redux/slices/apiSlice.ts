import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/'}),
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: () => 'products?limit=10',
      keepUnusedDataFor: 5,
    }),
    getAllPhones: builder.query({
      query: () => 'products/category/smartphones',
    }),
    getAllLaptops: builder.query({
      query: () => 'products/category/laptops',
    }),
    getProduct: builder.query({
      query: product => `products/search?q=${product}&limit=10`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetAllLaptopsQuery,
  useGetAllPhonesQuery,
} = productsApi;
