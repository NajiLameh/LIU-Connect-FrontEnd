import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export default function PillButton({
  onPress,
  children,
  backgroundCol,
  textCol,
  textSize,
  marginV,
  isOutlined,
  borderCol,
  minH,
  minW,
}) {
  return (
    <View
      style={
        isOutlined
          ? [
              styles.outlinedButtonOutterContainer,
              {
                borderColor: borderCol,
                marginVertical: marginV,
                minHeight: minH ? minH : 50,
                minWidth: minW ? minW : 200,
              },
            ]
          : [
              styles.containedButtonOutterContainer,
              {
                marginVertical: marginV,
                minHeight: minH ? minH : 50,
                minWidth: minW ? minW : 200,
              },
            ]
      }
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [
                isOutlined
                  ? styles.outlinedButtonInnerContainer
                  : styles.containedButtonInnerContainer,
                styles.buttonPressed,
                { backgroundColor: backgroundCol },
              ]
            : [
                isOutlined
                  ? styles.outlinedButtonInnerContainer
                  : styles.containedButtonInnerContainer,
                { backgroundColor: backgroundCol },
              ]
        }
      >
        <Text
          style={[
            isOutlined ? styles.outlinedButtonText : styles.containedButtonText,
            { color: textCol, fontSize: textSize ? textSize : 16 },
          ]}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  containedButtonOutterContainer: {
    height: 50,
    maxHeight: 50,
    width: '100%',
    maxWidth: 500,
    borderRadius: 50,
    overflow: 'hidden',
  },
  containedButtonInnerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  containedButtonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  outlinedButtonOutterContainer: {
    height: 50,
    maxHeight: 50,
    width: '100%',
    maxWidth: 500,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  outlinedButtonInnerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  outlinedButtonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
