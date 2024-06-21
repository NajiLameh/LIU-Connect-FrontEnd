import { View, TextInput, StyleSheet } from 'react-native';

import ThemeColors from '../../assets/theme/ThemeColors';

export default function TextArea({
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
        multiline={true}
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
    height: 200,
    minHeight: 200,
    maxHeight: 200,
    width: '100%',
    maxWidth: 500,
  },
  InputFieldStyle: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    textAlignVertical: 'top',
    borderColor: ThemeColors.Secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: ThemeColors.White,
  },
});
