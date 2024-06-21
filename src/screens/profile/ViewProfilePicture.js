import { View, Image, StatusBar } from 'react-native';
import React from 'react';
import ThemeColors from '../../assets/theme/ThemeColors';

export default function ViewProfilePicture() {
  return (
    <>
      <StatusBar
        backgroundColor={ThemeColors.Primary}
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          backgroundColor: ThemeColors.Primary,
        }}
      >
        <Image
          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
          source={require('../../assets/images/girl.jpg')}
        />
      </View>
    </>
  );
}
