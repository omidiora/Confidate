import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveGmail = async () => {
  await AsyncStorage.removeItem('user').then(rep => console.log('remove', rep));
};
