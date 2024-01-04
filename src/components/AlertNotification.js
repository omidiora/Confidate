import React from 'react';
import {View, Text, Alert, SafeAreaView} from 'react-native';
function AlertNotification(props) {
  console.log('Cancel', props);
  Alert.alert(props.alertTilte, props.alertMessage, [
    {
      text: t("messages.Cancel"),
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: t("messages.OK"), onPress: () => props.okay(props.items)},
  ]);
}

export default AlertNotification;
