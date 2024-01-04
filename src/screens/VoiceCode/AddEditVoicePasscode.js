import React, { Component } from "react";
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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import i18next from "i18next";

let timer = () => { };
class AddEditVoicePasscode extends Component {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    showWave: false,
    timeLeft: 30,
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
    Geolocation.getCurrentPosition((info) =>
      console.log(info, "info location >>>>>")
    );
  }

  onSpeechStart = (e) => {
    console.log("onSpeechStart: ", e);
    this.setState({
      started: "√",
    });
  };

  onSpeechRecognized = (e) => {
    console.log("onSpeechRecognized: ", e);
    this.setState({
      recognized: "√",
    });
  };

  onSpeechEnd = (e) => {
    console.log("onSpeechEnd: ", e);
    this.setState({
      end: "√",
    });
  };

  onSpeechError = (e) => {
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    console.log("onSpeechResults: ", e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e) => {
    console.log("onSpeechPartialResults: ", e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    console.log("onSpeechVolumeChanged: ", e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      showWave: true,
    });

    try {
      await Voice.start(i18next?.language == 'tr' ? 'tr-TR' : "en-US");
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
      `${this.state.results[0]}!! Your location sent to your contacts successfully `,
      ToastAndroid.SHORT
    );
  };

  // "Help Me!!   Your location sent to your contacts successfully"

  _confirm = async () => {
    if (this.state.results.length) {
      await AsyncStorage.setItem("voiceCode", this.state.results[0]);
      const requestOption = {
        userID: "2",
        passwordText: "password testing",
      };
      axios.post("https://api.confidateapp.com/api/VoicePasswordCreate", requestOption).then((res) => {
        console.log(res, "res POST OPTION MESSAGE")
      })
      const dataValue = await AsyncStorage.getItem("voiceCode");
      this.showToast();
      // alert('Voice passcode and Location Successfully sent to your contacts');
      this._destroyRecognizer();
    }
  };
  // _callTimer=()=>{
  //   this._startTimer()
  // }

  _startTimer = () => {
    console.log("calling ganesh ");
    timer = setTimeout(() => {
      if (this.state.timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      this.setState({ timeLeft: this.state.timeLeft - 1 });
      //  setTimeLeft(this.state.timeLeft-1);
    }, 1000);
    return () => clearTimeout(timer);
  };

  //  useEffect(() => {
  //      startTimer();
  //      return () => clearTimeout(timer);
  //  });

  //  _start = () => {
  //     this.setState({timeLeft:30})
  //     clearTimeout(timer);
  //     startTimer();
  // }

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      showWave: false,
    });
  };

  render() {
    return (
      <ImageBackground
        source={require("../../../assets/images/backgroundPasscode.png")}
        style={{
          flex: 1,
        }}
      >
        <View>
          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text
                style={[
                  styles.textColor,
                  styles.passcode,
                  { marginRight: 55, marginLeft: 120, width: "40%" },
                ]}
              >
                Enter Passcode
              </Text>
              <Image
                source={require("../../../assets/images/sideBadge.png")}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                }}
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
                {this.state.timeLeft} sec
              </Text>
            </View>

            <Image
              source={
                this.state.showWave
                  ? require("../../../assets/images/wave4.png")
                  : require("../../../assets/images/wave2.png")
              }
              style={{
                width: 370,
                height: 170,
                marginHorizontal: 20,
                resizeMode: "contain",
              }}
            />
          </View>

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableHighlight onPress={this._startRecognizing}>
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
              Say Your Voice Passcode {this.state.timeLeft}
            </Text>
            {this.state.showWave ? (
              <TouchableOpacity onPress={this._startTimer}></TouchableOpacity>
            ) : null}

            {/* <Button title={''} submit={this._startTimer()} /> */}
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
                  color: "white",
                  marginTop: '10%',
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                Your Password :{" "}
                <Text style={{ color: "white" }}>{this.state.results[0]}</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 50,
              }}
            >
              <TouchableOpacity onPress={this._confirm}>
                <Text
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 35,
                  }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._destroyRecognizer}>
                <Text
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 35,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <Text style={styles.instructions}>
          Press the button and start speaking.
        </Text> */}
        {/* <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${
          this.state.recognized
        }`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text> */}
        {/* <Text style={styles.stat}>Results</Text> */}
        {/* {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })} */}
        {/* <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <TouchableRipple onPress={this._startRecognizing}>
          <Image
            source={require('../../../assets/images/voiceRecongnition.png')}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              marginTop: 5,
              borderRadius: 50,
            }}
          />
        </TouchableRipple> */}
        {/* <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight> */}
        {/* </View> */}
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
    backgroundColor: "black",
  },
  subContaner: {
    // flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "white",
    marginBottom: 1,
  },
  textColor: {
    color: "white",
  },
  passcode: {
    textAlign: "center",
    fontSize: 16,
  },
  timer: {
    color: "white",
    textAlign: "center",
    backgroundColor: "grey",
  },
});

