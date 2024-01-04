import React, {useState, createRef, useEffect, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import loginImage from '../../../assets/images/loginImage.png';
import hedaer from '../../../assets/images/hedare.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {login, loginSuccess} from '../../redux/actions/login/login.action';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LineraButton from '../../components/LinearButton';
import ReactNativeInput from '../../components/ReactNativeInput';
import {Message, MessageAction} from '../../components/commonHelper.js';
let {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getUserDeatils} from '../../redux/actions/getUser/getUser.action';
import {Button, TouchableRipple} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

function Login({navigation}) {
  // const navigation = useNavigation();
  const [userName, setUserName] = useState({
    user: '',
    password: '',
  });
  const passwordInputRef = createRef();
  const dispatch = useDispatch();
  const userInputRef = createRef();
  const [showPassword, setPassword] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [loader, setLoader] = useState(false);
  // const [emailVal ,setEmail] = useState()
  const [final, setFinal] = useState([]);
  const onChangeUserName = text => {
    let userNam = {...userName};
    userNam.user = text.trim();
    setUserName(userNam);
  };
  const validateEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

    return re.test(email);
  };
  let emailVal;
  const { t, i18n } = useTranslation();
  const onChangePassword = text => {
    let userPass = userName;
    userPass.password = text.trim();
    setUserName(userPass);
    validateEmail(text);
  };

  const submitUser = params => {
    return dispatch(login(params));
  };
  const error = () => {
    console.log('err');
  };

  const loginSubmitt = e => {
    e.preventDefault();
    setLoader(true);

    let validatemail = validateEmail(userName.user);
    const detailsData = {
      email: userName.user,
      password: userName.password,
    };
    if (userName.user && userName.password) {
      if (validatemail === true) {
        const headers = {
          'Content-Type': 'application/json',
          accept: 'application/json',
        };

        submitUser(detailsData)
          .then(async response => {
            if(response.data.token){
              let  dataValue = JSON.stringify(response.data);
              await AsyncStorage.setItem('user', dataValue);
              MessageAction('success', t("login.successfullyLogin"));
              // StackActions.replace('Route')
              setLoader(false);
              dispatch(getUserDeatils(response.data.user.email));
              // setResponseData(response.data);
            }
            else{
              setLoader(false);
              MessageAction('error');
            }
            // if (
            //   response.data.succeeded &&
            //   response.data.data.roles[0] === 'User'
            // ) {
            //   let dataValue = JSON.stringify(response);
            //   await AsyncStorage.setItem('user', dataValue);
            //   dispatch(getUserDeatils(response.data.data.token));
            //   setResponseData(dataValue);
            //   setLoader(false);
            //   setUserName({user: '', password: ''});
            //   MessageAction('success', 'Successfully login!', error);
            //   // userInputRef.current.clear();
            //   // passwordInputRef.current.clear();

            //   // navigation.replace('Route')
            //   // Message('success', 'Login Successfull');
            // } else {
            //   setLoader(false);
            //   if (response.data.errors[0] === 'INVALID_LOGINS') {
            //     MessageAction('error', 'Invalid Email or Password', error);
            //     // alert('Invalid Email or Password');
            //   } else if (response.data.errors.toString() === 'INVALID_USER') {
            //     // alert(response.data.errors[0]);
            //     MessageAction(
            //       'error',
            //       'User Not Found Please Register and Login',
            //       error,
            //     );
            //     // alert('User Not Found Please Register and Login');
            //     setLoader(false);
            //   } else {
            //     MessageAction('error', response.data.errors[0], error);
            //     alert(response.data.errors[0]);
            //     // setLoader(false);
            //   }
            // }
          })
          .catch(err => {
            setLoader(false);
            console.log('err', err);
            MessageAction('error', t('login.pleaseTryAgain'), error);

          });
      } else {
        setLoader(false);
        MessageAction('error', 'Enter Correct email', error);
        // alert('Enter Correct email');
      }
    } else if (userName.user === '') {
      setLoader(false);
      MessageAction('error', t("messages.missingEmail"), error);
      // alert('Please Enter Your User Email');
    } else if (userName.password === '') {
      setLoader(false);
      // alert('Please Enter Your  Password');
      MessageAction('error', t("messages.missingPassword"), error);
    }
  };
  const showPass = e => {
    e.preventDefault();
    setPassword(!showPassword);
  };


  const forgetPassword = () => {
    navigation.navigate('ForgetPassword');
    setUserName({user: '', password: ''});
    // alert(JSON.stringify(userInputRef.current));
    userName.name != null ? userInputRef.current.clear() : null;
    // passwordInputRef.current.clear();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUserName({user: '', password: ''});
      // userInputRef.current.clear();
      // passwordInputRef.current.clear();
    });
    return unsubscribe;
  }, [navigation]);
  // useEffect(() => {}, [userName]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={loginImage}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View>
              <Image source={hedaer} style={styles.imageH} />
            </View>
            <View style={{marginTop: '10%'}}>
              <ReactNativeInput
                ref={userInputRef}
                style={styles.input}
                onChangeText={onChangeUserName}
                Value={userName.name}
                placeholder={t('login.email')}
                selectionColor="black"
                // keyboardType="numeric"
              />
              <ReactNativeInput
                ref={passwordInputRef}
                style={styles.input}
                onChangeText={onChangePassword}
                Value={userName.password}
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

              <Text style={styles.forgetPassword} onPress={forgetPassword}>
                {' '}
                {t('login.forgotPassword')}
              </Text>
            </View>
            <View>
              <LineraButton
                title={t('login.login')}
                loader={loader}
                enter={loginSubmitt}
              />
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  fontFamily: 'Rubik',
                  textAlign: 'center',
                  marginVertical: '3%',
                }}>
                 
                   {t('login.donthaveaccount')} {' '} 
                <Text
                  style={{color: '#B0156D', opacity: 1}}
                  onPress={() => navigation.navigate('Register')}>
                  {t('login.signUp')}
                </Text>
              </Text>
            </View>
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
    // width: width - wp('54.8%'),
    // height: height - hp('64%'),
    // height: height-550/1.7,
    // marginVertical: '8%',

    marginVertical: wp('6%'),
  },
  imageH: {
    width: '75%',
    height: 70,
    alignSelf: 'center',
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
  forgetPassword: {
    color: '#B0156D',
    alignSelf: 'flex-end',
    marginRight: '7.5%',
    opacity: 1,
    fontFamily: 'Rubik',
    paddingBottom: '8%',
    paddingTop: '1%',
  },
  textHeader: {
    color: '#EA1B91',
    fontFamily: 'Rubik',
    textAlign: 'center',
    marginTop: '-15%',
    fontSize: 28,
    fontWeight: 'bold',
  },

  eyeHide: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 70,
    right: 50,
  },
});

export default Login;

