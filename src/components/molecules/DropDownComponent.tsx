import {FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#d9d2e9',
    width: '36%',
    borderRadius: 6,
    marginLeft: 42,
    marginTop: '84%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  dropperPresser: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  dropperWrap: {
    width: '45%',
    backgroundColor: '#d9d2e9',
    margin: 6,
    borderRadius: 8,
  },
  dropperWrapText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    paddingBottom: 6,
    right: 4,
    color: '#351c75',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  modalla: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderDropText: {
    position: 'absolute',
    top: 50,
  },
});

const CustomDropDown = ({setChoice}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('Category');

  const categories = ['Electronics', 'Fashion', 'Household', 'Vehicles'];

  const toggleDrop = (): void => {
    visible ? setVisible(false) : setVisible(true);
  };

  const renderItem = ({item}) => (
    <Pressable onPress={() => onItemPress(item)} style={styles.item}>
      <Text>{item}</Text>
    </Pressable>
  );

  const renderDrop = () => (
    <Modal
      style={styles.modalla}
      visible={visible}
      transparent
      animationType="slide">
      <Pressable onPress={() => setVisible(false)}>
        <View style={styles.dropdown}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Pressable>
    </Modal>
  );

  const onItemPress = (item): void => {
    setSelected(item);
    setChoice(item);
    // onSelect(item);
    setVisible(false);
  };

  return (
    <View style={styles.dropperWrap}>
      <Pressable
        ref={DropdownButton.current}
        onPress={toggleDrop}
        style={styles.dropperPresser}>
        <>
          <Text style={styles.dropperWrapText}>{selected}</Text>
          <Icon
            name={visible ? 'caret-up' : 'caret-down'}
            size={18}
            style={{color: '#FFFFFF'}}
          />
          {renderDrop()}
        </>
      </Pressable>
    </View>
  );
};

export default CustomDropDown;
