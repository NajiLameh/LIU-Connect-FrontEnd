import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

import ThemeColors from '../../assets/theme/ThemeColors';
import LoadingStateTransparent from '../../util/LoadingStateTransparent';
import MessageModal from '../../components/MessageModal';
import KeyboardAvoidingViewWrapper from '../../util/KeyboardAvoidingViewWrapper';

import { SignupToDataBase } from '../../BackEnd/UsersQueries/SignupToDataBase';

import InputField from '../../components/ui/InputField';
import PillButton from '../../components/ui/PillButton';
import CustomPicker from '../../components/CustomPicker';

export default function AddNewUser({ navigation }) {
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
  const [campus, setCampus] = useState('Select User Campus');
  const [role, setRole] = useState('Select User Role');

  const roleOptions = [
    'Student',
    'Sharing Center Admin',
    'Internship Admin',
    'Global Admin',
  ];
  const campusOptions = [
    'Beirut',
    'Bekaa',
    'Nabatieh',
    'Rayak',
    'Saida',
    'Tripoli',
  ];

  const AddNewUserHandler = async () => {
    const lowerCaseEmail = email.toLowerCase();
    const emptyFields =
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordRepeat ||
      !phoneExtension ||
      !phoneNumber ||
      campus === 'Select User Campus' ||
      role === 'Select User Role';
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
          lowerCaseEmail,
          password,
          phoneExtension,
          phoneNumber,
          role,
          campus
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
        setCampus('Select User Campus');
        setRole('Select User Role');
      }
    }
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
          <View style={styles.phoneExtensionAndNumberContainer}>
            <View style={styles.phoneExtensionContainer}>
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
            <View style={styles.phoneNumberContainer}>
              <InputField
                placeHol="Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
                keyboard="numeric"
                marginV={10}
              />
            </View>
          </View>
          <CustomPicker
            data={roleOptions}
            value={role}
            setValue={setRole}
            marginV={0}
            textSize={16}
          />
          <CustomPicker
            data={campusOptions}
            value={campus}
            setValue={setCampus}
            marginV={10}
            textSize={16}
          />

          <PillButton
            onPress={AddNewUserHandler}
            backgroundCol={ThemeColors.Primary}
            textCol="white"
            marginV={10}
          >
            Register User
          </PillButton>
        </View>
      </KeyboardAvoidingViewWrapper>
    </>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  phoneExtensionAndNumberContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  phoneExtensionContainer: {
    width: '30%',
    marginEnd: '2%',
  },
  phoneNumberContainer: { width: '68%' },
});
