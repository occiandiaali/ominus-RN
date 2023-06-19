import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AllCategorySearchBox from '../../components/molecules/AllCategorySearchBox';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useGetPostsByCategoryQuery} from './slices/productsSlice';
import CategoryListTile from '../../components/molecules/CategoryListTile';
import {ActivityIndicator} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const CategoryItemsList = ({route}) => {
  const {categoryName, productCount} = route.params;
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const placeholder =
    'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400';

  const {
    data: results = [],
    isLoading,
    refetch,
  } = useGetPostsByCategoryQuery(categoryName);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchbarView}>
          <AllCategorySearchBox
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
        <Text style={styles.showingCategoryInfoText}>
          Showing ({JSON.stringify(productCount)}) {categoryName} results..
        </Text>
        <View style={styles.flatlistView}>
          <FlatList
            data={results}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              isLoading ? (
                <ActivityIndicator size={'large'} color="#fff" />
              ) : (
                <CategoryListTile
                  itemImage={item.img || placeholder}
                  itemTitle={item.title}
                  itemPrice={item.price}
                  itemDate={item.expiresOn}
                />
              )
            }
            keyExtractor={item => item.title}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CategoryItemsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  flatlistView: {
    marginTop: 40,
    width: windowWidth,
    height: 500,
  },
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  productTile: {
    width: windowWidth,
    height: 120,
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 6,
  },
  searchbarView: {
    top: 38,
    marginBottom: 24,
  },
  showingCategoryInfoText: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontSize: 14,
    top: 28,
  },
  tileImage: {
    height: 120,
    width: 250,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
