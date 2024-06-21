import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styles } from '../assets/Styles/CustomPickerStyles';
import { useState } from 'react';

import PickerModal from './PickerModal';

export default function CustomPicker({
  data,
  value,
  setValue,
  marginV,
  textSize,
}) {
  const [modalVisibility, setModalVisibility] = useState(false);
  return (
    <>
      <PickerModal
        data={data}
        isVisible={modalVisibility}
        setVisibility={setModalVisibility}
        setValue={setValue}
        textSize={textSize}
      />
      <View style={[styles.pickerContainer, { marginVertical: marginV }]}>
        <Pressable
          onPress={() => {
            setModalVisibility(true);
          }}
          style={({ pressed }) =>
            pressed ? [styles.picker, styles.buttonPressed] : styles.picker
          }
        >
          <Text style={styles.pickerContainerText}>{value}</Text>
          <FontAwesomeIcon
            icon="caret-down"
            size={16}
            color={ThemeColors.Primary}
          />
        </Pressable>
      </View>
    </>
  );
}
