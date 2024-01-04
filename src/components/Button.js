import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
function Button(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.submit}
        style={styles.conatinerButton}
        disabled={props.disabled}>
        {props.loader ? (
          <ActivityIndicator
            size="large"
            color="#ffff"
            style={{marginTop: '2%'}}
          />
        ) : (
          <Text style={styles.conatinerText}> {props.title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  conatinerButton: {
    backgroundColor: '#EA1B91',
    borderRadius: 10,

    height: 55,

    color: 'white',
    marginHorizontal: '4%',
    marginVertical: '10%',
  },
  conatinerText: {
    textAlign: 'center',
    paddingTop: 15,
    color: '#ffff',
    fontSize: 18,
  },
});
export default Button;
