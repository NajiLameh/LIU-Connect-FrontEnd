import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
  StatusBar,
} from 'react-native';
import { useState, useEffect } from 'react';
import ThemeColors from '../assets/theme/ThemeColors';

export default function ProfileModal({
  isVisible,
  setVisibility,
  isAdmin,
  onConfirm,
  fName,
  lName,
  mail,
  workingCam,
  pNumber,
}) {
  const [firstName, setFirstName] = useState(fName);
  const [lastName, setLastName] = useState(lName);
  const [email, setEmail] = useState(mail);
  const [workingCampus, setWorkingCampus] = useState(workingCam);
  const [phoneNumber, setPhoneNumber] = useState(pNumber);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassFields, setShowPassFields] = useState(false);

  useEffect(() => {
    setFirstName(fName);
    setLastName(lName);
    setEmail(mail);
    setWorkingCampus(workingCam);
    setPhoneNumber(pNumber);
    setOldPassword('');
    setNewPassword('');
    setShowPassFields(false);
  }, [isVisible]);
  return (
    <>
      <StatusBar
        backgroundColor="rgba(2, 4, 3, 0.6)"
        barStyle="light-content"
      />
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisibility(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.title}>Edit Fields</Text>
            <TextInput
              placeholder="Edit First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              cursorColor={ThemeColors.Primary}
            />
            <TextInput
              placeholder="Edit Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              cursorColor={ThemeColors.Primary}
            />
            {isAdmin && (
              <TextInput
                placeholder="Change Your Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                cursorColor={ThemeColors.Primary}
              />
            )}
            {!isAdmin && (
              <TextInput
                placeholder="Change Your Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                cursorColor={ThemeColors.Primary}
              />
            )}

            {isAdmin && (
              <TextInput
                placeholder="Change Your Working Campus"
                value={workingCampus}
                onChangeText={setWorkingCampus}
                style={styles.input}
                cursorColor={ThemeColors.Primary}
              />
            )}
            <Pressable
              onPress={() => setShowPassFields((prevState) => !prevState)}
              style={({ pressed }) =>
                pressed
                  ? [styles.showPassFieldsButton, styles.buttonPressed]
                  : styles.showPassFieldsButton
              }
            >
              <Text style={styles.confirmButtonText}>Change Password</Text>
            </Pressable>
            {showPassFields && (
              <>
                <TextInput
                  placeholder="Old Password"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  style={styles.input}
                  cursorColor={ThemeColors.Primary}
                />
                <TextInput
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.input}
                  cursorColor={ThemeColors.Primary}
                />
              </>
            )}
            <View style={styles.buttonsContainer}>
              <Pressable
                onPress={() =>
                  onConfirm(
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    workingCampus,
                    oldPassword,
                    newPassword
                  )
                }
                style={({ pressed }) =>
                  pressed
                    ? [styles.buttonPressed, styles.button]
                    : styles.button
                }
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
              <Pressable
                onPress={() => setVisibility(false)}
                style={({ pressed }) =>
                  pressed
                    ? [styles.buttonPressed, styles.button]
                    : styles.button
                }
              >
                <Text style={styles.cancelButton}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(2, 4, 3, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: ThemeColors.White,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '85%',
  },
  title: {
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: '500',
    color: '#020403',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: ThemeColors.Secondary,
    paddingVertical: 5,
    marginVertical: 5,
  },
  showPassFieldsButton: {
    alignItems: 'center',
    paddingTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  confirmButtonText: {
    fontWeight: '500',
    color: '#4285F4',
  },
  cancelButton: {
    fontWeight: '500',
    color: '#DB4437',
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
