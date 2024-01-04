import React from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-input';

function MobileNumberInput(props) {
  return (
    <View>
      <PhoneInput
        ref={props.ref}
        flagStyle={props.flagStyle}
        style={props.style}
        textProps={props.textProps}
        textStyle={props.textStyle}
        onChangePhoneNumber={props.onChangePhoneNumber}
      />
    </View>
  );
}

export default MobileNumberInput;
