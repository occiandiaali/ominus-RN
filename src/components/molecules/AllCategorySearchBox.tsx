import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const AllCategorySearchBox = ({
  clicked,
  setClicked,
  searchPhrase,
  setSearchPhrase,
}) => {
  return (
    <View style={styles.container}>
      <View style={clicked ? styles.barClicked : styles.bar}>
        <Icon name="search" size={20} color="black" style={{left: 2}} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked ? (
          <Icon
            name="close"
            size={24}
            color="black"
            style={{right: 12}}
            onPress={() => {
              setSearchPhrase('');
              setClicked(false);
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default AllCategorySearchBox;

const styles = StyleSheet.create({
  bar: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 16,
    alignItems: 'center',
  },
  barClicked: {
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 16,
    alignItems: 'center',
  },
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    padding: 6,
    width: '90%',
    height: 38,
  },
});
