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
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CountDown from "react-native-countdown-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNShake from "react-native-shake";
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import Geolocation from "@react-native-community/geolocation";
import AppHeader from "../../components/AppHeader";
import { TextInput } from "react-native-gesture-handler";
// import { useTranslation } from 'react-i18next';
import i18next, { t } from "i18next";
import axios from "axios";
import Geocoder from "react-native-geocoding";

const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//const APIKey = "AIzaSyDi37V6onzDD-GNMhhsGwJ-cJYFN9hPX3I";
//const APIKey = "AIzaSyCjRS0cALaMPoNqWKS33wBaqbxoKSuONso";
const APIKey = "AIzaSyBrGAWlfWAn7FIzbXu1drt6z86NRN1gGUw";
//onst APIKey = 'AIzaSyAhz9Vz30qF9EtmWHWURPhDbeWLgHsRGD0';
let timer = () => { };
class EmergencyPasscode extends Component {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    showWave: false,
    timeLeft: 3600,
    timerFlag: false,
    showVoiceModule: false,
    textPasscode: "",
    confirmpasscode: "",
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

  goBack = () => {
    console.log("ganesh >>>");
    this.props.navigation.goBack();
    // console.log(this.props,"props");
  };

  goHome = () => {
    this.props.navigation.navigate("HomeScreenStack");
  };

  onSpeechStart = (e) => {
    this._startTimer();
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
    this._startTimer();
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
    this.newTimer();
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      showWave: true,
      timerFlag: true,
    });

    try {
      const value = await Voice.start(i18next?.language == 'tr' ? 'tr-TR' : "en-US");
      // console.log(value, "ldldlldld");
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount() {
    RNShake.addListener(() => {
      this._startRecognizing();
      setTimeout(async () => {
        await this._confirm();
      }, 10000);
    });
  }

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
    if (this.state.results.length > 0) {
      ToastAndroid.show( 
        t('voicePasscode.VoicePassMatch'),
        ToastAndroid.SHORT
      );
    } else if (this.state.textPasscode) {
      ToastAndroid.show(
        t('voicePasscode.VoicePassMatch'),
        ToastAndroid.SHORT
      );
    }
  };

  showToastMismatch = () => {
    ToastAndroid.show(
      t('voicePasscode.VoicePassNotMatch'),
      ToastAndroid.SHORT
    );
  };

  showToastNot = () => {
    ToastAndroid.show(t('voicePasscode.PlsAddPasscode'), ToastAndroid.SHORT);
  };

  // "Help Me!!   Your location sent to your contacts successfully"

  // dataMethode=()=>{
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //     const details = {
  //       allowLocationTracking: !isLocating,
  //     };

  //     locationHide(details, headers)
  //       .then(rep => {
  //         dispatch(getUserDeatils(headers));
  //         console.log('locact', rep);
  //         setLocation(!isLocating);
  //       })
  //       .catch(err => console.log(err));
  // }

  _confirm = async () => {

    // console.log(this.state.textPasscode, "passcode text");
    if (this.state.results.length || this.state.textPasscode) {
      const voiceCode = await AsyncStorage.getItem("passcodeId").then((res) => {
        let res2 = JSON.parse(res);
        this.setState({ confirmpasscode: res2.passwordText });
      });
      const message = await AsyncStorage.getItem("saveMessage")
      const practiceCode = await AsyncStorage.getItem("voiceCode");
      const contacts = await AsyncStorage.getItem("contacts");
      console.log(voiceCode, practiceCode, message, contacts, "values");
      if (
        this.state.confirmpasscode == this.state.results[0] ||
        practiceCode == this.state.results[0]
        // 'https://www.google.de/maps/@37.0625,-95.677068?q=Plot B 4/21C Nazimabad, Karachi, Pakistan'
      ) {
        this.showToast();
        Geolocation.getCurrentPosition(
          (position) => {
            Geocoder.from(position.coords.latitude, position.coords.longitude)
              .then((json) => {
                // console.log(
                //   "initial",
                //   json.results[2]
                // );
                // setMarkerAddress(json.results[3].formatted_address);
                let markerTitle = json.results[2].formatted_address;
                let addressLocation = json.results[0].address_components[0].long_name;
                let data = {
                  number: contacts,
                  location: `https://www.google.de/maps/@${position.coords.latitude},${position.coords.longitude}?q=${markerTitle}`,
                  message: message
                }
                console.log(data)
                axios.post('https://api.confidateapp.com/api/sendMessage', data).then((res) => {
                  if (res.message == "Verification code sent") {
                    ToastAndroid.show(
                      t("voicePasscode.LocationSent"),
                      ToastAndroid.SHORT
                    );
                  }
                })
              })
              .catch((error) => console.warn(error));
          },
          (error) => alert(error.message)
        )
      } else {
        this.showToastMismatch();
      }
      // alert('Voice passcode and Location Successfully sent to your contacts');
      this._destroyRecognizer();
      this.setState({ textPasscode: "", showVoiceModule: false });
    } else {
      this.showToastNot();
    }
    // this.goHome();
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
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      showWave: false,
      timerFlag: false,
    });
  };

  onFinished = () => {
    this._stopRecognizing();
    alert(t("voicePasscode.StoppedRecongnition"));
    this.setState({ timerFlag: false, showWave: false }, () => {
      if (!this.state.results.length > 0) {
        this.setState({ showVoiceModule: true });
      }
    });
  };

  newTimer = () => {
    return (
      <View>
        <CountDown
          until={3599}
          size={10}
          onFinish={() => this.onFinished()}
          onPress={() => alert("hello")}
          timeToShow={["H", "M", "S"]}
          timeLabels={{ m: null, s: null }}
          digitTxtStyle={{ color: "#fff", fontSize: 12 }}
          digitStyle={{
            backgroundColor: "#333536",
            borderWidth: 2,
            borderColor: "#333536",
          }}
        />
      </View>
    );
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
            <AppHeader
              title={t("voicePasscode.addYourVoicePasscode")}
              goBack={this.goBack}
              goHome={this.goHome}
            />
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
                {this.state.timerFlag ? this.newTimer() : 0}
              </Text>
            </View>

            {!this.state.showVoiceModule ? (
              <Image
                source={
                  this.state.showWave
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
            ) : null}
          </View>

          {!this.state.showVoiceModule ? (
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
                {t("voicePasscode.sayYourVoicePasscode")}
              </Text>
              {this.state.showWave ? (
                <TouchableOpacity onPress={this._startTimer}></TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(value) => {
                  this.setState({ textPasscode: value, timerFlag: true });
                }}
                // value={number}
                placeholder= {t("voicePasscode.EnterPasscode")}
              // keyboardType="numeric"
              />
            </View>
          )}

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
                  marginTop: '10%',
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                {t("voicePasscode.yourpassword")} :{" "}
                <Text style={{ color: "white" }}>
                  {this.state.results[0]} {this.state.textPasscode}
                </Text>
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
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    paddingHorizontal: 30,
                    borderRadius: 35,
                  }}
                >
                  <Text>{t("voicePasscode.confirm")}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._destroyRecognizer}>
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
  input: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 5,
    paddingLeft: 20,
    marginVertical: 90,
  },
});

export default EmergencyPasscode;
