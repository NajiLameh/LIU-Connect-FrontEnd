import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ThemeColors from '../assets/theme/ThemeColors';

export default function ProfileSection({ iconName, title, info, border }) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon
          icon={iconName}
          size={22}
          color={ThemeColors.Primary}
        />
      </View>
      <View
        style={[styles.infoContainer, { borderBottomWidth: border ? 1 : 0 }]}
      >
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: ThemeColors.Grey_Light,
    paddingVertical: 7.5,
  },
  infoTitle: {
    fontSize: 15,
    color: ThemeColors.Grey_Davy,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    color: ThemeColors.Primary,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
