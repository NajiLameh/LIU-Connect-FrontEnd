import { View, TextInput, StyleSheet } from 'react-native';

import ThemeColors from '../../assets/theme/ThemeColors';

export default function InputField({
  placeHol,
  value,
  setValue,
  textHidden,
  centeredText,
  keyboard,
  focus,
  marginV,
  maxLen,
}) {
  return (
    <View style={[styles.InputFieldContainer, { marginVertical: marginV }]}>
      <TextInput
        autoFocus={focus}
        style={[
          styles.InputFieldStyle,
          centeredText && { textAlign: 'center' },
        ]}
        value={value}
        onChangeText={setValue}
        secureTextEntry={textHidden}
        placeholder={placeHol}
        placeholderTextColor={ThemeColors.Secondary}
        cursorColor={ThemeColors.Primary}
        selectionColor={ThemeColors.Primary}
        keyboardType={keyboard ? keyboard : 'default'}
        maxLength={maxLen ? maxLen : undefined}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  InputFieldContainer: {
    height: 50,
    minHeight: 50,
    maxHeight: 50,
    width: '100%',
    // minWidth: 200,
    maxWidth: 500,
  },
  InputFieldStyle: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: ThemeColors.Secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: ThemeColors.White,
  },
});
