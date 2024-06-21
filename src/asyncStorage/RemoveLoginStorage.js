import AsyncStorage from '@react-native-async-storage/async-storage';

export const RemoveLoginStorage = async () => {
  try {
    await AsyncStorage.removeItem('userID');
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
};
