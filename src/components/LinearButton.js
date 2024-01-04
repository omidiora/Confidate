import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
function LineraButton(props) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={props.enter} disabled={props.loader}>
        <LinearGradient
          colors={['#A16AEB', '#Ec75F6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}>
          {props.loader ? (
            <ActivityIndicator
              size="large"
              color="#ffff"
              style={{marginTop: '0%'}}
            />
          ) : (
            <Text style={styles.logintext}>{props.title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  logintext: {
    color: 'white',
    fontFamily: 'Rubik-Medium',
    fontWeight: 'bold',
    fontSize: 24,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 3,
    height: 65,
    marginTop: '2%',
    color: 'white',
    fontFamily: 'Rubik',
    width: '85%',
    alignSelf: 'center',
  },
});
export default LineraButton;
