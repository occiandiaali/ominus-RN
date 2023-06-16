import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from 'react-native-vector-icons/AntDesign';

const PostDetails = ({route}) => {
  const {itemTitle, itemImg, itemDesc, published, expires} = route.params;

  return (
    <LinearGradient
      colors={['#351c75', '#8e7cc3', '#d9d2e9']}
      style={styles.gradientStyles}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: itemImg,
          }}
        />
        <View style={styles.firstRowView}>
          <View style={styles.titlePriceExpires}>
            <Text style={styles.title}>{itemTitle}</Text>
            <Text style={styles.created}>Published: {published}</Text>
            <Text style={styles.expires}>Expires: {expires}</Text>
          </View>
          <View style={styles.sellerInfoView}>
            <AntIcon name="user" size={48} color="#FFF" />
            <Text style={styles.sellerName}>Seller Name</Text>
          </View>
        </View>

        <View style={styles.descView}>
          {/* <Text style={styles.descText}>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available
          </Text> */}
          <Text style={styles.descText}>{itemDesc}</Text>
        </View>

        <View style={styles.ctaRow}>
          <View style={styles.mailSellerView}>
            <AntIcon name="mail" size={32} />
            <Text>Mail Seller</Text>
          </View>

          <View style={styles.callSellerView}>
            <AntIcon name="phone" size={32} />
            <Text>Call Seller</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  callSellerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 48,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  created: {
    fontSize: 16,
    color: '#FFF',
  },
  ctaRow: {
    position: 'absolute',
    bottom: 24,
    flexDirection: 'row',
  },
  descText: {
    fontSize: 16,
    color: '#FFF',
  },
  descView: {
    top: 130,
    padding: 6,
  },
  expires: {
    fontSize: 14,
    color: '#FFF',
  },
  firstRowView: {
    top: 48,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  gradientStyles: {
    flex: 1,
    padding: 8,
  },
  image: {
    width: 350,
    height: 280,
    borderRadius: 24,
    position: 'absolute',
    top: 64,
  },
  mailSellerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 28,
  },
  sellerInfoView: {
    top: 50,
    left: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerName: {
    fontSize: 16,
    color: '#FFF',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  titlePriceExpires: {
    top: 50,
    padding: 8,
    right: 28,
    // alignSelf: 'flex-start',
  },
});
