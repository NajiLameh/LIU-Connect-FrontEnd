import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../../assets/Styles/ViewPostStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { SharingCenterImages } from '../../../dummy data/SharingCenter/SharingCenterImages';

import { GetUserInfoFromDataBase } from '../../BackEnd/UsersQueries/GetUserInfoFromDataBase';

import call from 'react-native-phone-call';
import CustomPriceText from '../../components/ui/CustomPriceText';
import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import MessageModal from '../../components/MessageModal';

export default function ViewPost({ route }) {
  const { product, themeColor } = route.params;
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [publisherInfo, setPublisherInfo] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getPublisherInfoHandler();
    }, [])
  );

  const getPublisherInfoHandler = async () => {
    try {
      setLoading(true);
      const response = await GetUserInfoFromDataBase(product.publisherEmail);
      console.log(response);
      if (response.success) {
        setPublisherInfo(response.data);
      } else {
        showErrorMessage();
        console.log(response);
      }
    } catch (error) {
      showErrorMessage();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showErrorMessage = () => {
    setMessageText('Something went wrong, please try again later');
    setMessageType('Error');
    setMessageModalVisibility(true);
  };

  const getImage = (ID) => {
    let image = require('../../assets/images/placeHolder.jpg');
    for (i = 0; i < SharingCenterImages.length; i++) {
      if (ID === SharingCenterImages[i].id) {
        image = SharingCenterImages[i].image;
      }
    }
    return image;
  };

  const callSeller = () => {
    const args = {
      number: publisherInfo[0].phoneNumber,
      prompt: true,
      skipCanOpen: true,
    };
    call(args).catch(console.error);
  };

  const messageSeller = () => {
    Linking.openURL(`https://wa.me/${publisherInfo[0].phoneNumber}`);
  };

  return (
    <>
      {loading ? (
        <LoadingStateOpaque />
      ) : (
        <SafeAreaView style={styles.screenContainer}>
          <MessageModal
            isVisible={messageModalVisibility}
            onPress={() => setMessageModalVisibility(false)}
            type={messageType}
            message={messageText}
          />
          <View style={styles.imageContainer}>
            <Image source={getImage(product.ID)} style={styles.image} />
            <View
              style={[
                styles.categoryContainer,
                { backgroundColor: themeColor },
              ]}
            >
              <Text style={styles.category}>{product.category}</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{product.name}</Text>
              </View>
              <View style={styles.priceConditionAndCampusContainer}>
                <View style={styles.priceContainer}>
                  <CustomPriceText
                    price={product.price}
                    textColor={themeColor}
                    textSize={24}
                  />
                </View>
                <View style={styles.conditionAndCampusOutterContainer}>
                  <View style={styles.conditionAndCampusInnerContainer}>
                    <Text style={styles.conditionAndCampusLabel}>
                      Condition:{' '}
                    </Text>
                    <Text
                      style={[
                        styles.conditionAndCampusText,
                        { color: themeColor },
                      ]}
                    >
                      {product.condition}
                    </Text>
                  </View>
                  <View style={styles.conditionAndCampusInnerContainer}>
                    <Text style={styles.conditionAndCampusLabel}>Campus: </Text>
                    <Text
                      style={[
                        styles.conditionAndCampusText,
                        { color: themeColor },
                      ]}
                    >
                      {product.campus}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>
              <View style={styles.contactInformationContainer}>
                <View style={styles.sellerImageContainer}>
                  <Image
                    source={require('../../assets/images/placeHolder.jpg')}
                    style={styles.sellerImage}
                  />
                </View>
                <View>
                  <Text style={styles.sellerName}>
                    {publisherInfo[0].firstName} {publisherInfo[0].lastName}
                  </Text>
                  <Text style={styles.sellerInfo}>
                    {publisherInfo[0].phoneNumber}
                  </Text>
                  <Text style={styles.sellerInfo}>
                    {publisherInfo[0].campus}
                  </Text>
                </View>
                <View>
                  <Pressable onPress={callSeller}>
                    <FontAwesomeIcon icon="phone" size={18} color="white" />
                  </Pressable>
                </View>
                <View>
                  <Pressable onPress={messageSeller}>
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      size={24}
                      color="white"
                    />
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
