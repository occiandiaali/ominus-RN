import firestore from '@react-native-firebase/firestore';
import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {fireStoreApi} from '../../../redux/firestoreApi';
import {Product, Products} from '../../../types';

// export const firestoreProductsApi = createApi({
//   baseQuery: fakeBaseQuery(),
//   tagTypes: [
//     'electronicProduct',
//     'houseHoldProduct',
//     'fashionProduct',
//     'vehicleProduct',
//   ],
//   endpoints: builder => ({
//     fetchElectronicsPosts: builder.query<Products, void>({
//       async queryFn() {
//         try {
//           const querySnapshot = await firestore()
//             .collection('Posts')
//             .where('category', '==', 'Electronics')
//             .get();
//           let electronicProducts: Products = [];
//           querySnapshot?.forEach((doc: any) => {
//             electronicProducts.push({
//               ...doc.data(),
//               img: doc.data().imageurl,
//               title: doc.data().title,
//               category: doc.data().category,
//               description: doc.data().description,
//               price: doc.data().price,
//               createdOn: doc.data().created.toDate().toDateString(),
//               expiresOn: doc.data().expires.toDate().toDateString(),
//             } as Product);
//           });
//           return {data: electronicProducts};
//         } catch (error: any) {
//           console.log(error.message);
//           return {error: error.message};
//         }
//       },
//       providesTags: ['electronicProduct'],
//     }),
//     fetchHouseholdPosts: builder.query<Products, void>({
//       async queryFn() {
//         try {
//           const querySnapshot = await firestore()
//             .collection('Posts')
//             .where('category', '==', 'Household')
//             .get();
//           let householdProducts: Products = [];
//           querySnapshot?.forEach((doc: any) => {
//             householdProducts.push({
//               img: doc.data().imageurl,
//               title: doc.data().title,
//               category: doc.data().category,
//               desc: doc.data().description,
//               price: doc.data().price,
//               createdOn: doc.data().created.toDate().toDateString(),
//               expiresOn: doc.data().expires.toDate().toDateString(),
//               ...doc.data(),
//             } as Product);
//           });
//           return {data: householdProducts};
//         } catch (error: any) {
//           console.log(error.message);
//           return {error: error.message};
//         }
//       },
//       providesTags: ['houseHoldProduct'],
//     }),
//     fetchFashionPosts: builder.query<Products, void>({
//       async queryFn() {
//         try {
//           const querySnapshot = await firestore()
//             .collection('Posts')
//             .where('category', '==', 'Fashion')
//             .get();
//           let fashionProducts: Products = [];
//           querySnapshot?.forEach((doc: any) => {
//             fashionProducts.push({
//               img: doc.data().imageurl,
//               title: doc.data().title,
//               category: doc.data().category,
//               desc: doc.data().description,
//               price: doc.data().price,
//               createdOn: doc.data().created.toDate().toDateString(),
//               expiresOn: doc.data().expires.toDate().toDateString(),
//               ...doc.data(),
//             } as Product);
//           });
//           return {data: fashionProducts};
//         } catch (error: any) {
//           console.log(error.message);
//           return {error: error.message};
//         }
//       },
//       providesTags: ['fashionProduct'],
//     }),
//     fetchVehiclesPosts: builder.query<Products, void>({
//       async queryFn() {
//         try {
//           const querySnapshot = await firestore()
//             .collection('Posts')
//             .where('category', '==', 'Vehicles')
//             .get();
//           let vehicleProducts: Products = [];
//           querySnapshot?.forEach((doc: any) => {
//             vehicleProducts.push({
//               img: doc.data().imageurl,
//               title: doc.data().title,
//               category: doc.data().category,
//               desc: doc.data().description,
//               price: doc.data().price,
//               createdOn: doc.data().created.toDate().toDateString(),
//               expiresOn: doc.data().expires.toDate().toDateString(),
//               ...doc.data(),
//             } as Product);
//           });
//           return {data: vehicleProducts};
//         } catch (error: any) {
//           console.log(error.message);
//           return {error: error.message};
//         }
//       },
//       providesTags: ['vehicleProduct'],
//     }),
//   }),
// });

