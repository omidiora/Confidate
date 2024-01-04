import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import hedaer from '../../../assets/images/hedare.png';
import {MessageAction} from '../../components/commonHelper';
import LinearButton from '../../components/LinearButton';
import ReactNativeInput from '../../components/ReactNativeInput';

function ForgetPassword({navigation}) {
  const [number, setNumber] = useState('');
  const [loader, setLoader] = useState(false);
  const validateEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
    return re.test(email);
  };
  const error = () => {
    console.log('err');
  };
  const reset = () => {
    setLoader(true);
    let validate = validateEmail(number);
    if (number) {
      if (validate) {
        setLoader(false);
        navigation.navigate('VerfiyOtp', {
          title: 'Forgot Password ?',
          key: number,
        });
        // MessageAction('success', 'OTP sent to email successfully', error);
      } else {
        setLoader(false);
        // Alert.alert('Email Alert ', ' Enter Correct Email', [{text: 'OK'}]);
        MessageAction('error', t('forgetPassword.correctEmail'), error);
      }
    } else {
      setLoader(false);
      MessageAction('error', t('forgetPassword.correctEmail'), error);
    }
  };
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.backH} onPress={() => navigation.goBack()}>
            <Icon name="angle-left" color={'#ffff'} size={24} />
          </Text>
        </View>
        <View>
          <Text style={styles.header}>{t('forgetPassword.passwordRecovery')}</Text>
        </View>
        <View>
          <Image source={hedaer} style={styles.imageH} />
        </View>
        <View>
          <View>
            <Text style={styles.forgetPass}>{t('forgetPassword.forgotPassword')} </Text>
            <Text style={styles.foregtPassContent}>
            {t('forgetPassword.emailAccount')}
            </Text>
          </View>
          <View>
            <ReactNativeInput
              style={styles.input}
              onChangeText={text => {
                setNumber(text);
              }}
              value={number}
              placeholder={t('login.email')}
              selectionColor="black"
              // keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{marginTop: '10%'}}>
          <LinearButton loader={loader} enter={reset} title={t('forgetPassword.resetPassword')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  backH: {
    marginVertical: '3%',
    marginLeft: '2%',
  },
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  imageH: {
    width: '75%',
    height: 70,
    alignSelf: 'center',
    marginVertical: '10%',
  },
  forgetPass: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    padding: 3,
  },
  foregtPassContent: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 16,
    marginTop: '2%',
    marginBottom: '6%',
    marginHorizontal: '10%',
  },
  input: {
    width: '85%',
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    minHeight: 42,
    padding: 13,
    margin: 2,
    fontFamily: 'Rubik',
    alignSelf: 'center',
  },
});
export default ForgetPassword;
