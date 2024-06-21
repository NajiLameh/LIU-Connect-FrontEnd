import {
  SafeAreaView,
  View,
  StyleSheet,
  Modal,
  useWindowDimensions,
} from 'react-native';

import React, { useState } from 'react';
import InputField from './ui/InputField';
import DecoratedTitle from './ui/DecoratedTitle';
import PillButton from './ui/PillButton';
import ThemeColors from '../assets/theme/ThemeColors';

export default function ResetPassword({ visible, onCancel, onContinue }) {
  const { height } = useWindowDimensions();
  const [recoveryemail, setRecoveryEmail] = useState('');
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.screenContainer}>
        <View style={{ marginTop: height * 0.05 }}>
          <DecoratedTitle
            textWithFirstColor="Reset Your Account Password"
            textWithSecondColor=""
            textSize={20}
            firstColor={ThemeColors.Primary}
            secondColor={ThemeColors.Primary}
            isUnderlined={true}
            underlineColor={ThemeColors.Primary}
          />
        </View>
        <View style={styles.actionContainer}>
          <InputField
            placeHol="Enter Your Email"
            value={recoveryemail}
            setValue={setRecoveryEmail}
            focus={true}
            marginV={10}
          />
          <PillButton
            onPress={onContinue}
            backgroundCol={ThemeColors.White}
            textCol={ThemeColors.Primary}
            isOutlined={true}
            marginV={10}
          >
            Reset Password
          </PillButton>
          <PillButton
            onPress={onCancel}
            backgroundCol="white"
            textCol="red"
            marginV={10}
            isOutlined
            borderCol="red"
          >
            Cancel
          </PillButton>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginHorizontal: 40,
  },
  actionContainer: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
