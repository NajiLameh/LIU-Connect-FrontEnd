import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import InputField from '../../components/ui/InputField';
import DecoratedTitle from '../../components/ui/DecoratedTitle';
import PillButton from '../../components/ui/PillButton';
import TertiaryButton from '../../components/ui/TertiaryButton';
import ThemeColors from '../../assets/theme/ThemeColors';

export default function ResetPassword(props) {
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { navigation } = props;
  const resetPasswordHandler = () => {
    console.warn('new password');
  };
  const resendVerificationCodeHandler = () => {
    console.warn('resend Code');
  };
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* <DecoratedTitle
        textWithFirstColor="Reset Password"
        textWithSecondColor=""
        textSize={36}
        firstColor={ThemeColors.Primary}
        secondColor={ThemeColors.Primary}
        underlineColor={ThemeColors.Primary}
      /> */}
      <View style={styles.ActionContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ color: ThemeColors.GoogleYellow, marginBottom: 10 }}>
            Enter the verification code sent to your LIU Email
          </Text>
          <InputField
            placeHol="Verification Code"
            value={verificationCode}
            setValue={setVerificationCode}
            focus={true}
            marginV={0}
          />
          <InputField
            placeHol="New Password"
            value={newPassword}
            setValue={setNewPassword}
            marginV={10}
          />
        </View>
        <PillButton
          onPress={resetPasswordHandler}
          backgroundCol={ThemeColors.Primary}
          textCol="white"
          marginV={10}
        >
          Reset Password
        </PillButton>
        <PillButton
          onPress={resendVerificationCodeHandler}
          backgroundCol="white"
          textCol={ThemeColors.Primary}
          marginV={10}
          isOutlined
          borderCol={ThemeColors.Primary}
        >
          Resend Code
        </PillButton>
        <TertiaryButton
          onPress={navigateToLogin}
          marginV={10}
          textCol="black"
          textSize={14}
          optionalText=""
          optionalTextColor="black"
        >
          Back to <Text style={{ color: ThemeColors.GoogleBlue }}>Log in</Text>
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
