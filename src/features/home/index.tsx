import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

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
        <View style={styles.promotedRowLabelView}>
          <Text style={styles.promotedLabelText}>Promoted</Text>
          <Text style={styles.seeAllText}>See all</Text>
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
          <Text style={styles.promotedLabelText}>Electronics</Text>
          <Text style={styles.seeAllText}>See all</Text>
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
          <Text style={styles.seeAllText}>See all</Text>
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
          <Text style={styles.promotedLabelText}>Vehicles</Text>
          <Text style={styles.seeAllText}>See all</Text>
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
