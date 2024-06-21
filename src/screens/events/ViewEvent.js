import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { clubImages } from '../../../dummy data/Clubs/ClubsImages';
import ThemeColors from '../../assets/theme/ThemeColors';

import MessageModal from '../../components/MessageModal';
import Rating from '../../components/ui/CustomRating';
import LoadingStateOpaque from '../../util/LoadingStateOpaque';

export default function ViewEvent({ route }) {
  const { event } = route.params;
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [adminInfo, setAdminInfo] = useState([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     getAdminAndMembersInfo();
  //   }, [])
  // );
  // const getAdminAndMembersInfo = async () => {
  //   try {
  //     setLoading(true);
  //     const clubAdminResponse = await getClubAdminFromDataBase(club.ID);
  //     if (clubAdminResponse.success) {
  //       const response = await GetUserInfoFromDataBase(
  //         clubAdminResponse.clubAdminEmail
  //       );
  //       if (response.success) {
  //         setAdminInfo(response.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Temporary
  const getImage = (ID) => {
    let image = require('../../assets/images/placeHolder.jpg');
    for (i = 0; i < clubImages.length; i++) {
      if (ID === clubImages[i].id) {
        image = clubImages[i].image;
      }
    }
    return image;
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
            <Image source={getImage(3)} style={styles.image} />
            <View style={styles.departmentContainer}>
              <Text style={styles.department}>{event.campus} Campus</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{event.name}</Text>
              </View>
              <View style={styles.ratingCampusAndStatusContainer}>
                <View style={styles.campusAndStatusOutterContainer}>
                  <View style={styles.campusAndStatusInnerContainer}>
                    <Text style={styles.campusAndStatusLabel}>Campus: </Text>
                    <Text
                      style={[styles.campusAndStatusText, { color: 'black' }]}
                    >
                      {event.campus}
                    </Text>
                  </View>
                  <View style={styles.campusAndStatusInnerContainer}>
                    <Text style={styles.campusAndStatusLabel}>Status: </Text>
                    <Text
                      style={[styles.campusAndStatusText, { color: 'black' }]}
                    >
                      {event.location}
                    </Text>
                  </View>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{event.time}</Text>
                  <FontAwesomeIcon
                    icon="star"
                    size={20}
                    color={ThemeColors.GoogleYellow}
                  />
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Event Info</Text>
                <Text style={styles.description}>{event.info}</Text>
              </View>
              <View style={styles.contactInformationContainer}>
                <View style={styles.sellerImageContainer}>
                  <Image
                    source={require('../../assets/images/placeHolder.jpg')}
                    style={styles.sellerImage}
                  />
                </View>
                <View>
                  <Text style={styles.sellerName}>LIU Engineering Club</Text>
                  <Text style={styles.sellerInfo}>Bekaa Campus</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  imageContainer: {
    height: '35%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  departmentContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: 5,
    right: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    opacity: 0.8,
    backgroundColor: ThemeColors.GoogleBlue,
  },
  department: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.White_Smoke,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  ratingCampusAndStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 7.5,
    borderColor: ThemeColors.White_Smoke,
  },
  campusAndStatusOutterContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  campusAndStatusInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  campusAndStatusLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  campusAndStatusText: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
    fontWeight: '700',
    paddingEnd: 2,
  },
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'Center',
    borderBottomWidth: 7.5,
    borderColor: ThemeColors.White_Smoke,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: ThemeColors.White_Smoke,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    textAlign: 'justify',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  contactInformationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 7.5,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: '#020403',
  },
  sellerImageContainer: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
  },
  sellerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  sellerInfo: {
    color: 'white',
  },
});
