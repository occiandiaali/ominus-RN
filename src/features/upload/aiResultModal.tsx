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
import AiResultComponent from '../../components/molecules/AiResultComponent';

const {height} = Dimensions.get('window');

const AiResultModal = ({acceptPrice, closeModal, isVisible}) => {
  // const [loading, setLoading] = useState(isVisible);
  const [hideLoader, setHideLoader] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setHideLoader(true);
  //   }, 4000);
  // }, []);
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <AntIcon name="close" size={26} style={styles.closeIcon} />
        </TouchableWithoutFeedback>
        <View style={styles.resultGrid}>
          {/* {hideLoader === false ? (
            <View style={styles.loadingView}>
              <Text>Perambulating the reticular spline...</Text>
              <ActivityIndicator size={'large'} color="blue" />
            </View>
          ) : (
            <AiResultComponent searchTerm={query} />
          )} */}
          <Text>AiResultComponent</Text>
          <Text>The recommended price for this item: </Text>
          <Text>NGN 28, 000</Text>
        </View>
        <View style={styles.actionBtnsView}>
          <View style={styles.acceptPriceView}>
            <TouchableWithoutFeedback onPress={acceptPrice}>
              <Text style={styles.acceptPriceText}>Accept price</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.acceptPriceView}>
            <TouchableWithoutFeedback onPress={acceptPrice}>
              <Text style={styles.acceptPriceText}>Reject price</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AiResultModal;

const styles = StyleSheet.create({
  acceptPriceText: {
    color: '#fff',
    fontWeight: '600',
  },
  acceptPriceView: {
    width: 120,
    height: 40,
    borderRadius: 24,
    marginTop: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#351c75',
  },
  actionBtnsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 150,
    height: 150,
    position: 'absolute',
  },
  closeIcon: {
    position: 'absolute',
    top: 14,
    right: 18,
  },
  container: {
    margin: 20,
    height: height * 0.75,
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
  loadingView: {
    paddingTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultGrid: {
    paddingTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
