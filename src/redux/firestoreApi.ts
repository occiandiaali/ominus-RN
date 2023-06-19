import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';

export const fireStoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  tagTypes: ['electronic', 'household', 'fashion', 'vehicle'],
  endpoints: () => ({}),
});
