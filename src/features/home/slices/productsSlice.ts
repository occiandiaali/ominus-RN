import firestore from '@react-native-firebase/firestore';
import {fireStoreApi} from '../../../redux/firestoreApi';
import {Category, Product, Products} from '../../../types';

export const categoriesApi = fireStoreApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getPostsByCategory: builder.query<Products | undefined, unknown, unknown>({
      async queryFn(category: Category) {
        try {
          const querySnapshot = await firestore()
            .collection('Posts')
            .where('category', '==', `${category}`)
            .limit(6)
            .get();
          let categoryProducts: Products = [];
          querySnapshot?.forEach((doc: any) => {
            categoryProducts.push({
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
          return {data: categoryProducts};
        } catch (error: any) {
          console.log(error.message);
          return {error: error.message};
        }
      },
      providesTags: ['electronic', 'household', 'fashion', 'vehicle'],
    }),
  }),
});

export const {useGetPostsByCategoryQuery} = categoriesApi;
