import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import currencyFormat from '../../functions/currencyFormat';

const windowWidth = Dimensions.get('window').width;

const CategoryListTile = ({itemImage, itemTitle, itemPrice, itemDate}) => {
  return (
    <View style={styles.tileView}>
      <View style={styles.itemImageView}>
        {!itemImage ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Image source={{uri: itemImage}} style={styles.imageSize} />
        )}
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{itemTitle}</Text>
        <Text style={styles.price}>
          {currencyFormat(itemPrice, 'NGN', 'en-NG')}
        </Text>
        <Text style={styles.date}>Expires: {itemDate}</Text>
      </View>
    </View>
  );
};

export default CategoryListTile;

const styles = StyleSheet.create({
  date: {},
  imageSize: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemInfo: {
    paddingLeft: 24,
    alignSelf: 'center',
  },
  itemImageView: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#8e7cc3',
  },
  price: {
    fontSize: 16,
    color: '#8e7cc3',
  },
  tileView: {
    width: windowWidth,
    height: 120,
    backgroundColor: '#d9d2e9',
    paddingTop: 8,
    paddingRight: 6,
    paddingLeft: 8,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    color: '#351c75',
  },
});