export default AddEditVoicePasscode;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   TouchableHighlight,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import sideBadge from '../../../assets/images/sideBadge.png';

// import {AudioRecorder, AudioUtils} from 'react-native-audio';
// import AppHeader from '../../components/AppHeader';
// import Button from '../../components/Button';

// function AddEditVoicePasscode(props) {
//   const time = {
//     hour: 0,
//     minute: 0,
//     seconds: 0,
//     running: false,
//   };
//   const [timer, setTimer] = useState(time);
//   const [currentTime, setCurrentTime] = useState(0.0);
//   const [recording, setRecording] = useState(false);
//   const [stoppedRecording, setStoppedRecording] = useState(false);
//   const [finished, setFinished] = useState(false);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [file, setFile] = useState([]);

//   const [audioPath, setAudioPath] = useState(
//     AudioUtils.DocumentDirectoryPath + '/rctnrec_',
//   );
//   // console.log(audioPath)
//   const [isLoggingIn, setisLoggingIn] = useState(false);

//   const [recordTime, setRecordTime] = useState('00:00:00');
//   const [currentPositionSec, setCurrentPositonSec] = useState(0);
//   const [currentDurationSec, setCurrentDurationSec] = useState(0);
//   const [playTime, setPlayTime] = useState('00:00:00');
//   const [duration, setDuration] = useState('00:00:00');
//   const [falaes, setFales] = useState(false);
//   const [index, setIndex] = useState(0);
//   const [oneTime, setOneTime] = useState(false);
//   const [oneTimeSave, setTimeSave] = useState(0);

//   let Path = 'PassCode' + '.aac';
//   const prepareRecordingPath = audioPath => {
//     // audioPath = 'PassCode' + ".aac";
//     audioPath = audioPath + Date.now() + '.aac';
//     AudioRecorder.prepareRecordingAtPath(audioPath, {
//       SampleRate: 22050,
//       Channels: 1,
//       AudioQuality: 'Low',
//       AudioEncoding: 'aac',
//       AudioEncodingBitRate: 32000,
//     });
//   };

//   useEffect(() => {
//     checkPermission().then(hasPermission => {
//       setHasPermission(hasPermission);

//       if (!hasPermission) return;

//       prepareRecordingPath(audioPath);

//       AudioRecorder.onProgress = data => {
//         setCurrentTime(Math.floor(data.currentTime));
//         // this.setState({ currentTime: Math.floor(data.currentTime) });
//       };

//       AudioRecorder.onFinished = data => {
//         // Android callback comes in the form of a promise instead.
//         if (Platform.OS === 'ios') {
//           finishRecording(data.status === 'OK', data.audioFileURL);
//         }
//       };
//     });
//   }, []);

//   const checkPermission = () => {
//     if (Platform.OS !== 'android') {
//       return Promise.resolve(true);
//     }

//     const rationale = {
//       title: 'Microphone Permission',
//       message:
//         'AudioExample needs access to your microphone so you can record audio.',
//     };

//     return PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       rationale,
//     ).then(result => {
//       console.log('Permission result:', result);
//       return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
//     });
//   };

//   const stop = async () => {
//     // setFales(false)

