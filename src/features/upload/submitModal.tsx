import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 14,
    right: 18,
  },
  container: {
    //margin: 20,
    // marginTop: 80,
    height: height * 0.45,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'blue',
  },
  resultGrid: {
    paddingTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SubmitModal = ({closeModal, isVisible, transferPercent}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <AntIcon name="close" size={26} style={styles.closeIcon} />
        </TouchableWithoutFeedback>
        <View style={styles.resultGrid}>
          <Text style={{color: 'black'}}>
            {transferPercent < 100 ? 'Uploading...' : 'Done'}
          </Text>
          {transferPercent < 100 ? (
            <ActivityIndicator size={'large'} color="#8e7cc3" />
          ) : null}
          <Text style={styles.percentageText}>{transferPercent}%</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SubmitModal;
