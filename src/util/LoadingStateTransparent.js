import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import React from 'react';
import ThemeColors from '../assets/theme/ThemeColors';

export default function LoadingStateTransparent({ isVisible }) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color={ThemeColors.White} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(2, 4, 3, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
