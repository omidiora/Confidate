import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {View} from 'react-native';

function GenderDropDown(props) {
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  return (
    <View>
      <SelectDropdown
        ref={props.ref}
        data={props.data}
        onSelect={props.onSelect}
        buttonTextAfterSelection={props.buttonTextAfterSelection}
        // rowTextForSelection={props.buttonTextAfterSelection}
        defaultButtonText={props.defaultButtonText}
        style={props.style}
        buttonStyle={props.buttonStyle}
        buttonTextStyle={props.buttonTextStyle}
        dropdownStyle={props.dropdownStyle}
        dropdownIconPosition={props.dropdownIconPosition}
        renderDropdownIcon={props.renderDropdownIcon}
        rowTextStyle={{textTransform: 'capitalize'}}
      />
    </View>
  );
}

export default GenderDropDown;
