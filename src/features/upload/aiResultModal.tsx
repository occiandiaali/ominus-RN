import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
//import AiResultComponent from '../../components/molecules/AiResultComponent';
import {useGetBingImagesQuery} from '../../services/bingImagesApi';

const {height} = Dimensions.get('window');

const AiResultModal = ({itemTitle, category, closeModal, isVisible}) => {
  // const [loading, setLoading] = useState(isVisible);
  const [hideLoader, setHideLoader] = useState(false);

  const {data: inputImg, isLoading} = useGetBingImagesQuery(category, {
    refetchOnFocus: true,
  });

  useEffect(() => {
    console.log(`Data: ${JSON.stringify(inputImg)}`);
  }, [inputImg]);
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
          <Text style={styles.header}>AI Result</Text>
          <Text style={styles.leadText}>The average price for</Text>
          <Text style={styles.leadText}>{itemTitle}</Text>
          <View
            style={{
              marginTop: 24,
              width: 320,
              height: 380,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#d9d2e9',
            }}>
            {isLoading ? (
              <ActivityIndicator size={'large'} color="#d9d2e9" />
            ) : (
              // inputImg?.map((img, i) => (
              //   <View
              //     style={{
              //       width: 80,
              //       height: 80,
              //       margin: 4,
              //       flexGrow: 1,
              //       flexDirection: 'row',
              //       flexWrap: 'wrap',
              //     }}>
              //     <Image
              //       style={{
              //         width: '100%',
              //         height: 80,
              //         margin: 4,
              //         flexGrow: 1,
              //         flexDirection: 'row',
              //         flexWrap: 'wrap',
              //       }}
              //       source={{uri: img.image}}
              //       key={i}
              //     />
              //   </View>
              // ))
              <FlatList
                data={inputImg}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                renderItem={({item}) => (
                  <View style={styles.renderItemWrap}>
                    <Image
                      style={styles.imageThumbnail}
                      source={{uri: item.image}}
                    />
                  </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
          <Text>is NGN 000, 000</Text>
        </View>
        {/* <View style={styles.actionBtnsView}>
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
        </View> */}
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
    height: height * 0.85,
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
  header: {
    fontSize: 24,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 150,
    margin: 4,
  },
  leadText: {
    fontSize: 18,
  },
  loadingView: {
    paddingTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderItemWrap: {
    width: 150,
    height: 120,
    flexDirection: 'column',
    margin: 4,
  },
  resultGrid: {
    paddingTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
