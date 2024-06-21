import {
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../util/AuthContext';

import { GetUserInfoFromDataBase } from '../../BackEnd/UsersQueries/GetUserInfoFromDataBase';
import MessageModal from '../../components/MessageModal';
import ProfileSection from '../../components/ProfileSection';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PillButton from '../../components/ui/PillButton';
import ProfileModal from '../../components/ProfileModal';
import ThemeColors from '../../assets/theme/ThemeColors';
import LoadingStateOpaque from '../../util/LoadingStateOpaque';

export default function Profile({ navigation }) {
  const { userID } = useContext(AuthContext);
  let userId = '';
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [campus, setCampus] = useState('');
  const [role, setRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserInfoHandler();
    }, [])
  );

  const getUserInfoHandler = async () => {
    try {
      setLoading(true);
      userId = await userID();
      console.log(userId);
      const response = await GetUserInfoFromDataBase(userId);
      console.log(response);
      if (response.success) {
        setFirstName(response.data[0].firstName);
        setLastName(response.data[0].lastName);
        setEmail(response.data[0].email);
        setCampus(response.data[0].campus);
        setPhoneNumber(response.data[0].phoneNumber);
        if (response.data[0].role.includes('Admin')) {
          setIsAdmin(true);
          if (response.data[0].role === 'Global Admin') {
            setIsGlobalAdmin(true);
          }
        }
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

  const ShowEditModal = () => {
    // setModalIsVisible(true);
    setMessageText(
      'Editing info feature will be available in an upcoming update'
    );
    setMessageType('Info');
    setMessageModalVisibility(true);
  };
  const showProfileImage = () => {
    navigation.navigate('ViewProfilePicture');
  };
  const updateFields = (
    firstName,
    lastName,
    email,
    phoneNumber,
    workingCampus,
    oldPassword,
    newPassword
  ) => {
    setModalIsVisible(false);
  };
  const manageUsersHandler = () => {
    navigation.navigate('ManageUsers');
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
          <ProfileModal
            isVisible={modalIsVisible}
            setVisibility={setModalIsVisible}
            isAdmin={isAdmin}
            fName={firstName}
            lName={lastName}
            mail={email}
            pass={password}
            workingCam={campus}
            onConfirm={updateFields}
          />
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Pressable
                onPress={showProfileImage}
                style={({ pressed }) => pressed && styles.buttonPressed}
              >
                <Image
                  style={styles.image}
                  source={require('../../assets/images/user.jpg')}
                />
              </Pressable>
            </View>
            <View style={styles.editButtonContainer}>
              <Pressable
                style={({ pressed }) =>
                  pressed
                    ? [styles.editButton, styles.buttonPressed]
                    : styles.editButton
                }
                onPress={ShowEditModal}
              >
                <FontAwesomeIcon
                  icon="pencil"
                  size={22}
                  color={ThemeColors.Primary}
                />
              </Pressable>
            </View>
            <View style={styles.actionContainer}>
              <ProfileSection
                iconName="user"
                title="First Name"
                info={firstName}
                border={true}
                editHandler={ShowEditModal}
              />
              <ProfileSection
                iconName="user"
                title="Last Name"
                info={lastName}
                border={true}
                editHandler={ShowEditModal}
              />
              {isAdmin && (
                <ProfileSection
                  iconName="envelope"
                  title="Email"
                  info={email}
                  border={true}
                  editHandler={ShowEditModal}
                />
              )}

              <ProfileSection
                iconName="building"
                title="Campus"
                info={campus}
                border={true}
                editHandler={ShowEditModal}
              />

              <ProfileSection
                iconName="phone"
                title="Phone Number"
                info={phoneNumber}
                border={false}
                editHandler={ShowEditModal}
              />

              {isGlobalAdmin && (
                <View style={styles.buttonsContainer}>
                  <PillButton
                    onPress={manageUsersHandler}
                    backgroundCol="white"
                    textCol={ThemeColors.Primary}
                    marginV={10}
                    isOutlined
                    borderCol={ThemeColors.Primary}
                  >
                    Manage Users
                  </PillButton>
                </View>
              )}
            </View>
          </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: ThemeColors.Primary,
    resizeMode: 'cover',
  },
  editButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  editButton: {
    padding: 10,
    borderRadius: 20,
  },
  actionContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
