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
import ClubContext from '../../util/ClubContext';
import AuthContext from '../../util/AuthContext';

import { getClubAdminFromDataBase } from '../../BackEnd/ClubQueries/GetClubAdminFromDataBase';
import { GetUserInfoFromDataBase } from '../../BackEnd/UsersQueries/GetUserInfoFromDataBase';
import { CheckClubUserJunctionInDataBase } from '../../BackEnd/ClubQueries/CheckClubUserJunctionInDataBase';
import { JoinClubInDataBase } from '../../BackEnd/ClubQueries/JoinClubInDataBase';
import { LeaveClubInDataBase } from '../../BackEnd/ClubQueries/LeaveClubInDataBase';

import MessageModal from '../../components/MessageModal';
import Rating from '../../components/ui/CustomRating';
import PillButton from '../../components/ui/PillButton';
import LoadingStateOpaque from '../../util/LoadingStateOpaque';

export default function ClubInfo() {
  const { club, themeColor } = useContext(ClubContext);
  const { userID } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [adminInfo, setAdminInfo] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getAdminAndMembersInfo();
    }, [])
  );

  const getAdminAndMembersInfo = async () => {
    try {
      setLoading(true);
      const clubAdminResponse = await getClubAdminFromDataBase(club.ID);
      if (clubAdminResponse.success) {
        const response = await GetUserInfoFromDataBase(
          clubAdminResponse.clubAdminEmail
        );
        if (response.success) {
          setAdminInfo(response.data);
        }
      }
      let userId = await userID();
      const response = await CheckClubUserJunctionInDataBase(club.ID, userId);
      if (response.success) {
        setIsJoined(true);
      } else {
        setIsJoined(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const JoinOrLeaveClub = async () => {
    try {
      setLoading(true);
      let userId = await userID();
      if (isJoined) {
        const response = await LeaveClubInDataBase(club.ID, userId);
        if (response.success) {
          setIsJoined(() => !isJoined);
        }
      } else {
        const response = await JoinClubInDataBase(club.ID, userId);
        console.log(response);
        if (response.success) {
          setIsJoined(() => !isJoined);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
  // Temporary

  const handleRatingSelected = (rating) => {
    // console.log('Selected Rating:', rating);
    setMessageText(
      'The rating feature will be available in an upcoming update'
    );
    setMessageType('Info');
    setMessageModalVisibility(true);
  };
  const goToClubSocialMedia = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setMessageText('Cannot Open URL');
        setMessageType('Error');
        setMessageModalVisibility(true);
      }
    } catch (error) {
      setMessageText('Cannot Open URL');
      setMessageType('Error');
      setMessageModalVisibility(true);
    }
  };
  const mailAdmin = (adminEmail) => {
    Linking.openURL(`mailto:${adminEmail}`);
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
            <Image source={getImage(club.ID)} style={styles.image} />
            <View
              style={[
                styles.departmentContainer,
                { backgroundColor: themeColor },
              ]}
            >
              <Text style={styles.department}>
                {club.department} Department
              </Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{club.name}</Text>
                <View style={{ width: 90 }}>
                  <PillButton
                    onPress={JoinOrLeaveClub}
                    backgroundCol={
                      isJoined ? ThemeColors.White : ThemeColors.GoogleBlue
                    }
                    textCol={
                      isJoined ? ThemeColors.GoogleBlue : ThemeColors.White
                    }
                    textSize={14}
                    marginV={0}
                    isOutlined={isJoined ? true : false}
                    borderCol={ThemeColors.GoogleBlue}
                    minH={1}
                    minW={90}
                  >
                    {isJoined ? 'Joined' : 'Join Club'}
                  </PillButton>
                </View>
              </View>
              <View style={styles.ratingCampusAndStatusContainer}>
                <View style={styles.campusAndStatusOutterContainer}>
                  <View style={styles.campusAndStatusInnerContainer}>
                    <Text style={styles.campusAndStatusLabel}>Campus: </Text>
                    <Text
                      style={[
                        styles.campusAndStatusText,
                        { color: themeColor },
                      ]}
                    >
                      {club.campus}
                    </Text>
                  </View>
                  <View style={styles.campusAndStatusInnerContainer}>
                    <Text style={styles.campusAndStatusLabel}>Status: </Text>
                    <Text
                      style={[
                        styles.campusAndStatusText,
                        { color: themeColor },
                      ]}
                    >
                      {club.status} Club
                    </Text>
                  </View>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{club.rating}</Text>
                  <FontAwesomeIcon
                    icon="star"
                    size={20}
                    color={ThemeColors.GoogleYellow}
                  />
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>About Club</Text>
                <Text style={styles.description}>{club.description}</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>
                  Follow us on Social Media
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: '100%',
                    paddingVertical: 15,
                  }}
                >
                  <Pressable
                    onPress={() => goToClubSocialMedia(club.facebookLink)}
                  >
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        color={ThemeColors.FaceBookBlue}
                        size={30}
                      />
                      <Text
                        style={{
                          paddingTop: 5,
                          fontSize: 12,
                          color: ThemeColors.Primary,
                          fontWeight: '500',
                        }}
                      >
                        Facebook
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => goToClubSocialMedia(club.instagramLink)}
                  >
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        color="red"
                        size={30}
                      />
                      <Text
                        style={{
                          paddingTop: 5,
                          fontSize: 12,
                          color: ThemeColors.Primary,
                          fontWeight: '500',
                        }}
                      >
                        Instagram
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => goToClubSocialMedia(club.linkedinLink)}
                  >
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        color={ThemeColors.FaceBookBlue}
                        size={30}
                      />
                      <Text
                        style={{
                          paddingTop: 5,
                          fontSize: 12,
                          color: ThemeColors.Primary,
                          fontWeight: '500',
                        }}
                      >
                        Linkedin
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Leave a Rating</Text>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 15,
                  }}
                >
                  <Rating onRatingSelected={handleRatingSelected} />
                </View>
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
                    {adminInfo[0].firstName} {adminInfo[0].lastName}
                  </Text>
                  <Text style={styles.sellerInfo}>{adminInfo[0].email}</Text>
                  <Text style={styles.sellerInfo}>
                    {adminInfo[0].campus} Campus
                  </Text>
                </View>
                <View>
                  <Pressable onPress={() => mailAdmin(adminInfo[0].email)}>
                    <FontAwesomeIcon icon="envelope" size={20} color="white" />
                  </Pressable>
                </View>
                <View></View>
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
    borderBottomColor: ThemeColors.White_Smoke,
    borderBottomWidth: 1,
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
  },
  department: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: ThemeColors.White_Smoke,
  },
  title: {
    fontSize: 20,
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
