import React, {useState, useEffect, memo, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import registered from '../../../assets/images/register.png';
import hedaer from '../../../assets/images/hedare.png';
import {useSelector, useDispatch} from 'react-redux';
import {post} from '../../API/adduser.Service';
import LinearButton from '../../components/LinearButton';
import axios from 'axios';
import {BASE_URL, REQUEST_OTP} from '../../API/constants';
// import PhoneInput from 'react-native-phone-number-input';
import PhoneInput from 'react-native-phone-input';
import IntlPhoneInput from 'react-native-intl-phone-input';
import ReactNativeInput from '../../components/ReactNativeInput';
let {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {MessageAction, Message} from '../../components/commonHelper';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({navigation}) {
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [bar, setBar] = useState(false);
  const [barT, setBarT] = useState(false);
  const [barTh, setBarTh] = useState(false);
  const [barF, setBarF] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showPassword, setPassword] = useState(false);
  const [responseData, setresponseData] = useState('');

  const [loader, setLoader] = useState(false);
  const phoneInput = useRef(null);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const showPass = e => {
    e.preventDefault();
    setPassword(!showPassword);
  };
  const [registerDetails, setRegisterDetails] = useState({
    mobile: '',
    email: '',
    password: '',
  });

  let regexp = /^[0-9\b]+$/;
  const error = () => {
    console.log('eer');
  };

  const onChange = (text, name) => {
    if (name === 'Email') {
      let userEmail = {...registerDetails};
      userEmail.email = text.trim();
      setRegisterDetails(userEmail);
    } else if (name === 'Pass') {
      let userPassword = {...registerDetails};
      userPassword.password = text.trim();
      setRegisterDetails(userPassword);
      let add = validatePassword(userPassword.password);
    } else if (name == 'Number') {
      if (text.length <= 10) {
        let dataN = {...registerDetails};
        dataN.mobile = text;
        if (dataN.mobile === '' || regexp.test(dataN.mobile))
          setRegisterDetails(dataN);
      } else {
        MessageAction('info', 'Maximum 10 Numbers  allowed');
        // alert('Maximum 10 Numbers  allowed');
      }
    }
  };
  // alert(formattedValue);
  const onPhoneInputChange = (value, iso2) => {
    const newState = {
      phoneInputValue: value,
    };
    if (iso2) {
      newState.countryCode = iso2?.toUpperCase();
    }

    console.log('new', newState, value);

    if ('') {
      Message('info', 'Please Enter Numbers only');
    } else {
      if (value.length <= 14) {
        let values = {...registerDetails};
        values.mobile = value;
        setRegisterDetails(values);
      } else {
        Message('info', ' Only 10 digits allowed');
      }
    }
  };

  function validatePassword(text) {
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

  const validateEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

    return re.test(email);
  };

  const register = async e => {
    e.preventDefault();
    console.log('check', registerDetails);
    setLoader(!loader);

    let validate = validateEmail(registerDetails.email);
    var strongRegex = new RegExp(
      '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    let validationn = strongRegex.test(registerDetails.password);
    const checkValid = phoneInput.current.isValidNumber(registerDetails.mobile);
    if (registerDetails.email != '') {
      if (validate) {
        if (registerDetails.mobile != '') {
          if (registerDetails.password != '') {
            if (checkValid) {
              if (validationn && registerDetails.password != '') {
                if (toggleCheckBox) {
                  const details = {
                    email: registerDetails.email,
                    password: registerDetails.password,
                    mobile: Number(registerDetails.mobile),
                  };

                  console.log('register', details);
                  await post(details)
                    .then(response => {
                      let dataResponse = response.data;
                      setLoader(false);
                      console.log(dataResponse, 'resp');
                      if (dataResponse.message === "User created") {
                        AsyncStorage.setItem('user1', JSON.stringify(dataResponse)).then((res)=>{
                          console.log("res",res)
                          setLoader(false);
                        })
                        navigation.navigate('VerfiyOtp', {
                          title: 'Verify Email Id?',
                          key: registerDetails.email,
                        });
                        setRegisterDetails({
                          email: '',
                          password: '',
                          mobile: '',
                        });
                        // setFormattedValue('');
                        setBar(false);
                        setBarT(false);
                        setBarTh(false);
                        setBarF(false);
                        setToggleCheckBox(false);
                        phoneInput.current.setValue('+90');
                      } else {
                        setLoader(false);

                        if (dataResponse.message.toString() === 'Email already taken') {
                          MessageAction(
                            'info',
                            t("messages.alreadyExist"),
                          );
                          // alert('User already registerd so please login');
                        } else {
                          dataResponse.errors
                            ? // alert(dataResponse.errors[0])
                              MessageAction('error', dataResponse.errors[0])
                            : '';
                        }
                      }
                    })
                    .catch(err => {
                      console.log('error');
                      setLoader(false);
                    });
                } else {
                  setLoader(false);
                  MessageAction('error', t("messages.pleaseAgree"));
                  // alert('Please Agree Terms and Conditions');
                }
              } else {
                setLoader(false);
                MessageAction(
                  'error',
                  t("messages.passwordErr"),
                );
                // alert(
                //   'Password should contain 8 characters must include 1 special character,1 upper case,1 number',
                // );
              }
            } else {
              setLoader(false);
              MessageAction(
                'error',
                t("messages.mobileNumberErr"),
              );
              // alert('Mobile number is invalid ,Please enter valid number');
            }
          } else {
            setLoader(false);
            MessageAction('error',  t("messages.missingPassword"));
            // alert('Enter  Password');
          }
        } else {
          setLoader(false);
          MessageAction('error', t("messages.numberErr"));
          // alert('Enter Mobile Number');
        }
      } else {
        setLoader(false);
        MessageAction('error',  t("messages.validEmail"));
        // alert('Enter  Email');
      }
    } else {
      setLoader(false);
      MessageAction('error', t("messages.email"));
    }
  };

  useEffect(() => {}, [loader, registerDetails]);

  const onChangeTextMobile = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) => {
    console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
  };
  const { t, i18n } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* {showMessage && (
            <View style={{backgroundColor:'white'}}>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? "true" : "false"}</Text>
            </View>
          )} */}
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image source={registered} style={styles.image} />
          </View>
          <View>
            <Image source={hedaer} style={styles.imageH} />
          </View>
          <View>
            <ReactNativeInput
              style={styles.input}
              onChangeText={text => onChange(text, 'Email')}
              value={registerDetails.email}
              placeholder={t('login.email')}
              selectionColor="black"
              // keyboardType="numeric"
            />
            <View
              style={{
                marginHorizontal: '9.8%',
                marginVertical: '2%',
                backgroundColor: '#ffff',
                borderRadius: 10,
                borderWidth: 1,
              }}>
              <PhoneInput
                ref={phoneInput}
                initialCountry="tr"
                allowZeroAfterCountryCode={false}
                flagStyle={{
                  height: 52,
                  width: wp('18%'),
                  borderRadius: 8,
                }}
                style={{
                  color: 'red',
                  // padding: '4%',
                }}
                textProps={{
                  placeholder: 'Enter a phone number...',
                }}
                textStyle={{
                  color: 'black',
                }}
                onChangePhoneNumber={onPhoneInputChange}
              />
            </View>
            {/* <TouchableOpacity
            // style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
            }}
          >
            <Text style={{color:'red'}}>Check</Text>
          </TouchableOpacity> */}

            {/* <TextInput
                        style={styles.input}
                        onChangeText={(text)=> onChange(text,'Number')}
                        value={registerDetails.mobile}
                        placeholder="Mobile Number "
                        keyboardType={"numeric"}
                        // maxLength={11}
                    // keyboardType="numeric"
                    /> */}
            <View>
              <ReactNativeInput
                style={styles.input}
                onChangeText={text => onChange(text, 'Pass')}
                value={registerDetails.password}
                placeholder={t('login.password')}
                secureTextEntry={showPassword ? false : true}
                selectionColor="black"
                // keyboardType="numeric"
              />
              {showPassword === true ? (
                <MaterialCommunityIcons
                  name="eye"
                  color="grey"
                  size={28}
                  style={styles.eyeHide}
                  onPress={showPass}
                />
              ) : (
                <MaterialCommunityIcons
                  name="eye-off"
                  color="grey"
                  size={28}
                  style={styles.eyeHide}
                  onPress={showPass}
                />
              )}
            </View>

            <View style={styles.colors}>
              <Text
                style={bar === true ? styles.opacity : styles.without}></Text>
              <Text
                style={barT === true ? styles.opacity : styles.without}></Text>
              <Text
                style={barTh === true ? styles.opacity : styles.without}></Text>
              <Text
                style={barF === true ? styles.opacity : styles.without}></Text>
            </View>

            <View style={styles.validation}>
              <View>
                <Text style={styles.validationText}>&#9679; {t('signup.characters')}</Text>
                <Text style={styles.validationText}>
                  &#9679; {t('signup.specialCharacter')}
                </Text>
              </View>
              <View>
                <Text style={styles.validationTextm}>&#9679; {t('signup.uppercase')}</Text>
                <Text style={styles.validationTextm}>&#9679; {t('signup.number')}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: '7%',
              }}>
              <CheckBox
                onTintColor="#fffff"
                onCheckColor="#fffff"
                tintColors={{true: '#EA1B91', false: '#EA1B91'}}
                // disabled={false}
                style={{marginTop: '0.1%'}}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text
                style={styles.terms}
                onPress={() => navigation.navigate('TermsandConditions')}>
                {' '}
                {t('signup.termsConditions')}
              </Text>
            </View>
          </View>
          <View>
            <LinearButton enter={register} loader={loader} title={t('login.signUp')} />
            <Text
              style={{
                color: 'grey',
                fontSize: 14,
                fontFamily: 'Rubik',
                textAlign: 'center',
                marginVertical: '3%',
              }}>
              Have an Account?{' '}
              <Text
                style={{color: '#EA1B91', opacity: 1}}
                onPress={() => navigation.navigate('Login')}>
                {t('login.login')}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B090A',
    fontFamily: 'Rubik',
    flex: 1,
  },
  image: {
    marginTop: '8%',
    marginBottom: '3%',
    marginHorizontal: wp('10%'),
  },
  imageH: {
    width: '75%',
    height: 70,
    alignSelf: 'center',
    marginBottom: '2%',
  },
  input: {
    width: '82%',
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    minHeight: 42,
    padding: 15,
    margin: 2,
    fontFamily: 'Rubik',
    alignSelf: 'center',
    color: 'black',
  },
  mobileNumber: {
    height: '10%',
  },
  eyeHide: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 18,
    right: 50,
  },
  colors: {
    flexDirection: 'row',
    marginTop: '3%',
    alignSelf: 'center',
  },
  button: {
    marginLeft: -3,
  },
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
  validation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '4%',
    // width:width-50,
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
  colorI: {
    borderWidth: 1,

    backgroundColor: '#EA1B91',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    height: 10,
    opacity: 0.5,
  },
  opacity: {
    borderWidth: 1,

    backgroundColor: '#EA1B91',
    borderRadius: 5,
    paddingHorizontal: '10%',
    height: 10,
    opacity: 1,
  },
  without: {
    borderWidth: 1,

    backgroundColor: '#EA1B91',
    borderRadius: 5,
    paddingHorizontal: '10%',
    height: 10,
    opacity: 0.5,
  },
  terms: {
    color: '#ffff',
    opacity: 1,
    fontFamily: 'Rubik',
    paddingBottom: '4%',
    paddingTop: '1%',
    // paddingRight:'16%',
    fontSize: 18,

    textDecorationLine: 'underline',
  },
  phoneInput: {
    borderRadius: 10,
    // minHeight:42,
    paddingVertical: '2.4%',
    paddingHorizontal: '4.5%',
    marginTop: 0,
    marginBottom: 0,
    color: 'black',
    // padding:'-10%',
  },
});

export default memo(Register);
