import { StyleSheet } from 'react-native';
import ThemeColors from '../theme/ThemeColors';
export const styles = StyleSheet.create({
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
  listContainer: { width: '100%' },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.Grey_Light,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '500',
    color: ThemeColors.GoogleBlue,
  },
  dismissButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissButtonText: {
    fontWeight: '500',
    color: ThemeColors.GoogleRed,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
