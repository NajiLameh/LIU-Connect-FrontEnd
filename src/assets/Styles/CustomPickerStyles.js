import { StyleSheet } from 'react-native';
import ThemeColors from '../theme/ThemeColors';
export const styles = StyleSheet.create({
  pickerContainer: {
    height: 50,
    minHeight: 50,
    maxHeight: 50,
    width: '100%',
    maxWidth: 500,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.Secondary,
    borderRadius: 10,
    backgroundColor: ThemeColors.White,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pickerContainerText: {
    fontSize: 16,
    color: ThemeColors.Primary,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
