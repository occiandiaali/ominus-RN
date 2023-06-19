import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
//import {productsApi} from './slices/apiSlice';
//import userReducer from './reducers/userReducer';

import {fireStoreApi} from './firestoreApi';

const store = configureStore({
  reducer: {
    // user: userReducer,
    [fireStoreApi.reducerPath]: fireStoreApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(fireStoreApi.middleware),
});

setupListeners(store.dispatch);

export default store;
