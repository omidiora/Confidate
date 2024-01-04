import React from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import ProfileStyles from '../screens/Profile/ProfileStyles';
function ReactNativeInput(props) {
  return (
    <SafeAreaView>
      <TextInput
        ref={props.ref}
        style={props.style}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor || 'gray'}
        value={props.value}
        selectionColor={props.selectionColor}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        underlineColorAndroid={props.underlineColorAndroid}
        textDecorationLine="none"
        cursorColor='black'
        autoCapitalize='none'
      />
    </SafeAreaView>
  );
}

export default ReactNativeInput;
