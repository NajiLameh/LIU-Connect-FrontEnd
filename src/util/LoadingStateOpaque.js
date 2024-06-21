import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import ThemeColors from '../assets/theme/ThemeColors';

export default function LoadingStateOpaque() {
  return (
    <View style={styles.activityIndicatorontainer}>
      <ActivityIndicator size="large" color={ThemeColors.Primary} />
    </View>
  );
}
const styles = StyleSheet.create({
  activityIndicatorontainer: {
    flex: 1,
    backgroundColor: ThemeColors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
