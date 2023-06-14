import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {
  const today = new Date();
  const n = today.toDateString();
  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <View style={styles.avatarBg}>
            <AntIcon name="user" size={80} />
          </View>
          <View>
            <Text
              style={{
                fontSize: 24,
                color: '#fff',
                paddingTop: 12,
                fontWeight: 'bold',
              }}>
              User Name
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={{fontSize: 18, paddingTop: 12, fontWeight: 'bold'}}>
            Status
          </Text>
          <Text style={{bottom: -12, fontSize: 16}}>Available</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            -------------------------------
          </Text>

          <Text style={{fontSize: 18, paddingTop: 12, fontWeight: 'bold'}}>
            Twitter
          </Text>
          <Text style={{bottom: -12, fontSize: 16}}>twitter.com/username</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            -------------------------------
          </Text>

          <Text style={{fontSize: 18, paddingTop: 12, fontWeight: 'bold'}}>
            Timezone
          </Text>
          <Text style={{bottom: -12, fontSize: 16}}>{n}</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            -------------------------------
          </Text>
        </View>
      </View>
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
});
