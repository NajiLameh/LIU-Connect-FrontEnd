import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  FlatList,
  Pressable,
} from 'react-native';
import { styles } from '../assets/Styles/PickerModalStyles';

export default function PickerModal({
  data,
  isVisible,
  setVisibility,
  setValue,
  textSize,
}) {
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
            <FlatList
              style={styles.listContainer}
              data={data}
              renderItem={(itemData) => {
                return (
                  <View style={styles.buttonContainer}>
                    <Pressable
                      onPress={() => {
                        setValue(itemData.item);
                        setVisibility(false);
                      }}
                      style={({ pressed }) =>
                        pressed
                          ? [styles.button, styles.buttonPressed]
                          : styles.button
                      }
                    >
                      <Text style={[styles.buttonText, { fontSize: textSize }]}>
                        {itemData.item}
                      </Text>
                    </Pressable>
                  </View>
                );
              }}
            />
            <View style={styles.dismissButtonContainer}>
              <Pressable
                onPress={() => {
                  setVisibility(false);
                }}
                style={({ pressed }) =>
                  pressed
                    ? [styles.button, styles.buttonPressed]
                    : styles.button
                }
              >
                <Text
                  style={[styles.dismissButtonText, { fontSize: textSize }]}
                >
                  Dismiss
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
