import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import PublicRoute from './src/routes/PublicRoute';
import Route from './src/routes/Route';
import NetInfo from '@react-native-community/netinfo';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {SafeAreaView, View, Text} from 'react-native';
import * as storeHelper from './src/redux/store/store';
import Toast from 'react-native-toast-message';
const {store, persistor} = storeHelper.configureStore();
import {enableScreens} from 'react-native-screens';
import PubNub from 'pubnub';
import {PubNubProvider} from 'pubnub-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import RootNavigator from './src/routes/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import i18n from './src/Localization/i18n';
import { I18nextProvider } from 'react-i18next';

import { LogBox } from 'react-native';

enableScreens(false);
console.log("store", store, persistor);
const Msg = ({ text2, color, onPress }) => (
  <View
    style={{
      width: "90%",
      backgroundColor: "#FFF",
      borderLeftWidth: 10,
      borderLeftColor: color,
    }}
  >
    <View>
      <Text style={{ fontSize: 14, padding: 16, fontFamily: "Rubika" }}>
        {text2}
      </Text>
      <View>
        {/* <Text style={{fontSize: 14, padding: 16}}>Cancel</Text> */}
      </View>
    </View>
    
  </View>
);
const toastConfig = {
  success: ({ text2, onPress, props, ...rest }) => (
    <Msg text2={text2} onPress={onPress} color="#00A914" />
  ),
  error: ({ text2, props, onPress, ...rest }) => (
    <Msg text2={text2} onPress={onPress} color="#BD2105" />
  ),
  info: ({ text2, props, onPress, ...rest }) => (
    <Msg text2={text2} onPress={onPress} color="#01FBDD" />
  ),
};

const pubnub = new PubNub({
  publishKey: "pub-c-3d8ac92b-8141-4195-a3f9-e834572cf497",
  subscribeKey: "sub-c-efe3a275-40f8-484b-a2cb-a8cff3881c60",
  uuid: "131456",
});



export default function App(props) {
  // const { t, i18n } = useTranslation();

  function languageRestart(language) {
    i18n.changeLanguage(language);
  }

  useEffect(() => {
    AsyncStorage.getItem("lang").then((res) => {
      languageRestart(res);
    });
  }, [])


LogBox.ignoreLogs(['No task registered for key myTaskName']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
    <PubNubProvider client={pubnub}>
      <I18nextProvider i18n={i18n}>
      <Provider store={store}>
      <RootNavigator />
      {/* <PublicRoute/> */}
        <PersistGate persistor={persistor}>
          
        </PersistGate>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </Provider>
      </I18nextProvider>
      </PubNubProvider>
  );
}
