import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {
  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <View style={styles.heading}>
        <View style={styles.avatarBg}>
          <AntIcon name="user" size={80} />
        </View>
        <View>
          <Text style={{color: '#fff'}}>User Name</Text>
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
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%',
  },
});
