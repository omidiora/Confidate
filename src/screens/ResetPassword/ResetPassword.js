import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import hedaer from '../../../assets/images/hedare.png';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearButton from '../../components/LinearButton';
import {editPasswords} from '../../API/listApisServices';
import ReactNativeInput from '../../components/ReactNativeInput';
import {MessageAction} from '../../components/commonHelper';
import { useTranslation } from 'react-i18next';
let {width, height} = Dimensions.get('window');
function ResetPassword(props) {
  const [loader, setLoader] = useState(false);
  const [pass, setPass] = useState('');
  const [bar, setBar] = useState(false);
  const [barT, setBarT] = useState(false);
  const [barTh, setBarTh] = useState(false);
  const [barF, setBarF] = useState(false);
  const [showPassword, setPassword] = useState(false);
  const [token, setToken] = useState('');
  const { t } = useTranslation();
  const onChangeNumber = text => {
    let reWhiteSpace = new RegExp(/\s/);
    // Check for white space
    if (reWhiteSpace.test(text)) {
      // alert("Please Check Your Fields For Spaces");
      return false;
    } else {
      setPass(text);
      validatePassword(text);
    }
    return true;
  };
  const getOtp = async () => {
    let userToken = await AsyncStorage.getItem('otp');
    const Token = JSON.parse(userToken);

    setToken(Token);
    console.log(userToken);
  };
  const passwordChanged = () => {
    Alert.alert('ChangePassword Alert', 'Password Changed Successfully', [
      {text: t("messages.OK"), onPress: () => props.navigation.navigate('Login')},
    ]);
  };
  const onSucess = () => {
    props.navigation.navigate('Login');
  };
  const error = () => {
    console.log('error');
  };
  function validatePassword(text) {
    console.log(text);
    if (text.length > 0) {
      if (text.match(/[^A-Za-z 0-9]/g)) {
        setBarT(true);
      } else {
        setBarT(false);
      }
      if (text.match(/[A-Z]/)) {
        // setBar(bar + 1)

        setBar(true);
      } else {
        setBar(false);
      }
      if (text.match(/[0-9]/)) {
        setBarTh(true);
      } else {
        setBarTh(false);
      }
      if (text.length >= 8) {
        setBarF(true);
        return false;
      } else {
        setBarF(false);
      }
      return false;
    } else {
      setBar(false);
      setBarT(false);
      setBarTh(false);
      setBarF(false);
    }
  }
  const showPass = e => {
    e.preventDefault();
    setPassword(!showPassword);
  };

  const updatepassword = async () => {
    var strongRegex = new RegExp(
      '(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    let validationn = strongRegex.test(pass);
    setLoader(true);

    if (validationn && pass != '') {
      const Details = {
        password: pass,
      };
      const headers = {
        Accept: 'application/json, text/plain',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await editPasswords(Details, headers)
        .then(respons => {
          if (respons.data.succeeded) {
            setLoader(false);
            // passwordChanged();
            MessageAction('success', t("messages.updatedSuccessfully"));
            props.navigation.navigate('Login');
          } else {
            setLoader(false);
            // Alert.alert('ChangePassword Alert', response.data.errors[0], [
            //   {text: 'OK'},
            // ]);
          }
        })
        .catch(err => {
          setLoader(false);
          console.log('err', err);
        });
    } else {
      setLoader(false);
      MessageAction(
        'error',
        'Password should contain 8 characters must include 1 special character,1 upper case,1 number',
      );
      // alert(
      //   'Password should contain 8 characters must include 1 special character,1 upper case,1 number',
      // );
    }
  };

  useEffect(() => {
    getOtp();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <Text
              style={styles.backH}
              onPress={() => props.navigation.goBack()}>
              <Icon name="angle-left" color={'#ffff'} size={24} />
            </Text>
          </View>
          <View>
            <Text style={styles.header}>Reset Password</Text>
          </View>

          <View>
            <Image source={hedaer} style={styles.imageH} />
          </View>
          <View>
            <Text style={styles.forgetPass}> Set Your Password</Text>
          </View>
          <View>
            <ReactNativeInput
              style={styles.input}
              onChangeText={text => onChangeNumber(text)}
              value={pass}
              placeholder="Enter Password"
              secureTextEntry={showPassword ? false : true}
              selectionColor="black"
              // keyboardType="numeric"
            />

            {showPassword === true ? (
              <MaterialCommunityIcons
                name="eye"
                color="grey"
                size={28}
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  bottom: 16,
                  right: 30,
                }}
                onPress={showPass}
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-off"
                color="grey"
                size={28}
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  bottom: 16,
                  right: 30,
                }}
                onPress={showPass}
              />
            )}
          </View>
          <View style={styles.colors}>
            <Text style={bar === true ? styles.opacity : styles.without}></Text>
            <Text
              style={barT === true ? styles.opacity : styles.without}></Text>
            <Text
              style={barTh === true ? styles.opacity : styles.without}></Text>
            <Text
              style={barF === true ? styles.opacity : styles.without}></Text>
          </View>

          <View style={styles.validation}>
            <View>
              <Text style={styles.validationText}>&#9679; 8+ Characters</Text>
              <Text style={styles.validationText}>
                &#9679; 1 Special Character
              </Text>
            </View>
            <View>
              <Text style={styles.validationTextm}>&#9679; 1 Uppercase</Text>
              <Text style={styles.validationTextm}>&#9679; 1 Number</Text>
            </View>
          </View>
          <View>
            <LinearButton
              loader={loader}
              enter={updatepassword}
              title="Reset Password"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backH: {
    marginTop: 20,
    marginLeft: 10,
  },
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 5,
    fontFamily: 'Rubik',
  },
  imageH: {
    // height: '60%',
    width: '80%',
    // marginTop: '-40%'
    height: 60,
    marginLeft: 30,
    // alignItems: 'center'
    marginTop: '15%',
  },
  input: {
    // height: 40,
    // width: 350,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    minHeight: 42,
    padding: 13,
    margin: 2,
    fontFamily: 'Rubik',
    marginTop: 20,
  },
  forgetPass: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    padding: 3,
    paddingTop: 65,
  },
  colors: {
    flexDirection: 'row',
    marginTop: 10,
    width: width - 50,

    alignSelf: 'center',
    justifyContent: 'center',
  },
  colorI: {
    borderWidth: 1,

    backgroundColor: '#EA1B91',
    borderRadius: 5,
    paddingLeft: 45,
    paddingRight: 45,
    height: 10,
    opacity: 0.5,
  },

  validation: {
    flexDirection: 'row',
    // justifyContent: 'center',
    padding: '4%',
    justifyContent: 'space-around',
  },
  validationText: {
    color: 'grey',
    fontSize: 16,
    paddingLeft: 0,
    padding: 5,
    fontFamily: 'Rubik',
  },
  validationTextm: {
    color: 'grey',
    fontSize: 16,
    paddingLeft: 0,
    padding: 5,
    fontFamily: 'Rubik',
  },
  opacity: {
    borderWidth: 1,

    backgroundColor: '#EA1B91',
    borderRadius: 5,
    paddingHorizontal: '12%',
    height: 10,
    opacity: 1,
  },
  without: {
    borderWidth: 1,
    backgroundColor: '#EA1B91',
    borderRadius: 5,
    paddingHorizontal: '12%',
    height: 10,
    opacity: 0.5,
  },
  terms: {
    color: '#ffff',
    opacity: 1,
    fontFamily: 'Rubik',
    paddingBottom: 24,
    paddingTop: 5,
    fontSize: 20,
  },
});

export default ResetPassword;
