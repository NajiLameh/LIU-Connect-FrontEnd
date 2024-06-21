import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';

import ThemeColors from '../assets/theme/ThemeColors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState, useEffect } from 'react';

export default function MessageModal({ type, message, isVisible, onPress }) {
  const [iconName, setIconName] = useState('info-circle');
  const [themeColor, setThemeColor] = useState(ThemeColors.Primary);
  const [buttonText, setButtonText] = useState('Cancel');

  useEffect(() => {
    switch (type) {
      case 'Info':
        setIconName('info-circle');
        setThemeColor(ThemeColors.GoogleBlue);
        setButtonText('Ok');
        break;
      case 'Warning':
        setIconName('triangle-exclamation');
        setThemeColor(ThemeColors.GoogleYellow);
        setButtonText('Dismiss');
        break;
      case 'Error':
        setIconName('circle-exclamation');
        setThemeColor(ThemeColors.GoogleRed);
        setButtonText('Close');
        break;
      default:
        setIconName('info-circle');
        setThemeColor(ThemeColors.Primary);
        setButtonText('Cancel');
        break;
    }
  }, [type]);

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
            <View
              style={[
                styles.messageContainer,
                { borderBottomColor: themeColor },
              ]}
            >
              <FontAwesomeIcon icon={iconName} size={26} color={themeColor} />
              <Text style={styles.messageTitle}>{type}</Text>
            </View>
            <Text style={styles.messageInfo}>{message}</Text>
            <View style={styles.dismissButtonContainer}>
              <Pressable
                onPress={onPress}
                style={({ pressed }) =>
                  pressed
                    ? [styles.dismissButton, styles.buttonPressed]
                    : styles.dismissButton
                }
              >
                <Text style={[styles.dismissButtonText, { color: themeColor }]}>
                  {buttonText}
                </Text>
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
    flex: 1,
    backgroundColor: 'rgba(2, 4, 3, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: ThemeColors.White,
    borderRadius: 10,
    width: '85%',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  messageTitle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '500',
    color: ThemeColors.Primary,
  },
  messageInfo: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: ThemeColors.Primary,
  },
  dismissButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    // borderWidth: 1,
  },
  dismissButtonText: {
    fontSize: 18,
    fontWeight: '500',
    // borderWidth: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
