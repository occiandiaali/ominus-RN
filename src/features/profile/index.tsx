import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import ProfileAvatarComponent from '../../components/organisms/ProfileAvatar';

const windowWidth = Dimensions.get('window').width;

const Profile = () => {
  const [avatarSet, setAvatarSet] = useState(false);
  // const today = new Date();
  // const n = today.toDateString();
  const placeholder =
    'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400';
  const [dataSource, setDataSource] = useState([
    {
      id: 0,
      src: placeholder,
    },
  ]);

  useEffect(() => {
    let items = Array.apply(null, Array(24)).map((v, i) => {
      return {
        id: i,
        src: 'https://unsplash.it/400/400?image=' + (i + 1),
      };
    });
    setDataSource(items);
  }, []);

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileHeading}>
          <ProfileAvatarComponent
            avatarContainerStyle={styles.avatarBg}
            userImage={null}
            userImageStyle={styles.avatarBg}
            isImageSet={avatarSet}
          />
          <Text style={styles.username}>User Name</Text>
        </View>
        <View style={styles.userStats}>
          <View style={styles.statCol1}>
            <Text style={styles.statColValueText}>875</Text>
            <Text>Earned</Text>
          </View>
          <View style={styles.statCol2}>
            <Text style={styles.statColValueText}>156</Text>
            <Text>Views</Text>
          </View>
          <View style={styles.statCol3}>
            <Text style={styles.statColValueText}>12</Text>
            <Text>Published</Text>
          </View>
        </View>
        <Pressable onPress={null}>
          <View style={styles.editProfileView}>
            <Text style={styles.editProfileText}>Edit profile</Text>
          </View>
        </Pressable>
        <View style={styles.gallery}>
          <FlatList
            data={dataSource}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            renderItem={({item}) => (
              <View style={styles.renderItemWrap}>
                <Image style={styles.imageThumbnail} source={{uri: item.src}} />
              </View>
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.galleryBottom} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatarBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbd6d6',
  },
  body: {
    marginTop: '15%',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 64,
  },
  editProfileText: {
    color: '#FFF', //'#8e7cc3',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  editProfileView: {
    top: 280,
    width: 160,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 320,
  },
  galleryBottom: {
    paddingBottom: '86%',
  },
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '5%',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  profileHeading: {
    position: 'absolute',
    top: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderItemWrap: {
    width: windowWidth * 0.65,
    height: 150,
    flexDirection: 'column',
    margin: 1,
  },
  statCol: {
    padding: 6,
  },
  statCol1: {
    justifyContent: 'center',
    alignItems: 'center',
    right: '75%',
  },
  statCol2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCol3: {
    justifyContent: 'center',
    alignItems: 'center',
    left: '75%',
  },
  statColValueText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    alignSelf: 'center',
    marginTop: 8,
  },
  userStats: {
    flexDirection: 'row',
    top: 250,
    // bottom: 70,
    padding: 4,
  },
});
