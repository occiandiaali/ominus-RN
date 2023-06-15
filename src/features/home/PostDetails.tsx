import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const PostDetails = ({route}) => {
  const {itemTitle, itemImg} = route.params;

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: itemImg,
          }}
        />
        <View style={{marginTop: 150}}>
          <Text>PostDetails</Text>
          <Text>{JSON.stringify(itemTitle)}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  image: {
    width: 350,
    height: 280,
    borderRadius: 24,
    position: 'absolute',
    top: 64,
  },
});
