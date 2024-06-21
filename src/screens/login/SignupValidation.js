import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import InputField from '../../components/ui/InputField';
import DecoratedTitle from '../../components/ui/DecoratedTitle';
import PillButton from '../../components/ui/PillButton';
import TertiaryButton from '../../components/ui/TertiaryButton';

export default function SignupValidation(props) {
  const [verificationCode, setVerificationCode] = useState('');
  const { navigation } = props;
  const signupValidationHandler = () => {
    console.warn('verify');
  };
  const resendVerificationCodeHandler = () => {
    console.warn('resend Code');
  };
  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <DecoratedTitle
        textWithFirstColor="Signup Validation"
        textWithSecondColor=""
        textSize={36}
        firstColor="#536DFE"
        secondColor="#536DFE"
        underlineColor="#536DFE"
      />
      <View style={styles.ActionContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ color: '#ffb019' }}>
            Enter the verification code sent to your LIU Email
          </Text>
          <InputField
            placeHol="Verification Code"
            value={verificationCode}
            setValue={setVerificationCode}
            focus={true}
            marginV={10}
          />
        </View>
        <PillButton
          onPress={signupValidationHandler}
          backgroundCol="#536DFE"
          textCol="white"
          marginV={10}
        >
          Confirm
        </PillButton>
        <PillButton
          onPress={resendVerificationCodeHandler}
          backgroundCol="white"
          textCol="#536DFE"
          marginV={10}
          isOutlined
          borderCol="#536DFE"
        >
          Resend Code
        </PillButton>
        <TertiaryButton
          onPress={navigateToSignup}
          marginV={10}
          textCol="black"
          textSize={14}
          optionalText=""
          optionalTextColor="black"
        >
          Back to <Text style={{ color: '#536DFE' }}>Sign up</Text>
        </TertiaryButton>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  ActionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
