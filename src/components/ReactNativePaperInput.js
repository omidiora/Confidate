import React from 'react';
import {TouchableRipple, TextInput, Text, Provider} from 'react-native-paper';
import {SafeAreaView, View} from 'react-native';
function ReactNativePaperInput(props) {
  console.log('ref', props.ref);
  return (
    <SafeAreaView>
      <TextInput
        ref={props.ref}
        mode={props.mode}
        value={props.value}
        onChangeText={props.onChangeText}
        style={props.style}
        theme={props.theme}
        render={props.render}
        multiline={props.multiline}
        onChange={props.onChange}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        selectionColor={props.selectionColor}
        maxLength={props.maxLength}
        underlineColorAndroid={props.underlineColorAndroid}
        right={props.right}
      />
    </SafeAreaView>
  );
}

export default ReactNativePaperInput;
