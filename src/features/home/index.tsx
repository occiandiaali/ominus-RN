import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
  useGetAllProductsQuery,
  useGetAllLaptopsQuery,
  useGetAllPhonesQuery,
} from '../../redux/slices/apiSlice';

const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

interface CategoryProps {
  img: string;
  title: string;
}

const DATA = [
  {
    id: 1,
    text: 'Box one',
    img: 'https://images.pexels.com/photos/4061420/pexels-photo-4061420.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    text: 'Box two',
    img: 'https://images.pexels.com/photos/6508357/pexels-photo-6508357.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    text: 'Box three',
    img: 'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    text: 'Box four',
    img: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 5,
    text: 'Box five',
    img: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [allLoading, setAllLoading] = useState(false);
  const [categoryAllRoute, setCategoryAllRoute] = useState('');
  const placeholder =
    'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400';
  // const [electronics, setElectronics] = useState<CategoryProps[]>([
  //   {
  //     img: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     title: '',
  //   },
  // ]);
  // const {
  //   data: products = [],
  //   error: allError,
  //   isFetching: allFetching,
  //   isSuccess,
  // } = useGetAllProductsQuery();
  // const {data: all = [], isFetching: allFetching} = useGetAllProductsQuery();
  // const {data: phones = [], isFetching: phonesFetching} =
  //   useGetAllPhonesQuery();
  // const {data: laptops = [], isFetching: laptopsFetching} =
  //   useGetAllLaptopsQuery();
  const [productsData, setProductsData] = useState([
    {
      img: '',
      title: '',
      category: '',
    },
  ]);
  // const [phonesData, setPhonesData] = useState([]);
  // const [laptopsData, setLaptopsData] = useState([]);

  const getAllProducts = useCallback(async () => {
    setAllLoading(true);
    return await firestore()
      .collection('Posts')
      // .where('category', '==', 'Electronics')
      .get()
      .then(querySnapshot => {
        const newData = querySnapshot.docs.map(doc => ({
          img: doc.data().imageurl,
          title: doc.data().title,
          category: doc.data().category,
          ...doc.data(),
        }));
        setProductsData(newData);
        // setAllLoading(false);
        console.log('All products: ', productsData);
      })
      .catch(e => console.log('getAllProducts err: ', e));
  }, [productsData]);

  useEffect(() => {
    try {
      getAllProducts();
      setAllLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [getAllProducts]);

  const renderItem = ({img, title, category}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(`Navigating to ${category} screen..`);
          navigation.navigate('post-details', {
            itemTitle: title,
            itemImg: img,
          });
        }}>
        <ImageBackground
          source={{
            uri: `${img || placeholder}`,
          }}
          style={styles.coverImg}>
          <Text style={styles.textOnCoverImg}>{title}</Text>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <View style={styles.floatingHead}>
        <View style={styles.hiAvatar}>
          <View style={styles.avatarHead}>
            <AntIcon name="user" size={28} />
          </View>

          <View style={styles.greetingText}>
            <Text style={{color: '#fff'}}>Good morning</Text>
            <Text style={{color: '#fff'}}>occian46</Text>
          </View>
        </View>
        <View style={styles.headBell}>
          <AntIcon name="bells" size={21} color="#fff" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroller}>
        <View style={styles.ctaView}>
          <View style={styles.leftAlign}>
            <Text style={styles.ctaTextH1}>Enjoy All Features!</Text>
            <Text style={styles.ctaTextH2}>
              Lorem ipsum for samples et hoc sunt orca fides et ratio,
              pontificat donc erb um dolor sunt vivificantem raquo per quem.
            </Text>
            <View style={styles.goPremium}>
              <Text style={styles.goPremiumText}>Go Premium</Text>
            </View>
          </View>
        </View>
        <View style={[styles.promotedRowLabelView, {marginTop: 38}]}>
          <Text style={styles.promotedLabelText}>Promoted</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(`${categoryAllRoute} item..`);
              navigation.navigate('category-items-list', {
                category: 'promoted',
              });
            }}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={productsData}
          renderItem={({item}) => (
            <View style={styles.promotedBox}>
              {!allLoading ? (
                renderItem(item)
              ) : (
                <ActivityIndicator
                  size={'large'}
                  style={{alignSelf: 'center'}}
                />
              )}
            </View>
          )}
          keyExtractor={item => item.title}
        />
        <View style={styles.promotedRowLabelView}>
          <Text style={styles.promotedLabelText}>Electronics</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(`${categoryAllRoute} item..`);
              navigation.navigate('category-items-list', {
                category: 'electronics',
              });
            }}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <View style={styles.promotedBox}>
              <ImageBackground
                source={{uri: `${item.img}`}}
                style={styles.coverImg}>
                <Text style={styles.textOnCoverImg}>{item.text}</Text>
              </ImageBackground>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.promotedRowLabelView}>
          <Text style={styles.promotedLabelText}>Fashion</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(`${categoryAllRoute} item..`);
              navigation.navigate('category-items-list', {
                category: 'fashion',
              });
            }}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={productsData}
          renderItem={({item}) => (
            <View style={styles.promotedBox}>
              {loading ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size={'large'} color="#d9d2e9" />
                </View>
              ) : (
                renderItem(item)
              )}
            </View>
          )}
          keyExtractor={item => item.title}
        />
        <View style={styles.promotedRowLabelView}>
          <Text style={styles.promotedLabelText}>Vehicles</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(`${categoryAllRoute} item..`);
              navigation.navigate('category-items-list', {
                category: 'vehicles',
              });
            }}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <View style={styles.promotedBox}>
              <ImageBackground
                source={{uri: `${item.img}`}}
                style={styles.coverImg}>
                <Text style={styles.textOnCoverImg}>{item.text}</Text>
              </ImageBackground>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.bottomSpaceView} />
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  avatarHead: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbd6d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  bottomSpaceView: {
    marginBottom: 84,
  },
  coverImg: {
    width: 140,
    height: 120,
    borderRadius: 24,
  },
  ctaTextH1: {
    fontSize: 24,
    color: '#351c75',
    fontWeight: 'bold',
    paddingTop: 8,
  },
  ctaTextH2: {
    fontSize: 14,
    color: '#351c75',
    fontWeight: '500',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 12,
  },
  ctaView: {
    width: windowWidth - 20,
    height: 180,
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
  floatingHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goPremium: {
    width: 120,
    height: 40,
    borderRadius: 24,
    backgroundColor: '#351c75',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    paddingBottom: 6,
  },
  goPremiumText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '800',
  },
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  greetingText: {
    flexDirection: 'column',
    top: 6,
  },
  headBell: {
    padding: 12,
    top: 16,
  },
  hiAvatar: {
    flexDirection: 'row',
    padding: 16,
  },
  leftAlign: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  promotedBox: {
    width: 140,
    height: 120,
    borderRadius: 24,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  promotedLabelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  promotedRowLabelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  scroller: {
    paddingBottom: 24,
  },

  seeAllText: {
    fontSize: 14,
    color: '#351c75',
  },
  textOnCoverImg: {
    alignSelf: 'center',
    paddingTop: 40,
    color: '#fff',
  },
});
