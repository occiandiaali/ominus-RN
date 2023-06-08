import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import CTAButton from '../../components/CTAButton';

const windowWidth = Dimensions.get('window').width;
const categories = ['electronics', 'household', 'fashion', 'vehicles'];

const Upload = () => {
  const [itemTitle, onChangeItemTitle] = useState('');
  const [itemDescription, onChangeItemDescription] = useState('');
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const toggleSwitch = () => setIsSwitchEnabled(prev => !prev);
  const continueEnabled = itemTitle.length > 5;

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.imageBox}>
          <AntIcon name="camerao" size={64} color={'#fff'} />
        </View>
        <View style={styles.imageBoxBtnRow}>
          <View style={styles.imageBoxBtn}>
            <AntIcon name="picture" size={21} color="#fff" />
            <Text style={styles.imageBoxBtnText}>Gallery</Text>
          </View>
          <View style={styles.imageBoxBtn}>
            <AntIcon name="camerao" size={21} color="#fff" />
            <Text style={styles.imageBoxBtnText}>Camera</Text>
          </View>
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