//     // if (!recording) {
//     //     alert('Can\'t stop, not recording!');
//     //     return;
//     // }
//     setStoppedRecording(true);
//     setRecording(false);

//     // this.setState({stoppedRecording: true, recording: false});

//     try {
//       const filePath = await AudioRecorder.stopRecording();

//       if (Platform.OS === 'android') {
//         finishRecording(true, filePath);
//       }
//       return filePath;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const record = async () => {
//     // setFales(true)

//     if (!falaes && finished) {
//       // console.warn('Already recording!');
//       alert('Please save and add another passcode');
//       return;
//     }

//     if (!hasPermission) {
//       alert("Can't record, no permission granted!");
//       return;
//     }

//     if (stoppedRecording) {
//       prepareRecordingPath(audioPath);
//     }

//     setRecording(true);

//     try {
//       const filePath = await AudioRecorder.startRecording();
//       if (currentTime > 0.0) {
//         var listOfVoice = file;

//         file.push({file: filePath, key: index});
//         setFile(listOfVoice);
//         setTimeSave(!oneTimeSave);
//         console.log(filePath, file);
//       } else {
//         alert('Voice Passcode Should be more than 2 secs');
//       }

//       // setOneTime(true)
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const finishRecording = (didSucceed, filePath) => {
//     setFinished(didSucceed);
//     // setTimeSave(oneTime+1)
//     // console.log(finished)

//     alert(`Finished recording of duration ${currentTime} seconds `);
//   };

//   var interval;
//   const onPress = () => {
//     // timer.running = !timer.running;
//     // console.log(timer.running, recording)
//     // console.log(falaes)
//     setFales(!falaes);
//     console.log(falaes);
//     if (falaes) {
//       setTimeSave(oneTimeSave + 1);
//       record();
//     } else {
//       stop();
//     }
//   };
//   const save = () => {
//     props.navigation.navigate('VoiceCode', {value: file, index: index});
//     setFinished(false);
//     setFales(!falaes);
//     setIndex(index + 1);
//     setOneTime(0);
//   };
//   const goBack = () => {
//     if (finished) {
//       file.pop();
//       props.navigation.goBack();
//       setFinished(!finished);
//       setOneTime(0);
//     } else {
//       props.navigation.goBack();
//       setFinished(!finished);
//       setOneTime(0);
//     }
//   };
//   const goHome = () => {
//     props.navigation.navigate('HomeScreenStack');
//     setFinished(!finished);
//     setOneTime(0);
//     setRecording(false);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <AppHeader
//           title={'Add New Voice Passcode'}
//           goBack={goBack}
//           goHome={goHome}
//         />
//         <View>
//           <View
//             style={
//               recording
//                 ? {
//                     height: 150,
//                     width: 150,
//                     borderRadius: 100,
//                     borderWidth: 1,
//                     backgroundColor: '#EA1B91',
//                     alignSelf: 'center',
//                     marginVertical: 100,
//                     opacity: 0.2,
//                   }
//                 : {
//                     height: 150,
//                     width: 150,
//                     borderRadius: 100,
//                     borderWidth: 1,
//                     backgroundColor: '#EA1B91',
//                     alignSelf: 'center',
//                     marginVertical: 100,
//                     opacity: 0.9,
//                   }
//             }>
//             <Text
//               style={{textAlign: 'center', paddingTop: 45}}
//               onPress={onPress}>
//               <Icon name="microphone" size={50} color="#ffff" />
//             </Text>
//           </View>
//           <View style={{marginTop: -60}}>
//             {recording ? (
//               <Text style={{textAlign: 'center', fontSize: 16, color: 'grey'}}>
//                 {' '}
//                 Say Your Voice Passcode
//               </Text>
//             ) : (
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   fontSize: 16,
//                   paddingTop: 0,
//                   color: 'grey',
//                   paddingBottom: 5,
//                 }}>
//                 {' '}
//                 Tap Here To Record Your Voice Passcode
//               </Text>
//             )}
//           </View>
//         </View>
//         {finished ? (
//           <View>
//             <Button title={'Save'} submit={save} />
//           </View>
//         ) : (
//           <Text></Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
// });
// export default AddEditVoicePasscode;
