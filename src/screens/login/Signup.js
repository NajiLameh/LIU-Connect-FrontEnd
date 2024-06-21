import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';

import ThemeColors from '../../assets/theme/ThemeColors';
import LoadingStateTransparent from '../../util/LoadingStateTransparent';
import MessageModal from '../../components/MessageModal';
import KeyboardAvoidingViewWrapper from '../../util/KeyboardAvoidingViewWrapper';

import { SignupToDataBase } from '../../BackEnd/UsersQueries/SignupToDataBase';

import InputField from '../../components/ui/InputField';
import DecoratedTitle from '../../components/ui/DecoratedTitle';
import PillButton from '../../components/ui/PillButton';
import TertiaryButton from '../../components/ui/TertiaryButton';

export default function SignUp({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [phoneExtension, setPhoneExtension] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const signUpHandler = async () => {
    const lowerCaseEmail = email.toLowerCase();
    const emptyFields =
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordRepeat ||
      !phoneNumber;
    const invalidEmail = !(
      lowerCaseEmail.includes('@students.liu.edu.lb') ||
      lowerCaseEmail.includes('@liu.edu.lb')
    );
    const passwordMismatch = password !== passwordRepeat;

    if (emptyFields) {
      setMessageText('Please Enter All Fields to Register');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else if (invalidEmail) {
      setMessageText('Please Use Your LIU Email Account');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else if (passwordMismatch) {
      setMessageText('Password Mismatch');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else {
      try {
        setLoading(true);
        const response = await SignupToDataBase(
          firstName,
          lastName,
          email,
          password,
          phoneExtension,
          phoneNumber,
          'Student'
        );
        if (response.success) {
          setMessageText(response.message);
          setMessageType('Info');
          setMessageModalVisibility(true);
        } else {
          if (response.message === 1062)
            setMessageText('This Account Already Exists');
          setMessageType('Error');
          setMessageModalVisibility(true);
        }
      } catch (error) {
        setMessageText('Something went wrong, please try again later');
        setMessageType('Error');
        setMessageModalVisibility(true);
        console.log(error);
      } finally {
        setLoading(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
        setPhoneExtension('');
        setPhoneNumber('');
      }
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <LoadingStateTransparent isVisible={loading} />
      <KeyboardAvoidingViewWrapper>
        <View style={styles.screenContainer}>
          <MessageModal
            isVisible={messageModalVisibility}
            onPress={() => setMessageModalVisibility(false)}
            type={messageType}
            message={messageText}
          />
          <View style={styles.titleContainer}>
            <DecoratedTitle
              textWithFirstColor="LIU"
              textWithSecondColor="Connect"
              textSize={32}
              firstColor={ThemeColors.GoogleBlue}
              secondColor={ThemeColors.GoogleYellow}
              isUnderlined={true}
              underlineColor={ThemeColors.GoogleBlue}
            />
          </View>
          <View style={styles.titleDescriptionContainer}>
            <Text style={styles.titleDescription}>
              Explore, Connect, Thrive
            </Text>
          </View>
          <View style={styles.ActionContainer}>
            <InputField
              placeHol="First Name (Required)"
              value={firstName}
              setValue={setFirstName}
              focus={true}
              marginV={0}
            />
            <InputField
              placeHol="Last Name (Required)"
              value={lastName}
              setValue={setLastName}
              marginV={10}
            />
            <InputField
              placeHol="Email (Required)"
              value={email}
              setValue={setEmail}
              marginV={0}
            />
            <InputField
              placeHol="Password (Required)"
              value={password}
              setValue={setPassword}
              textHidden={true}
              marginV={10}
            />
            <InputField
              placeHol="Confirm Password (Required)"
              value={passwordRepeat}
              setValue={setPasswordRepeat}
              textHidden={true}
              marginV={0}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  width: '30%',
                  marginEnd: '2%',
                }}
              >
                <InputField
                  placeHol="+961"
                  value={phoneExtension}
                  setValue={setPhoneExtension}
                  centeredText={true}
                  keyboard="phone-pad"
                  marginV={10}
                  maxLen={4}
                />
              </View>
              <View style={{ width: '68%' }}>
                <InputField
                  placeHol="Phone Number"
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  keyboard="numeric"
                  marginV={10}
                />
              </View>
            </View>
            <PillButton
              onPress={signUpHandler}
              backgroundCol={ThemeColors.Primary}
              textCol="white"
              marginV={10}
            >
              Sign up
            </PillButton>
            <TertiaryButton
              onPress={navigateToLogin}
              marginV={10}
              textCol={ThemeColors.Primary}
              textSize={14}
              optionalText=""
              optionalTextColor={ThemeColors.Primary}
            >
              Already have an account?{' '}
              <Text style={{ color: ThemeColors.GoogleBlue }}>Sign in</Text>
            </TertiaryButton>
          </View>
        </View>
      </KeyboardAvoidingViewWrapper>
    </>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  titleContainer: {
    paddingTop: 30,
    justifyContent: 'center',
  },
  titleDescriptionContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleDescription: {
    fontSize: 20,
    fontWeight: '500',
    color: ThemeColors.GoogleYellow,
  },
  ActionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
