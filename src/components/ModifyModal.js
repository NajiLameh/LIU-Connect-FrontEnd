import { View, Modal, StyleSheet, StatusBar } from 'react-native';

import ThemeColors from '../assets/theme/ThemeColors';
import TertiaryButton from './ui/TertiaryButton';

export default function ModifyModal({
  data,
  navigation,
  isVisible,
  setVisibility,
  onEdit,
  onDelete,
}) {
  const editInternship = () => {
    setVisibility(false);
    navigation.navigate(onEdit, { data });
  };
  return (
    <>
      <StatusBar
        backgroundColor="rgba(2, 4, 3, 0.6)"
        barStyle="light-content"
      />
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisibility(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.button}>
              <TertiaryButton
                onPress={editInternship}
                marginV={10}
                textCol={ThemeColors.GoogleBlue}
                textSize={18}
                optionalText=""
                optionalTextColor={ThemeColors.GoogleBlue}
              >
                Edit
              </TertiaryButton>
            </View>
            <View style={styles.button}>
              <TertiaryButton
                onPress={() => onDelete(data.ID)}
                marginV={10}
                textCol={ThemeColors.GoogleRed}
                textSize={18}
                optionalText=""
                optionalTextColor={ThemeColors.GoogleRed}
              >
                Delete
              </TertiaryButton>
            </View>
            <View style={styles.dismissButtonContainer}>
              <TertiaryButton
                onPress={() => setVisibility(false)}
                marginV={10}
                textCol={ThemeColors.GoogleYellow}
                textSize={18}
                optionalText=""
                optionalTextColor={ThemeColors.GoogleYellow}
              >
                Dismiss
              </TertiaryButton>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '70%',
  },
  dismissButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.Grey_Light,
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
