import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function DecoratedTitle({
  firstColor,
  secondColor,
  textWithFirstColor,
  textWithSecondColor,
  textSize,
  isUnderlined,
  underlineColor,
}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={[
          styles.title,
          isUnderlined
            ? { borderBottomWidth: 1, borderBottomColor: underlineColor }
            : {},
          {
            color: firstColor,
            fontSize: textSize,
          },
        ]}
      >
        {textWithFirstColor}
        <Text style={{ color: secondColor }}>{textWithSecondColor}</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: '800',
  },
});
