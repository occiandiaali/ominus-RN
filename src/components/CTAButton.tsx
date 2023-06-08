import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';

const CTAButton = ({btnText, enabled, onPress}) => {
  return (
    <View
      style={[
        styles.btnContainer,
        {backgroundColor: enabled ? '#351c75' : '#d9d2e9'},
      ]}>
      <TouchableWithoutFeedback onPress={onPress} disabled={!enabled}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CTAButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: 150,
    height: 40,
    borderRadius: 24,
    // backgroundColor: '#351c75',
    // color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    paddingBottom: 6,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '800',
  },
});
