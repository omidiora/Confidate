import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useEffect, createRef, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {addContacts, updateContacts} from '../../API/listApisServices';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
// import PhoneInput from 'react-native-phone-number-input';
import {useSelector} from 'react-redux';
import {Message, MessageAction} from '../../components/commonHelper';
import ReactNativePaperInput from '../../components/ReactNativePaperInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {isPossiblePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js';
import parsePhoneNumber from 'libphonenumber-js';
// import IntlPhoneInput from 'react-native-intl-phone-input';
import PhoneInput from 'react-native-phone-input';
// import {isValidPhoneNumber} from 'react-phone-number-input';
import data from './Countries';
import { useTranslation } from 'react-i18next';

const {width} = Dimensions.get('window');
function AddEditContacts({navigation, route}) {
  let dataKeyE = route.params;
  let dataEdit = dataKeyE ? dataKeyE.text : '';
  let dataKeyF = dataKeyE ? dataKeyE.bol : false;
  const { t } = useTranslation();
  const [edit, setEdit] = useState(dataKeyF ? false : true);
  const [dataValues, setDateValues] = useState(route);
  const [stateUp, setSatetUP] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const editNumber = useRef(null);
  const [countryCode, setCountryCode] = useState('TR');

  const [formattedValue, setFormattedValue] = useState('');

  let token = useSelector(state => state.userLogin.user);
  let userId = token?.user?.id
  const [loader, setLoader] = useState(false);
  const headers = {
    Accept: 'application/json, text/plain',
    Authorization: `Bearer ${token.token}`,
    'Content-Type': 'application/json',
  };
  const [info, setInfo] = useState({
    name: '',
    mobile: '',
    id: '',
  });

  // alert(JSON.stringify(info))
  const phoneInput = useRef('');

  const nameChange = text => {
    if (text.length <= 20) {
      let dataN = {...info};
      dataN.name = text;
      setInfo(dataN);
    } else {
      Message('info', t('messages.Max20'));
    }
  };

  let regexp = /^[0-9\b]+$/;
  var pattern = /^\(\d{3}\)\s*\d{3}(?:-|\s*)\d{4}$/;
  const reg = /^[0]?[789]\d{9}$/;
  const mobileChange = number => {
    let dataN = {...info};
    dataN.mobile = number;
    // console.log(phoneInput.current.isValidNumber());

    // isNumber(number);
    // validate(number);
    // if (dataN.mobile.length > 1)
    // phonenumberTest(number);
    // isValidPhoneNumber(number);

    if ('') {
      Message('info', t('messages.PleaseEnterNumbers'));
    } else {
      if (number.length <= 15) {
        setInfo(dataN);
      } else {
        Message('info', ' Only 15 digits allowed');
      }
    }
  };

  useEffect(() => {
    if (dataKeyF) {
      setInfo(info => ({
        ...info,
        name: dataEdit ? dataEdit.name : '',
        mobile: dataEdit ? dataEdit.phoneNumber : '',
        id: dataEdit ? dataEdit.id : '',
      }));
      phoneInput.current.setValue(dataEdit.phoneNumber);
      // setFormattedValue('');
      setFormattedValue(dataEdit.phoneNumber);
      // setCountryCode(phoneInput.current.getCountryCode(formattedValue));
    } else {
      // phoneInput?.current.setValue({});
    }
  }, [navigation, dataEdit, check, phoneInput]);
  useEffect(() => {
    if (dataKeyF) {
    } else {
      // phoneInput.current.setValue({});
    }
  }, []);

  const back = () => {
    navigation.goBack();
    setName({name: '', mobile: ''});
    setShowValue(!showValue);
  };

  const goBack = () => {
    setLoader(false);
    // Message('success', t("messages.contactAdded"));
     navigation.goBack();
    setInfo({name: '', mobile: ''});
    setFormattedValue('');
    setShowValue(!showValue);
    setSatetUP(false);
    setEdit(false);
    // phoneInput?.current.setValue(null);
    phoneInput.current.setValue('+90');
  };

  // console.log('country', phoneInput.current.setValue('xxxxxxx'), info.mobile);

  let check = '';
  const save = e => {
    e.preventDefault();

    setLoader(true);

    var checkValid = phoneInput.current.isValidNumber(info.mobile);
    // let data =
    //   dataKeyF === true
    //     ? isValidPhoneNumber(editNumber)

    console.log(
      'ref',
      // isValidPhoneNumber(formattedValue),

      // phoneInput.current,
      // JSON.stringify(editNumber),
      info.mobile,
      checkValid,
      dataKeyF,
    );

    if (info.name) {
      if (info.mobile.length > 0) {
        if (checkValid) {
          if (dataKeyF === true) {
            const details = {
              id: info.id,
              phoneNumber: info.mobile,
              name: info.name,
            };

            updateContacts(details, headers)
              .then(rep => {
                if (rep.data.succeeded) {
                  setLoader(false);
                  // updateAlert()
                  Message('success', t('messages.contactUpdated'));

                  setInfo({name: '', mobile: ''});
                  phoneInput.current.setValue('+90');

                  navigation.navigate('EmergencyContacts');
                } else {
                  setLoader(false);
                  Message(rep.data ? rep.data.errors[0] : '');
                }
              })
              .catch(err => {
                setLoader(false);
                // alert(err);
                console.log('err', err);
              });
          } else {
            const details = {
              number: info.mobile,
              name: info.name,
              userID : userId.toString()
            };
            // console.log('details', details);
            addContacts(details, headers)
              .then(response => {
                console.log(response)
                if (response) {
                  setLoader(false);
                  goBack()
                  sucessAlert();
                  Message('success', t("messages.contactAdded"));
                  // navigation.navigate('EmergencyContacts');
                  setInfo({name: '', mobile: ''});
                  setFormattedValue(null);
                  setEdit(false);
                  phoneInput.current.setValue('+90');
                  phoneInput.current.setValue('');
                  // clearText()
                } else {
                  setLoader(false);
                  Message(
                    'error',
                    response.data ? response.data.errors[0] : '',
                  );
                }

                responseresult =JSON.parse(responseresult)
                console.log('rep---', response.data);
              })
              .catch(err => {
                setLoader(false);
                // alert(err);
                console.log('err', err);
              });
          }
        } else {
          setLoader(false);
          Message(
            'error',
            'Mobile number is invalid so please check the number',
          );
        }
      } else {
        setLoader(false);
        Message('error', t("messages.mobileNumber"));
      }
    } else {
      setLoader(false);
      Message('error', t("messages.contactName"));
    }
  };
  const goHome = () => {
    // alert('Muneer');
    navigation.navigate('HomeScreenStack');
    setLoader(false);

    setInfo({name: '', mobile: ''});
    setFormattedValue('');
    setShowValue(!showValue);
    setSatetUP(false);
    setEdit(false);
    phoneInput.current.setValue('+90');
  };
  const [numberChange, setNumberChange] = useState();
  const onPhoneInputChange = (value, iso2) => {
    const newState = {
      phoneInputValue: value,
    };
    if (iso2) {
      newState.countryCode = iso2?.toUpperCase();
    }

    console.log('new', newState, value);

    if ('') {
      Message('info', t('messages.PleaseEnterNumbers'));
    } else {
      if (value.length <= 15) {
        let values = {...info};
        values.mobile = value;
        setInfo(values);
      } else {
        Message('info', ' Only 15 digits allowed');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <AppHeader title={dataKeyE.title} goBack={goBack} goHome={goHome} />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder={t("messages.contactName")}
              placeholderTextColor="grey"
              // keyboardType="text"
              value={info?.name}
              maxLength={12}
              onChangeText={nameChange}
              clearButtonMode="always"
            />

            <View style={styles.input}>
              <View>
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
                    placeholder: t('messages.Enterphone'),
                  }}
                  textStyle={{
                    color: '#fff',
                  }}
                  onChangePhoneNumber={onPhoneInputChange}
                />
              </View>
            </View>

            <View></View>
          </View>
        </View>
        {dataKeyF === true ? (
          <View>
            <Text
              style={{
                color: 'grey',
                textAlign: 'center',
                fontSize: 16,
                marginVertical: '6%',
              }}>
              Please Check the Correct Country Code Before Updating the Number
            </Text>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
      <View
        style={{
          marginVertical: '15%',
          marginHorizontal: '2%',
          position: 'absolute',
          bottom: '0%',
          top: '70%',
          width: width - 10,
        }}>
        <Button
          title={dataKeyF === true ? 'Update' : 'Save'}
          submit={save}
          loader={loader}
          disabled={loader}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  input: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    color: 'white',
    // padding: 3,
    marginTop: 15,
    // paddingLeft: 5,
    height: 55,
  },
  inputBox: {
    marginTop: 0,
  },
  list: {
    padding: 5,
  },
  listC: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  edit: {
    marginRight: 20,
    paddingTop: 10,
  },
  phoneInput: {
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 0,
    color: '#ffff',
    backgroundColor: 'black',
    width: '100%',
  },
});
export default AddEditContacts;
