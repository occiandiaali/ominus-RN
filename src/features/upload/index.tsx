import {
  Alert,
  Dimensions,
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
import SelectDropdown from 'react-native-select-dropdown';
import CTAButton from '../../components/CTAButton';
import {reqCameraPermission, reqExtWritePermission} from './accessPermissions';

const windowWidth = Dimensions.get('window').width;
const categories = ['electronics', 'household', 'fashion', 'vehicles'];

// type ImagePickerResponse = {
//   uri?: string;
//   fileName?: string;
// };

const Upload = () => {
  const [itemTitle, onChangeItemTitle] = useState('');
  const [itemDescription, onChangeItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isPromoted, setIsPromoted] = useState(isSwitchEnabled);
  const [imagePath, setImagePath] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const toggleSwitch = () => setIsSwitchEnabled(prev => !prev);
  const continueEnabled = itemTitle.length > 5;

  const showToastAndroid = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  const takeAPhoto = async (type: MediaType) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
    } as CameraOptions;
    // await reqCameraPermission();
    // await reqExtWritePermission();
    launchCamera(options, response => {
      if (response.didCancel) {
        // Alert.alert('Camera use cancelled');
        showToastAndroid('Camera use cancelled');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        // Alert.alert('Warning', 'Camera is unavailable...');
        showToastAndroid('Camera is unavailable...');
        return;
      } else if (response.errorCode === 'permission') {
        // Alert.alert('Warning', 'Permission not satisfied...');
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
        // Alert.alert('Image selection cancelled');
        showToastAndroid('Image selection cancelled');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        // Alert.alert('Camera unavailable...');
        showToastAndroid('Camera unavailable...');
        return;
      } else if (response.errorCode === 'permission') {
        // Alert.alert('Permission is required for this action...');
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
            <AntIcon name="camerao" size={64} color={'#fff'} />
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
            <SelectDropdown
              data={categories}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              rowTextForSelection={(item, _) => {
                return item;
              }}
            />
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
              style={styles.titleInput}
              maxLength={100}
              onChangeText={onChangeItemTitle}
              value={itemTitle}
            />
            <TextInput
              placeholder="Enter item description..."
              placeholderTextColor={'#351c75'}
              textAlignVertical="top"
              style={styles.descInput}
              multiline={true}
              numberOfLines={3}
              onChangeText={onChangeItemDescription}
              value={itemDescription}
            />
          </View>
          <View style={styles.ctaBtnView}>
            <CTAButton
              enabled={continueEnabled}
              btnText={'Continue'}
              onPress={() => console.log('Pressed CTA...')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Upload;

const styles = StyleSheet.create({
  categorySelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },
  ctaBtnView: {
    marginBottom: 12,
    alignSelf: 'flex-end',
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
  inputsContainer: {
    margin: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    padding: 6,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    margin: 8,
  },
});
