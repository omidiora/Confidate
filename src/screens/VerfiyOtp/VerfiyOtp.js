import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import hedaer from '../../../assets/images/hedare.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearButton from '../../components/LinearButton';
import styles from './otpStyles.js';

import {getOtp, verifyOtp} from '../../API/adduser.Service';
import axios from 'axios';
import {BASE_URL, VERIFY_OTP} from '../../API/constants';
import {MessageAction} from '../../components/commonHelper';
import { useTranslation } from 'react-i18next';
const CELL_COUNT = 5;
const RESEND_OTP_TIME_LIMIT = 30;
let resendOtpTimerInterval;
function VerfiyOtp(props) {
  let title = props?.route?.params || 'a';
  let titleHeder = title.title || 'Forget Password?';
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [verify, setVerify] = useState([]);
  // const [resendOtp, setresendOtp] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const { t, i18n } = useTranslation();


  useEffect(()=>{
    AsyncStorage.getItem('user1').then((res)=>{
      setVerify(JSON.parse(res))
    })
  },[])

  const registerdSucess = () => {
    Alert.alert('Registered Alert', 'Registered Successfully', [
      {
        text: 'OK',
        onPress: () => props.navigation.navigate('Login'),
      },
    ]);
  };


  // console.log('verifyOtp', verifyOtp.res.verifiedCode)

  const onSuccess = () => {
    props.navigation.navigate('Login');
  };
  const error = () => {
    console.log('err');
  };
  // const startResendOtpTimer = () => {
  //   if (resendOtpTimerInterval) {
  //     clearInterval(resendOtpTimerInterval);
  //   }
  //   resendOtpTimerInterval = setInterval(() => {
  //     if (resendButtonDisabledTime <= 0) {
  //       clearInterval(resendOtpTimerInterval);
  //     } else {
  //       setResendButtonDisabledTime(resendButtonDisabledTime - 1);
  //     }
  //   }, 1000);
  // };

  // const sendOtp = async () => {
  //   onStratTimer;
  //   if (title.key) {
  //     let emailOtp = {
  //       email: title.key.toLowerCase(),
  //     };
  //     await getOtp(emailOtp)
  //       .then(response => {
  //         console.log('get', response);
  //         if (response.data.succeeded === false) {
  //           MessageAction('error', 'Enter email is not registered');
  //           props.navigation.goBack();
            // Alert.alert(
            //   'Email Alert',
            //   response.data.errors[0] === 'USER_NOT_FOUND'
            //     ? 'User Not Found'
            //     : response.data.errors[0],
            //   [{text: 'OK', onPress: () => props.navigation.goBack()}],
            // );
  //         } else {
  //           MessageAction('success', 'OTP sent to email successfully');
  //         }
  //       })
  //       .catch(err => {
  //         err ? alert(err) : '';
  //       });
  //   }
  // };


  // const [time, setTime] = useState(0);
  // const [startTimer, setStartTimer] = useState(false);
  // const [initialTime, setInitialTime] = useState(30);
  // const onStratTimer = () => {
  //   setStartTimer(true);

  //   setInitialTime(30);
  // };
  // useEffect(() => {
  //   if (initialTime > 0 && startTimer) {
  //     setTimeout(() => {
  //       setInitialTime(initialTime + 1);
  //     }, 1000);
  //   }
  //   console.log('in', initialTime);

  //   if (initialTime === 60) {
  //     console.log('done', initialTime);
  //     setStartTimer(false);
  //   }
  // }, [initialTime, startTimer]);

  // const formatTime = initialTime =>
  //   startTimer
  //     ? `${String(Math.floor(initialTime / 60)).padStart(2, '0')}:${String(
  //         initialTime % 60,
  //       ).padStart(2, '0')}`
  //     : '00:00';
  // const RESET_INTERVAL_S = 30; // 120s = 2m * 60s/m

  // const timeRemain = RESET_INTERVAL_S - (initialTime % RESET_INTERVAL_S);
  // const timerd = formatTime(timeRemain);

  // const resend = () => {
  //   sendOtp();

    // MessageAction('success', 'OTP sent to email successfully', error);
    // alert('OTP sent to email successfully');
    // startResendOtpTimer();
  //   onStratTimer();
  //   setValue('');
  // };
  // useEffect(() => {
  //   onStratTimer();
  //   if (titleHeder != 'Verify Email Id?') {
  //     sendOtp();
  //   }
  // }, []);

  const verifyotp = () => {
    setLoader(true);
    if (value.length === 5) {
      const submit = {
        otp: value,
        id : verify?.res?.id,
        email : verify?.res?.email
        
      };

      verifyOtp(submit)
        .then(async response => {
          let data = response?.data?.data
          if(data?.activateStatus === "true" ){
            MessageAction('success', t('verifyOtp.verifiedSuccessfully'));
            props.navigation.navigate('Login');
            setLoader(false);
          }
          else{
            MessageAction('error', t('verifyOtp.OtpValue'));
            setLoader(false);
          }
          // if (response.data.result) {
          //   if (titleHeder === 'Verify Email Id?') {
          //     // registerdSucess();
          //     MessageAction('success', 'Registered Successfully');

          //     props.navigation.navigate('Login');
          //     setLoader(false);
          //   } else {
          //     props.navigation.navigate('ResetPassword');
          //     let responseOtp = JSON.stringify(response.data.token);
          //     await AsyncStorage.setItem('otp', responseOtp);
          //     setLoader(false);
          //     MessageAction('success', 'OTP verified successfully ');
          //   }
          // } else {
          //   MessageAction('error', 'Enter Correct OTP value', error);
          //   // alert('Enter Correct OTP value');
          //   setLoader(false);
          // }
        })
        .catch(err => {
          
          setLoader(false);
          MessageAction('error', 'Something went wrong');
          console.log('err', err);
        });
    } else {
      setLoader(false);
      MessageAction('error', t('verifyOtp.OtpValue'), error);
      // alert('Enter OTP Value');
    }
  };

  // useEffect(() => {
  //   startResendOtpTimer();
  //   return () => {
  //     if (resendOtpTimerInterval) {
  //       clearInterval(resendOtpTimerInterval);
  //     }
  //   };
  // }, [resendButtonDisabledTime > 0 ? resendButtonDisabledTime : '']);
  // console.log('fal', email.email, value);
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
              <Text style={styles.header}>{t('verifyOtp.verifyOtp')}</Text>
            </View>
          </View>
          <View>
            <Image source={hedaer} style={styles.imageH} />
          </View>
          <View>
            <View>
              <Text style={styles.forgetPass}> {titleHeder}</Text>
              <Text style={styles.foregtPassContent}>
              {t('verifyOtp.digitCode')}
              {' '}
              </Text>
            </View>
            <View>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={text => setValue(text)}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
          </View>
          {/* <View>
            <Text style={styles.timer}>
              {timerd} <Text style={styles.seconds}>{t('verifyOtp.seconds')}</Text>
            </Text>
          </View> */}

          <View style={{marginTop:50}}>
            <LinearButton
              enter={verifyotp}
              loader={loader}
              title={t('verifyOtp.verifyOtp')}
            />
          </View>
          {/* <View>
            <Text style={styles.recive}>
            {t('verifyOtp.receiveOTP')}
              {' '}
              <Text style={styles.resend}>
                {initialTime === 61 ? (
                  <Text style={{opacity: 1, color: '#EA1B91'}} onPress={resend}>
                    {t('verifyOtp.resend')}
                  </Text>
                ) : (
                  <Text style={{opacity: 0.1, color: 'grey'}}>{t('verifyOtp.resend')} </Text>
                )}
              </Text>
            </Text>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default VerfiyOtp;

// import styles from './styles';
