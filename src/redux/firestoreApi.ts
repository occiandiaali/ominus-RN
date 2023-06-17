import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';

export const fireStoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    'electronicProduct',
    'houseHoldProduct',
    'fashionProduct',
    'vehicleProduct',
  ],
  endpoints: () => ({}),
});
