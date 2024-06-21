import { StyleSheet } from 'react-native';
import ThemeColors from '../theme/ThemeColors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  horizontalScrollableCategoryContainer: {
    height: 25,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  resultListContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: ThemeColors.White_Smoke,
    borderRadius: 10,
    paddingTop: 5,
  },
});