export const categoriesApi = fireStoreApi.injectEndpoints({
  endpoints: builder => ({
    fetchElectronicsPosts: builder.query<Products, void>({
      async queryFn() {
        try {
          const querySnapshot = await firestore()
            .collection('Posts')
            .where('category', '==', 'Electronics')
            .get();
          let electronicProducts: Products = [];
          querySnapshot?.forEach((doc: any) => {
            electronicProducts.push({
              img: doc.data().imageurl,
              title: doc.data().title,
              category: doc.data().category,
              description: doc.data().description,
              price: doc.data().price,
              createdOn: doc.data().created.toDate().toDateString(),
              expiresOn: doc.data().expires.toDate().toDateString(),
              ...doc.data(),
            } as Product);
          });
          return {data: electronicProducts};
        } catch (error: any) {
          console.log(error.message);
          return {error: error.message};
        }
      },
      providesTags: ['electronicProduct'],
    }),
    fetchHouseholdPosts: builder.query<Products, void>({
      async queryFn() {
        try {
          const querySnapshot = await firestore()
            .collection('Posts')
            .where('category', '==', 'Household')
            .get();
          let householdProducts: Products = [];
          querySnapshot?.forEach((doc: any) => {
            householdProducts.push({
              img: doc.data().imageurl,
              title: doc.data().title,
              category: doc.data().category,
              desc: doc.data().description,
              price: doc.data().price,
              createdOn: doc.data().created.toDate().toDateString(),
              expiresOn: doc.data().expires.toDate().toDateString(),
              ...doc.data(),
            } as Product);
          });
          return {data: householdProducts};
        } catch (error: any) {
          console.log(error.message);
          return {error: error.message};
        }
      },
      providesTags: ['houseHoldProduct'],
    }),
    fetchFashionPosts: builder.query<Products, void>({
      async queryFn() {
        try {
          const querySnapshot = await firestore()
            .collection('Posts')
            .where('category', '==', 'Fashion')
            .get();
          let fashionProducts: Products = [];
          querySnapshot?.forEach((doc: any) => {
            fashionProducts.push({
              img: doc.data().imageurl,
              title: doc.data().title,
              category: doc.data().category,
              desc: doc.data().description,
              price: doc.data().price,
              createdOn: doc.data().created.toDate().toDateString(),
              expiresOn: doc.data().expires.toDate().toDateString(),
              ...doc.data(),
            } as Product);
          });
          return {data: fashionProducts};
        } catch (error: any) {
          console.log(error.message);
          return {error: error.message};
        }
      },
      providesTags: ['fashionProduct'],
    }),
    fetchVehiclesPosts: builder.query<Products, void>({
      async queryFn() {
        try {
          const querySnapshot = await firestore()
            .collection('Posts')
            .where('category', '==', 'Vehicles')
            .get();
          let vehicleProducts: Products = [];
          querySnapshot?.forEach((doc: any) => {
            vehicleProducts.push({
              img: doc.data().imageurl,
              title: doc.data().title,
              category: doc.data().category,
              desc: doc.data().description,
              price: doc.data().price,
              createdOn: doc.data().created.toDate().toDateString(),
              expiresOn: doc.data().expires.toDate().toDateString(),
              ...doc.data(),
            } as Product);
          });
          return {data: vehicleProducts};
        } catch (error: any) {
          console.log(error.message);
          return {error: error.message};
        }
      },
      providesTags: ['vehicleProduct'],
    }),
  }),
});

export const {
  useFetchElectronicsPostsQuery,
  useFetchFashionPostsQuery,
  useFetchHouseholdPostsQuery,
  useFetchVehiclesPostsQuery,
} = categoriesApi;
