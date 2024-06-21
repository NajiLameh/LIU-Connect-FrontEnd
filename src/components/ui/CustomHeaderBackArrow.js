import { Pressable, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function CustomHeaderBackArrow({ navigation, color }) {
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) =>
        pressed ? [styles.button, styles.buttonPressed] : styles.button
      }
    >
      <FontAwesomeIcon icon="arrow-left" color={color} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingEnd: 10,
    paddingVertical: 5,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
