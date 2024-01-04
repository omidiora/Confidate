import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import i18next, { t } from 'i18next';
import AppHeader from '../../components/AppHeader';
import CountDown from 'react-native-countdown-component';


function VoiceTest({navigation}) {
  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [userId, setUserId] = useState('');
  const [timerFlag, setTimerFlag] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);



  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
    setTimerFlag(true)
    
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
    setTimerFlag(false)
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    startTimer()
    try {
      await Voice.start('en-US');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  useEffect(() => {
    // console.log(i18next?.language);
    Geolocation.getCurrentPosition((info) =>
      console.log(info, 'info location >>>>>')
    );
    AsyncStorage.getItem('user').then((value) => {
      let res = JSON.parse(value);
      setUserId(res?.user?.id);
    });
  }, []);


  const  goBack = () => {
    console.log("ganesh >>>");
      navigation.goBack();
    // console.log(this.props,"props");
  }



  const goHome = () => {
   navigation.navigate("HomeScreenStack");
  };

  const onFinished = () => {
    _stopRecognizing();
    Alert.alert(t('voicePasscode.StoppedRecongnition'));
    // Assuming timerFlag and showWave are state variables managed elsewhere
    // setTimerFlag(false);
    // setShowWave(false);
  };


  const newTimer = () => {
    return (
      <View>
        <CountDown
          until={10}
          size={10}
          onFinish={() => onFinished()}
          onPress={() => alert("hello")}
          timeToShow={["S"]}
          timeLabels={{ m: null, s: null }}
          digitTxtStyle={{ color: "#fff", fontSize: 14 }}
          digitStyle={{
            backgroundColor: "#333536",
            borderWidth: 2,
            borderColor: "#333536",
          }}
        />
      </View>
    );
  };
  let timer: string | number | NodeJS.Timeout | undefined;
  const startTimer = () => {

    console.log("calling ganesh");
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(prevTime => prevTime - 1);
    }, 2000);

    return () => clearTimeout(timer);
  };


  const confirmAction = async () => {
    const requestOption = {
      userID: JSON.stringify(userId),
      passwordText: "Hello who am i in this world", /* added by gab 21/8 */
      // passwordText: results[0],  /* removed by gab 21/8 */
    };
    try {
      const res = await axios.post('http://44.213.172.99:5000/api/VoicePasswordCreate', requestOption);
      console.log(res.data, 'res >>>>>>');

      await AsyncStorage.setItem('voiceCode', "Hello who am i in this world");
      // await AsyncStorage.setItem('voiceCode', voicePasscode); //added by gab
      // showToast();
      Alert.alert('Voice passcode and Location Successfully sent to your contacts');
      _destroyRecognizer();
    } catch (error) {
      alert('error')
      console.error('Error:', error);
    }
    // if (results.length) {
    //   const voicePasscode = results[0]; /* added by gab  21/8 */
    //   console.log(results[0], 'voice code >>>>>');
    

      
    // } else {
    //   // showToastNot();
    // }
  };
  

  return (
    <ImageBackground
    source={require('../../../assets/images/backgroundPasscode.png')}
    style={{
      flex: 1,
    }}
  >
    <View>
          <View>
            <AppHeader
              title={t("voicePasscode.addYourVoicePasscode")}
              goBack={()=>goBack()}
              goHome={()=>goHome()}
            />
          </View>
          </View>

      
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={require("../../../assets/images/HeartRate.png")}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "contain",
                }}
              />

              <Image
                source={require("../../../assets/images/timer.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  position: "absolute",
                  top: 55,
                  left: 152,
                }}
              />

              <Text
                style={{
                  color: "white",
                  position: "absolute",
                  top: 55,
                  fontSize: 16,
                }}
              >
                {timerFlag ? newTimer() : 10}
              </Text>
            </View>

            <Image
              source={
                showWave
                  ? require("../../../assets/images/wave4.png")
                  : require("../../../assets/images/wave2.png")
              }
              style={{
                width: 370,
                height: 110,
                marginHorizontal: 20,
                resizeMode: "contain",
              }}
            />
          </View>


          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableHighlight onPress={()=>_startRecognizing()}>
              <Image
                source={require("../../../assets/images/voiceRecongnition.png")}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                  borderRadius: 50,
                }}
              />
            </TouchableHighlight>
            <Text style={{ color: "grey", marginTop: 8 }}>
              {t("voicePasscode.addYourVoicePasscode")}
            </Text>
            {showWave ? (
              <TouchableOpacity onPress={startTimer}></TouchableOpacity>
            ) : null}
          </View>

          <View
            style={{
              marginTop: 70,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  // color: '#c334eb',
                  color: "white",
                  marginTop: 50,
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                {t("voicePasscode.yourpassword")} :{" "}
                <Text style={{ color: "white" }}>{results[0]}</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 50,
              }}
            >
              <TouchableOpacity onPress={()=>confirmAction()}>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    paddingHorizontal: 30,
                    borderRadius: 35,
                  }}
                >
                  <Text> {t("voicePasscode.add")}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={_destroyRecognizer}>
                <Text
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 35,
                  }}
                >
                  {t("voicePasscode.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

   


  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default VoiceTest;