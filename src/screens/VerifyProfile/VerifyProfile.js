import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../../../assets/images/Profile.png';
// import sideBadge from '../../../assets/images/sideBadge.png'
import ImagePicker from 'react-native-image-crop-picker';
import AppHeader from '../../components/AppHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {RNCamera, FaceDetector} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {RNS3} from 'react-native-aws3';
import {useSelector} from 'react-redux';
import ShuftiPro from 'react-native-shuftipro-kyc';
import {MessageAction} from '../../components/commonHelper';
let {height, width} = Dimensions.get('window');
function VerifyProfile(props) {
  const [ImageSource, setImageSoure] = useState([]);
  const [Imageviewarray, setImageSourceviewarray] = useState({});
  const [video, setVideo] = useState({});
  const [loader, setLoader] = useState(false);
  const [imageShow, setImageShow] = useState(false);

  const stateEmail = useSelector(state => state.userInfo.user);
  let mapMail = JSON.stringify(stateEmail);
  mapMail = JSON.parse(mapMail);
  console.log('map', mapMail.data.email);
  const [profilImage, setProfileImage] = useState(mapMail.data.profileImage);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
  const [picUpload, setPicUpload] = useState(false);

  const [{cameraRef}, {takePicture}] = useCamera(null);
  // const cameraRef = useRef(null)

  const selectPic = () => {
    setPicUpload(true);
    setImageShow(false);
  };

  useEffect(() => {}, [profilImage]);
  const [alertMessage, setAlertMessage] = useState('');
  const profileUpdate = () => {};
  const alertMessageFun = alertMess => {
    Alert.alert('Alert', alertMess, [
      {text: 'OK', onPress: () => props.navigation.navigate('Profile')},
    ]);
  };

  const verificationObj = {
    reference: `${mapMail.data != null ? mapMail.data.email : null}`,
    country: 'IN',
    language: 'EN',
    email: `${mapMail.data != null ? mapMail.data.email : null}`,
    callback_url: '',
    // redirect_url: 'http://www.example.com',
    show_consent: 1,
    show_results: 1,
    show_privacy_policy: 0,
    face: true,
  };
  const config = {
    open_webview: false,
  };
  const createdPayload = {};
  const error = () => {
    console.log('err');
  };
  return (
    <ShuftiPro
      requestPayload={{...verificationObj, ...config, ...createdPayload}}
      accessToken={''}
      verificationMode={'image'}
      async={false}
      isShow={true}
      asyncResponseCallback={response => {
        let responsJson = JSON.stringify(response);
        console.log('respo', responsJson.reference, response);
        console.log('sjon');
        if (response.event == 'request.invalid' && response.error) {
          MessageAction('error', response.error.message, error);
          // alert(response.error.message);
          // alertMessageFun(response.error.message);
        } else if (response.event == 'request.timeout') {
          MessageAction('error', 'Time Out', error);
        } else if (response.event == 'request.unauthorized') {
          MessageAction('error', 'Unauthorized Request', error);
          // alert('unauthorized');
        } else if (response.event == 'verification.accepted') {
          MessageAction('sucess', 'Image verified', error);
        } else if (response.event == 'verification.declined') {
          MessageAction('error', response.declined_reason, error);
          // alert(response.declined_reason);
        }
      }}
      onResponseOkayButton={() => {
        props.navigation.navigate('Profile');
      }}
      cancelBtn={() => {
        props.navigation.goBack();
      }}
      basicAuth={{
        client_id:
          'c052ec267c522adf2f1e2406f566d4d93e35db7fb34dff4972392011b9ddf5a6',
        secret_key: 'wTmcomfLxSmZZXSE3ksoFGgkSzb6bOkR',
      }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#000000',
  },

  imageUpload: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    marginHorizontal: '3%',
    marginVertical: '4%',
  },
  withoutUpload: {
    backgroundColor: 'grey',
    borderRadius: 10,
    height: 100,
    width: '25%',
    marginHorizontal: '4%',
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#EA1B91',
    borderRadius: 10,
    borderWidth: 3,
    // padding: 10
    height: 55,
    color: 'white',
    marginBottom: '20%',
    marginHorizontal: '6%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // marginTop: 15
    fontSize: 18,
    paddingVertical: '4%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 600,
  },
});

export default VerifyProfile;
