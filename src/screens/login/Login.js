import { SafeAreaView, View } from 'react-native';
import { useContext, useState } from 'react';
import { styles } from '../../assets/Styles/LoginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeColors from '../../assets/theme/ThemeColors';
import AuthContext from '../../util/AuthContext';
import LoadingStateTransparent from '../../util/LoadingStateTransparent';

import { SigninToDataBase } from '../../BackEnd/UsersQueries/SigninToDataBase';

import InputField from '../../components/ui/InputField';
import DecoratedTitle from '../../components/ui/DecoratedTitle';
import PillButton from '../../components/ui/PillButton';
import TertiaryButton from '../../components/ui/TertiaryButton';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
import MessageModal from '../../components/MessageModal';

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('firstLaunch');
    console.warn('Data removed successfully');
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
};

const setLoginToken = async (userID) => {
  try {
    await AsyncStorage.setItem('userID', userID);
    const id = await AsyncStorage.getItem('userID');
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
};

export default function Login({ navigation }) {
  const { loginHandler, setFirstLaunch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [forgetPassModalVisibility, setForgetPassModalVisibility] =
    useState(false);

  const showForgetPasswordModal = () => {
    // setForgetPassModalVisibility(true);
    removeData();
  };

  const hideForgetPasswordModal = () => {
    setForgetPassModalVisibility(false);
  };

  const appLoginHandler = async () => {
    if (!userName || !password) {
      setMessageText('Please Enter All Fields');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else {
      try {
        setLoading(true);
        const response = await SigninToDataBase(userName, password);
        if (response.success) {
          setLoginToken(response.ID);
          loginHandler();
        } else {
          setMessageText('Incorrect username or password');
          setMessageType('Info');
          setMessageModalVisibility(true);
        }
      } catch (error) {
        setMessageText('Something went wrong, please try again later');
        setMessageType('Error');
        setMessageModalVisibility(true);
        console.log(error);
      } finally {
        setUserName('');
        setPassword('');
        setLoading(false);
      }
    }
  };

  const resetPasswordHandler = () => {
    //logic to send code to email
    setForgetPassModalVisibility(false);
    navigation.navigate('ResetPassword');
  };

  const navigateToSignup = () => {
    setUserName('');
    setPassword('');
    navigation.navigate('Signup');
  };

  return (
    <>
      <LoadingStateTransparent isVisible={loading} />

      <SafeAreaView style={styles.screenContainer}>
        <MessageModal
          isVisible={messageModalVisibility}
          onPress={() => setMessageModalVisibility(false)}
          type={messageType}
          message={messageText}
        />
        <ForgotPasswordModal
          visible={forgetPassModalVisibility}
          onContinue={resetPasswordHandler}
          onCancel={hideForgetPasswordModal}
        />
        <DecoratedTitle
          textWithFirstColor="LIU"
          textWithSecondColor="Connect"
          textSize={36}
          firstColor={ThemeColors.GoogleBlue}
          secondColor={ThemeColors.GoogleYellow}
          underlineColor={ThemeColors.GoogleBlue}
          isUnderlined={true}
        />
        <View style={styles.formContainer}>
          <InputField
            placeHol="User Name"
            value={userName}
            setValue={setUserName}
            focus={true}
            marginV={0}
          />
          <InputField
            placeHol="Password"
            value={password}
            setValue={setPassword}
            textHidden={true}
            marginV={10}
          />
          <PillButton
            onPress={appLoginHandler}
            backgroundCol={ThemeColors.Primary}
            textCol="white"
            marginV={10}
          >
            Sign in
          </PillButton>
          <TertiaryButton
            onPress={showForgetPasswordModal}
            marginV={10}
            textCol="black"
            textSize={14}
            optionalText=""
            optionalTextColor="black"
          >
            Forgotten Password?
          </TertiaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PillButton
            onPress={navigateToSignup}
            backgroundCol="white"
            textCol={ThemeColors.GoogleBlue}
            marginV={0}
            isOutlined
            borderCol={ThemeColors.GoogleBlue}
          >
            Create New Account
          </PillButton>
        </View>
      </SafeAreaView>
    </>
  );
}
