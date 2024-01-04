import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import Geolocation from '@react-native-community/geolocation';
import AppHeader from '../../components/AppHeader';
import i18next, { t } from "i18next";

let timer = () => { };
class PracticeMode extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    showWave: false,
    timeLeft: 10,
    timerFlag: false,
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  componentDidMount() {
    console.log(this.state.props, 'name >>>');
    Geolocation.getCurrentPosition(info =>
      console.log(info, 'info location >>>>>'),
    );
  }

  _hello = () => {
    alert('hello ganesh');
  };

  onSpeechStart = e => {
    this._startTimer();
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = e => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    this._startTimer();
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  goBack = () => {
    console.log('ganesh >>>');
    this.props.navigation.goBack();
    // console.log(this.props,"props");
  };

  goHome = () => {
    this.props.navigation.navigate('HomeScreenStack');
  };

  onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.newTimer();
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      showWave: true,
      timerFlag: true,
    });

    try {
      const value = await Voice.start(i18next?.language == 'tr' ? 'tr-TR' : "en-US");
      console.log(value, 'ldldlldld');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  showToast = () => {
    ToastAndroid.show(
      t("messages.passcodeAdded"),
      ToastAndroid.SHORT,
    );
  };

  showToastNot = () => {
    ToastAndroid.show(t('voicePasscode.PlsAddPasscode'), ToastAndroid.SHORT);
  };

  // "Help Me!!   Your location sent to your contacts successfully"

  _confirm = async () => {
    if (this.state.results.length) {
      await AsyncStorage.setItem('practiceCode', this.state.results[0]);
      const dataValue = await AsyncStorage.getItem('practiceCode');
      this.showToast();
      // alert('Voice passcode and Location Successfully sent to your contacts');
      this._destroyRecognizer();
    } else {
      this.showToastNot();
    }
  };
  // _callTimer=()=>{
  //   this._startTimer()
  // }

  _startTimer = () => {
    console.log('calling ganesh ');
    timer = setTimeout(() => {
      if (this.state.timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      this.setState({ timeLeft: this.state.timeLeft - 1 });
      //  setTimeLeft(this.state.timeLeft-1);
    }, 2000);
    return () => clearTimeout(timer);
  };

  _startAgain = () => {
    this.setState({ timeLeft: 10 });
    clearTimeout(timer);
    startTimer();
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      showWave: false,
      timerFlag: false,
    });
  };

  onFinished = () => {
    this._stopRecognizing();
    alert(t("voicePasscode.StoppedRecongnition"));
    this.setState({ timerFlag: false, showWave: false });
  };

  newTimer = () => {
    return (
      <View>
        <CountDown
          until={10}
          size={10}
          onFinish={() => this.onFinished()}
          onPress={() => alert('hello')}
          timeToShow={['S']}
          timeLabels={{ m: null, s: null }}
          digitTxtStyle={{ color: '#fff', fontSize: 14 }}
          digitStyle={{
            backgroundColor: '#333536',
            borderWidth: 2,
            borderColor: '#333536',
          }}
        />
      </View>
    );
  };



  render() {
    return (
      <ImageBackground
        source={require('../../../assets/images/backgroundPasscode.png')}
        style={{
          flex: 1,
        }}>
        <View>
          <View>
            <AppHeader
              title={t("voicePasscode.practiceMode")}
              goBack={this.goBack}
              goHome={this.goHome}
            />
          </View>

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                source={require('../../../assets/images/HeartRate.png')}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'contain',
                }}
              />

              <Image
                source={require('../../../assets/images/timer.png')}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  position: 'absolute',
                  top: 55,
                  left: 152,
                }}
              />

              <Text
                style={{
                  color: 'white',
                  position: 'absolute',
                  top: 55,
                  fontSize: 16,
                }}>
                {this.state.timerFlag ? this.newTimer() : 10}
              </Text>
            </View>

            <Image
              source={
                this.state.showWave
                  ? require('../../../assets/images/wave4.png')
                  : require('../../../assets/images/wave2.png')
              }
              style={{
                width: 370,
                height: 110,
                marginHorizontal: 20,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <TouchableHighlight onPress={this._startRecognizing}>
              <Image
                source={require('../../../assets/images/voiceRecongnition.png')}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  borderRadius: 50,
                }}
              />
            </TouchableHighlight>
            <Text style={{ color: 'grey', marginTop: 8 }}>
            {t("voicePasscode.sayYourVoicePasscode")} 
            </Text>
            {this.state.showWave ? (
              <TouchableOpacity onPress={this._startTimer}></TouchableOpacity>
            ) : null}
          </View>

          <View
            style={{
              marginTop: 70,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: '10%',
                  fontStyle: 'italic',
                  fontSize: 16,
                }}>
             <Text> {t("voicePasscode.yourpassword")} </Text> :{' '}
                <Text style={{ color: 'white' }}>{this.state.results[0]}</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 50,
              }}>
              <TouchableOpacity onPress={this._confirm}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    paddingHorizontal: 30,
                    borderRadius: 35,
                  }}>

                  <Text> {t("voicePasscode.add")}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._destroyRecognizer}>
                <Text
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 35,
                  }}>
                    {t("voicePasscode.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  subContaner: {
    // flex: 1,
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
    color: 'white',
    marginBottom: 1,
  },
  textColor: {
    color: 'white',
  },
  passcode: {
    textAlign: 'center',
    fontSize: 16,
  },
  timer: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'grey',
  },
});

export default PracticeMode;
