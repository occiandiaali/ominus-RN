import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AllCategorySearchBox from './molecules/AllCategorySearchBox';

const SeeAllList = ({route, navigation}) => {
  const {category} = route.params;
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  //const [mockData, setMockData] = useState([]);

  //   useEffect(() => {
  //     const getData = async () => {
  //       const apiResponse = await fetch(
  //         'https://fakestoreapi.com/products?limit=5',
  //       );
  //       const data = await apiResponse.json();
  //       setMockData(data);
  //     };
  //     getData();
  //   }, []);

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
        <Text style={{color: '#fff', fontSize: 24}}>
          All {JSON.stringify(category)} List
        </Text>
        {/* {mockData.map(item => (
          <ScrollView contentContainerStyle={styles.mockList}>
            <View key={item.id}>
              <Text>{item?.title}</Text>
              <Text>{item?.price}</Text>
            </View>
          </ScrollView>
        ))} */}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SeeAllList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  mockList: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbarView: {
    position: 'absolute',
    top: 48,
  },
});
