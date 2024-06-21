import { StyleSheet } from 'react-native';
import ThemeColors from '../theme/ThemeColors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  internshipContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.Grey_Light,
  },
  internshipDatePostedContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  internshipDatePosted: {
    fontSize: 12,
    fontWeight: '500',
    color: ThemeColors.GoogleYellow,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.GoogleYellow,
  },
  internshipInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconContainer: {
    paddingRight: 10,
    paddingTop: 10,
  },
  internshipName: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 2,
    color: ThemeColors.Primary,
  },
  internshipCompany: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    paddingBottom: 2,
    color: ThemeColors.Primary,
  },
  internshipLocation: {
    flex: 1,
    textAlign: 'left',
    paddingBottom: 2,
    color: ThemeColors.Secondary,
  },
  internshipDetails: {
    flex: 1,
    textAlign: 'left',
    paddingBottom: 2,
    color: ThemeColors.Secondary,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: ThemeColors.GoogleBlue,
  },
  buttonText: {
    fontSize: 12,
    paddingHorizontal: 3,
    fontWeight: '500',
    color: ThemeColors.GoogleBlue,
  },
  emptyResultTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: ThemeColors.Primary,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
