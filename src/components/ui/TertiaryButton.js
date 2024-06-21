import { Text, Pressable } from 'react-native';
import React from 'react';

export default function TertiaryButton({
  onPress,
  marginV,
  textCol,
  textSize,
  optionalText,
  optionalTextColor,
  children,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? { opacity: 0.5, marginVertical: marginV }
          : { marginVertical: marginV }
      }
    >
      <Text style={{ color: textCol, fontSize: textSize, fontWeight: '500' }}>
        {children}
        <Text style={{ color: optionalTextColor }}>{optionalText}</Text>
      </Text>
    </Pressable>
  );
}
