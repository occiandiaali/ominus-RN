import {
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  //Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import CTAButton from '../../components/CTAButton';
//import {reqCameraPermission, reqExtWritePermission} from './accessPermissions';
//import AiResultModal from './aiResultModal';
import CustomDropDown from '../../components/molecules/DropDownComponent';
import DatePicker from 'react-native-date-picker';
import SubmitModal from './submitModal';
import AiResultModal from './aiResultModal';

const windowWidth = Dimensions.get('window').width;

const Upload = () => {
  const [itemTitle, onChangeItemTitle] = useState('');
  const [itemDescription, onChangeItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, onChangeItemPrice] = useState('');
  //const [usingRecommendedPrice, setUsingRecommendedPrice] = useState(false);
  //const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [deadlineSet, setDeadlineSet] = useState(false);
  //const [isPromoted, setIsPromoted] = useState(isSwitchEnabled);
  const [imagePath, setImagePath] = useState('');
  const [animValue, setAnimValue] = useState(2);
  const [scaleAnim] = useState(new Animated.Value(animValue));

  const [showBotModal, setShowBotModal] = useState(false);
  //const [ctaLabel, setCTALabel] = useState('Continue');
  const [submissionInProgress, setSubmissionInProgress] = useState(false);

  const [imageBytesTransferred, setImageBytesTransferred] = useState(0);

  //  const toggleSwitch = () => setIsSwitchEnabled(prev => !prev);
  const publishEnabled =
    itemTitle !== '' &&
    imagePath !== '' &&
    itemCategory !== '' &&
    itemPrice !== '' &&
    deadlineSet;

  const scaleIconAnim = () => {
    animValue === 1 ? setAnimValue(2) : setAnimValue(1);
    Animated.spring(scaleAnim, {
      toValue: animValue,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // const priceAccepted = () => {
  //   setUsingRecommendedPrice(true);
  //   setCTALabel('Publish');
  //   setShowModal(false);
  // };

  const showToastAndroid = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  const takeAPhoto = async (type: MediaType) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    } as CameraOptions;
    launchCamera(options, response => {
      if (response.didCancel) {
        showToastAndroid('Camera use cancelled');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        showToastAndroid('Camera is unavailable...');
        return;
      } else if (response.errorCode === 'permission') {
        showToastAndroid('Permission is required for this action...');
        return;
      } else if (response.errorCode === 'others') {
        console.error('err', response.errorMessage || '');
        return;
      }
      response.assets?.map(m => {
        console.log(`Photo fileName: ${m.fileName}`);
        setImagePath(m.uri || '');
      });
    });
  };

  const openImageGallery = (type: MediaType) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    } as ImageLibraryOptions;
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showToastAndroid('Image selection cancelled');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        showToastAndroid('Camera unavailable...');
        return;
      } else if (response.errorCode === 'permission') {
        showToastAndroid('Permission is required for this action...');
        return;
      } else if (response.errorCode === 'others') {
        Alert.alert(response.errorMessage || '');
        return;
      }
      response.assets?.map(m => {
        console.log(`Gallery img path: ${m.uri}`);
        setImagePath(m.uri || '');
      });
    });
  };

  const uploadPhoto = async () => {
    const fileName = imagePath.substring(imagePath.lastIndexOf('-') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;

    setImageBytesTransferred(0);

    const storageRef = storage().ref(
      `photos/${itemCategory.toLowerCase()}/${fileName}`,
    );
    const attempt = storageRef.putFile(uploadUri);
    attempt.on('state_changed', attemptSnapshot => {
      setImageBytesTransferred(
        Math.round(
          attemptSnapshot.bytesTransferred / attemptSnapshot.totalBytes,
        ) * 100,
      );
    });

    try {
      await attempt;
      const url = await storageRef.getDownloadURL();
      Platform.OS === 'android'
        ? showToastAndroid('Uploaded item image to bucket!')
        : Alert.alert('Notice', 'Image uploaded to bucket');

      return url;
    } catch (error) {
      console.log('Attempt err====================================');
      console.log(error);
      console.log('====================================');
      return null;
    }
  };

  const submitPost = async () => {
    if (itemTitle && itemCategory && itemPrice) {
      setSubmissionInProgress(true);
      const imgUrl = await uploadPhoto();
      firestore()
        .collection('Posts')
        .add({
          category: itemCategory,
          title: itemTitle,
          price: itemPrice,
          description: itemDescription,
          imageurl: imgUrl,
          created: firestore.Timestamp.fromDate(new Date()),
          expires: deadline,
        })
        .then(() => {
          setImagePath('');
          setItemCategory('');
          setDeadline(new Date());
          setDeadlineSet(false);
          onChangeItemDescription('');
          onChangeItemPrice('');
          onChangeItemTitle('');
          setSubmissionInProgress(false);
          showToastAndroid('Post submitted!');
        })
        .catch(e => console.log('Submit err: ', e));
    } else {
      showToastAndroid('All fields are required!');
    }
  };

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageBox}>
            {imagePath !== '' ? (
              <>
                <Image source={{uri: imagePath}} style={styles.imagePathImg} />

                <TouchableWithoutFeedback onPress={() => takeAPhoto('photo')}>
                  <AntIcon
                    name="camerao"
                    size={28}
                    color={'#fff'}
                    style={styles.launchCameraIcon}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setImagePath('')}>
                  <AntIcon
                    name="delete"
                    size={28}
                    color={'#f00'}
                    style={styles.deleteImageIcon}
                  />
                </TouchableWithoutFeedback>
              </>
            ) : (
              <TouchableWithoutFeedback onPress={() => takeAPhoto('photo')}>
                <AntIcon name="camerao" size={64} color={'#fff'} />
              </TouchableWithoutFeedback>
            )}
          </View>
          <View style={styles.imageBoxBtnRow}>
            <TouchableWithoutFeedback onPress={() => openImageGallery('photo')}>
              <View style={styles.imageBoxBtn}>
                <AntIcon name="picture" size={21} color="#fff" />
                <Text style={styles.imageBoxBtnText}>Gallery</Text>
              </View>
            </TouchableWithoutFeedback>

            {publishEnabled ? (
              <TouchableWithoutFeedback onPress={() => setShowBotModal(true)}>
                <View style={styles.checkbotview}>
                  <Text style={{fontSize: 14, color: '#FFF', marginBottom: 4}}>
                    Check Bot
                  </Text>
                  <FontAwesome5Icon name="robot" size={24} color={'#FF0'} />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
          <View style={styles.categorySelectRow}>
            <CustomDropDown setChoice={setItemCategory} />
            <View style={{paddingVertical: 6, justifyContent: 'center'}}>
              {/* <Text style={{color: '#fff', bottom: 8}}>Promoted?</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isSwitchEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isSwitchEnabled}
              /> */}
              <Text style={{color: '#fff', fontSize: 18, bottom: 8}}>
                {!deadlineSet ? 'Publish until' : deadline.toDateString()}
              </Text>
              <View style={styles.calendarRowView}>
                <Animated.View
                  style={{
                    transform: [{scale: scaleAnim}],
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      scaleIconAnim();
                      setOpenDate(true);
                    }}>
                    <AntIcon
                      name="calendar"
                      size={24}
                      color="#FFF"
                      style={{paddingRight: 4, bottom: 6}}
                    />
                  </TouchableWithoutFeedback>
                </Animated.View>

                {deadlineSet && (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setDeadlineSet(false);
                    }}>
                    <AntIcon
                      name="close"
                      size={24}
                      color="#FFF"
                      style={{paddingLeft: 12, bottom: 4}}
                    />
                  </TouchableWithoutFeedback>
                )}
              </View>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="Enter item title..."
              placeholderTextColor={'#985779'}
              textAlign="center"
              style={styles.titleInput}
              maxLength={25}
              onChangeText={onChangeItemTitle}
              value={itemTitle}
            />
            <TextInput
              placeholder="Briefly describe the item..."
              placeholderTextColor={'#985779'}
              textAlignVertical="top"
              textAlign="center"
              style={styles.descInput}
              multiline={true}
              numberOfLines={3}
              maxLength={150}
              onChangeText={onChangeItemDescription}
              value={itemDescription}
            />
          </View>
          <View style={styles.lastRow}>
            <View style={styles.priceInputView}>
              <TextInput
                placeholder="Asking price..."
                placeholderTextColor={'#985779'}
                style={styles.priceInput}
                keyboardType={'number-pad'}
                onChangeText={onChangeItemPrice}
                value={itemPrice}
              />
            </View>

            <View style={styles.ctaBtnView}>
              <CTAButton
                enabled={publishEnabled}
                btnText={'Publish'}
                // onPress={() => {
                //   console.log('Pressed CTA...');
                //   if (usingRecommendedPrice === false && continueEnabled) {
                //     setShowModal(true);
                //   } else {
                //     setShowModal(false);
                //     setUsingRecommendedPrice(false);
                //     setCTALabel('Continue');

                //     submitPost();
                //   }
                // }}
                onPress={() => submitPost()}
              />
            </View>
          </View>
        </ScrollView>
        <AiResultModal
          isVisible={showBotModal}
          itemTitle={itemTitle}
          closeModal={() => setShowBotModal(false)}
        />
        <SubmitModal
          transferPercent={imageBytesTransferred}
          isVisible={submissionInProgress}
          closeModal={() => setSubmissionInProgress(false)}
        />
        <DatePicker
          modal
          mode={'datetime'}
          open={openDate}
          date={deadline}
          onConfirm={date => {
            setOpenDate(false);
            setDeadline(date);
            setDeadlineSet(true);
            scaleIconAnim();
          }}
          onCancel={() => {
            scaleIconAnim();
            setOpenDate(false);
          }}
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Upload;

const styles = StyleSheet.create({
  calendar: {
    right: 8,
  },
  calendarRowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categorySelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,

    padding: 14,
  },
  checkbotview: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 24,
  },
  ctaBtnView: {
    alignSelf: 'flex-end',
    bottom: 10,
  },
  deleteImageIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 136,
    right: 8,
  },

  descInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    margin: 8,
  },
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  imageBox: {
    width: windowWidth - 20,
    height: 180,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBoxBtn: {
    width: 120,
    height: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#351c75',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 6,
  },
  imageBoxBtnRow: {
    marginTop: 8,
    marginBottom: 4,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBoxBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePathImg: {
    width: windowWidth - 20,
    height: 180,
  },
  inputsContainer: {
    margin: 12,
    padding: 6,
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  launchCameraIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 8,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    bottom: 6,
    right: 8,
    padding: 4,
  },
  priceInputView: {
    padding: 8,
    bottom: 12,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    margin: 8,
    bottom: 12,
  },
});
