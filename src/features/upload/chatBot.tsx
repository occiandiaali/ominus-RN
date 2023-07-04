import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SlangConvaTrigger, {
  SlangRetailAssistant,
} from '@slanglabs/slang-conva-react-native-retail-assistant';
import {useGetBingImagesQuery} from '../../services/bingImagesApi';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

const ChatBot = ({route}) => {
  const {category, itemTitle} = route.params;
  const [term, setTerm] = useState(itemTitle);
  const [text, setText] = useState('');

  const {data: inputImg, isFetching} = useGetBingImagesQuery(category, {
    refetchOnFocus: true,
  });

  useEffect(() => {
    SlangRetailAssistant.initialize({
      requestedLocales: ['en-US', 'en-GB', 'en-NG'],
      assistantId: '',
      apiKey: '',
    });
    SlangRetailAssistant.ui.showTrigger();
    console.log(`Term: ${term}`);
  }, [term]);

  const fireTrigger = () => {
    SlangRetailAssistant.setAction({
      onSearch: async (searchInfo, searchUserJourney) => {
        var searchItem = searchInfo.item.description;
        setTerm(searchItem);
        console.log(`Search: ${searchItem}`);
        console.log(`Set Term: ${term}`);
        searchUserJourney.setSuccess();
      },
    });
  };

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>ChatBot</Text>
          <Text style={styles.resultText}>Showing results for {itemTitle}</Text>
          <View style={styles.searchbarRow}>
            <View style={styles.searchbarView}>
              <TextInput
                style={styles.input}
                value={text}
                placeholder="Search"
                placeholderTextColor={'#FFF'}
                onChangeText={setText}
              />
            </View>
            <TouchableWithoutFeedback onPress={fireTrigger}>
              <SlangConvaTrigger style={styles.triggerStyle} />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.imgsGrid}>
            {isFetching ? (
              <ActivityIndicator size={'large'} color="#d9d2e9" />
            ) : (
              <FlatList
                data={inputImg}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                contentContainerStyle={{marginTop: 24}}
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
            <View style={{marginBottom: '35%'}} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    marginTop: '45%',
  },
  gradientStyles: {
    flex: 1,
    padding: 6,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 180,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  imgsGrid: {
    height: height * 0.85,
  },
  input: {
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d9d2e9',
    borderRadius: 21,
    paddingLeft: 16,
  },
  renderItemWrap: {
    width: 180,
    height: 180,
    flexDirection: 'column',
  },
  resultText: {
    fontSize: 18,
    color: '#FFF',
  },
  screenContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbarRow: {
    width: width * 0.9,
    height: 45,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 16,
  },
  searchbarView: {
    width: width * 0.75,
    marginRight: 12,
  },
  triggerStyle: {
    width: 38,
    height: 38,
  },
});
