import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import CTAButton from '../../components/CTAButton';
//import {reqCameraPermission, reqExtWritePermission} from './accessPermissions';
import AiResultModal from './aiResultModal';
import CustomDropDown from '../../components/molecules/DropDownComponent';
import DatePicker from 'react-native-date-picker';

const windowWidth = Dimensions.get('window').width;

const Upload = () => {
  const [itemTitle, onChangeItemTitle] = useState('');
  const [itemDescription, onChangeItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, onChangeItemPrice] = useState('');
  const [usingRecommendedPrice, setUsingRecommendedPrice] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [isPromoted, setIsPromoted] = useState(isSwitchEnabled);
  const [imagePath, setImagePath] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [ctaLabel, setCTALabel] = useState('Continue');

  const toggleSwitch = () => setIsSwitchEnabled(prev => !prev);
  const continueEnabled = itemTitle.length > 5 && imagePath !== '';

  const priceAccepted = () => {
    setUsingRecommendedPrice(true);
    setCTALabel('Publish');
    setShowModal(false);
  };

  const onPublish = () => {
    if (itemCategory.length === 0 || itemCategory === '') {
      Alert.alert('Warning', 'Make sure you select an accurate Category!');
      setCTALabel('Publish');
      setUsingRecommendedPrice(true);
      return;
    } else {
      setImagePath('');
      onChangeItemTitle('');
      onChangeItemDescription('');
      setItemCategory('');
      Alert.alert('Notice', 'Published new entry');
    }
  };

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
        showToastAndroid(`Photo filename: ${m.fileName}`);
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
              <AntIcon name="camerao" size={64} color={'#fff'} />
            )}
          </View>
          <View style={styles.imageBoxBtnRow}>
            <TouchableWithoutFeedback onPress={() => openImageGallery('photo')}>
              <View style={styles.imageBoxBtn}>
                <AntIcon name="picture" size={21} color="#fff" />
                <Text style={styles.imageBoxBtnText}>Gallery</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => takeAPhoto('photo')}>
              <View style={styles.imageBoxBtn}>
                <AntIcon name="camerao" size={21} color="#fff" />
                <Text style={styles.imageBoxBtnText}>Camera</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.categorySelectRow}>
            <CustomDropDown setChoice={setItemCategory} />
            <View style={{paddingVertical: 6, justifyContent: 'center'}}>
              <Text style={{color: '#fff', bottom: 8}}>Promoted?</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isSwitchEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isSwitchEnabled}
              />
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="Enter item title..."
              placeholderTextColor={'#351c75'}
              textAlign="center"
              style={styles.titleInput}
              maxLength={100}
              onChangeText={onChangeItemTitle}
              value={itemTitle}
            />
            <TextInput
              placeholder="Briefly describe the item..."
              placeholderTextColor={'#351c75'}
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
                placeholder="Enter item price..."
                placeholderTextColor={'#351c75'}
                style={styles.priceInput}
                keyboardType={'number-pad'}
                onChangeText={onChangeItemPrice}
                value={itemPrice}
              />
            </View>
            <View style={styles.calendar}>
              <TouchableWithoutFeedback onPress={() => setOpenDate(true)}>
                <AntIcon name="calendar" size={24} color="#351c75" />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.ctaBtnView}>
              <CTAButton
                enabled={continueEnabled}
                btnText={ctaLabel}
                onPress={() => {
                  console.log('Pressed CTA...');
                  if (usingRecommendedPrice === false && continueEnabled) {
                    setShowModal(true);
                  } else {
                    setShowModal(false);
                    setUsingRecommendedPrice(false);
                    setCTALabel('Continue');
                    onPublish();
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
        <AiResultModal
          isVisible={showModal}
          acceptPrice={priceAccepted}
          closeModal={() => setShowModal(false)}
        />
        <DatePicker
          modal
          mode={'datetime'}
          open={openDate}
          date={deadline}
          onConfirm={() => null}
          onCancel={() => setOpenDate(false)}
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Upload;

const styles = StyleSheet.create({
  calendar: {
    top: 8,
    right: 8,
  },
  categorySelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    // borderWidth: 1,
    // borderColor: '#fff',
    // borderRadius: 12,
    padding: 14,
  },
  ctaBtnView: {
    alignSelf: 'flex-end',
  },
  deleteImageIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 136,
    right: 8,
  },
  priceInputView: {
    padding: 8,
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
    // borderWidth: 1,
    // borderColor: '#fff',
    // borderRadius: 12,
    padding: 6,
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    bottom: 6,
    right: 8,
    padding: 4,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    margin: 8,
  },
});
