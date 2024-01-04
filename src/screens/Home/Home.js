import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  LogBox,
} from "react-native";
import bgTab from "../../../assets/images/bg-tabmenu.png";
import menu from "../../../assets/images/menu.png";
import Icon from "react-native-vector-icons/FontAwesome";
import sideBadge from "../../../assets/images/sideBadge.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RNGooglePlaces from 'react-native-google-places';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Voice from "@react-native-voice/voice";
import MapView, {
  Marker,
  ProviderPropType,
  PROVIDER_GOOGLE,
  Callout,
  AnimatedRegion,
} from "react-native-maps";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ripple from "react-native-material-ripple";
import { useSelector, useDispatch } from "react-redux";
import { getUserDeatils } from "../../redux/actions/getUser/getUser.action";
import { updateLocationHistory } from "../../API/listApisServices";
import RNLocation from "react-native-location";
import Geocoder from "react-native-geocoding";
import { getLinkDeatils } from "../../redux/actions/getUser/getLinks.actions";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import CoustmCallout from "./CoustmCallout";
import LogOut from "../../components/LogOut";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";

// RNLocation.configure({
//   distanceFilter: 100, // Meters
//   desiredAccuracy: {
//     ios: "best",
//     android: "balancedPowerAccuracy",
//   },
//   // Android only
//   androidProvider: "auto",
//   interval: 5000, // Milliseconds
//   fastestInterval: 3600000, // Milliseconds
//   maxWaitTime: 5000, // Milliseconds
//   // iOS Only
//   activityType: "other",
//   allowsBackgroundLocationUpdates: false,
//   headingFilter: 1, // Degrees
//   headingOrientation: "portrait",
//   pausesLocationUpdatesAutomatically: false,
//   showsBackgroundLocationIndicator: false,
// });
let locationSubscription = null;
let locationTimeout = null;
let addressLocation = null;
const mapStyle = require("./mapStyle.json");

const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#b5418b",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#0e010d",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#0e010d",
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#b5418b",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "#ffff"
        // "visibility": "off",
        color: "#3dff44",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        // visibility: 'off',
        color: "#3dff44",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "white"
        // "color": "#696969"
        color: "#3dff44",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "#ffff"
        // "color": "#696969"
        color: "#0e010d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#12e235",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "#ffff"
        // "color": "#ea1b91"
        // "color": "#696969"
        color: "#0e010d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        // "color": "#696969"
        color: "#0e010d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#3dbeff",
        // 'opacity': '0.'
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "#ffff"
        color: "#0e010d",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#3dbeff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#b5418b",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#3dbeff",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "#ffff"
        color: "#0e010d",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "#ffff"
        color: "#3dbeff",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#b5418b",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        // "color": "#ffff"
        color: "#b5418b",
      },
    ],
  },
];

const mapStandardStyle = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home(props) {
  const [markerAddress, setMarkerAddress] = useState("");
  let markerTitle = null;
  let token = useSelector((state) =>
    state.userLogin.user != null ? state.userLogin.user : null
  );
  let detailsOfUser = useSelector((state) =>
    state.userInfo != null ? state : null
  );
  //detailsOfUser = detailsOfUser != null ? detailsOfUser.data.allowLocationTracking : null;
  // detailsOfUser = detailsOfUser != null ? detailsOfUser.data.allowLocationTracking : null;
  let validToken = token ? token.token : null;
  let authToken = useSelector((state) => state.userLogin.user);
  let userId = authToken?.user?.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [hambar, setHambar] = useState(false);
  const [locationData, setLocationData] = useState({});
  const [address, setAddress] = useState("");
  const [mikeShow, setMikeShow] = useState(false);
  const [voiceRecoder, setVoiceRecorder] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalText, setModalText] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const [voiceModuleClose, setVoiceModuleClose] = useState(false);
  const [markerPress, setMarkerPress] = useState(false);
  const locationRef = useRef();
  let markerRef = useRef(null);
  let userLocation;
  useEffect(() => {
    checkModel();
  }, []);
  const checkModel = () => {
    const params = {
      userID: JSON.stringify(userId),
    };
    axios
      .post(`https://api.confidateapp.com/api/getVoicePassword`, params)
      .then((res) => {
        // console.log(res.data, "password");
        if (res.data.length == 0) {
          setModalVisible1(!modalVisible1);
        }
      });
  };
  const [locationUser, setLocation] = useState({
    markerData: {
      latitude: 0,
      longitude: 0,
    },
    mapData: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  });
  // console.log(detailsOfUser, "locationUser");
  const press = () => {
    props.navigation.openDrawer();
    setHambar(!hambar);
  };
  const handleRegionChange = (mapData) => {};
  const tokenData = (params) => {
    return dispatch(getUserDeatils(params));
  };
  const headers = token;

  // const testLinks = () => {
  //   const testLinksDetails = {
  //     pageNumber: 1,
  //     pageSize: 2,
  //   };

  //   dispatch(getLinkDeatils(testLinksDetails, headers))
  //     .then((rep) => {
  //       JSON.stringify(rep);
  //       // alert(JSON.stringify(rep))
  //     })
  //     .catch((err) => alert(err));
  // };

  useEffect(() => {
    // testLinks();
    tokenData(token?.user?.email);
  }, []);

  //   // //
  //const APIKey = "AIzaSyCjRS0cALaMPoNqWKS33wBaqbxoKSuONso";
 // const APIKey = "AIzaSyDTK4viphUKcrJBSuoidDqRhVA4AWnHOo0";
// const APIKey = "AIzaSyDXVdDRT05uB_LcRqunK_Cu8vy3Bzu2bCw";
 //const APIKey = "AIzaSyBrGAWlfWAn7FIzbXu1drt6z86NRN1gGUw";
 const APIKey = "AIzaSyDcUGCln8Absm6GISakb22vIt-cZ9s-xXs"; /* latest */
 //const APIKey = 'AIzaSyAhz9Vz30qF9EtmWHWURPhDbeWLgHsRGD0';

  useEffect(() => {
    requestPermission();
    {
      validToken
        ? ReactNativeForegroundService.start({
            id: 144,
            title: t("messages.ConfidateService"), 
            message: t("messages.youAreOnline"),
          })
        : ReactNativeForegroundService.stop();
    }
  }, []);
  // console.log("locations---", locationUser);
  const requestPermission = async () => {
    var backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (backgroundgranted === "granted") {
      // alert('Muneer');
      if (validToken) {
        ReactNativeForegroundService.add_task(
          () => {
            RNLocation.requestPermission({
              ios: "whenInUse",
              android: {
                detail: "fine",
              },
              allowsBackgroundLocationUpdates: true,
            }).then((granted) => {
              // console.log('Location Permissions: ', granted);
              // if has permissions try to obtain location with RN location
              if (granted) {
                locationSubscription && locationSubscription();
                locationSubscription = RNLocation.subscribeToLocationUpdates(
                  ([locations]) => {
                    locationSubscription();
                    locationTimeout && clearTimeout(locationTimeout);
                    // alert(JSON.stringify(locations));
                    // console.log("issye", locations);
                    var intitialMarker = {
                      latitude: locations.latitude,
                      longitude: locations.longitude,
                    };
                    var intiailMap = {
                      latitude: locations.latitude,
                      longitude: locations.longitude,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    };
                    setLocation({
                      markerData: { ...intitialMarker },
                      mapData: { ...intiailMap },
                    });
                    Geocoder.init(APIKey);
                    Geocoder.from(locations.latitude, locations.longitude)
                      .then((json) => {
                        // console.log(
                        //   "initial",
                        //   json.results[3].formatted_address
                        // );
                        // setMarkerAddress(json.results[3].formatted_address);
                        markerTitle = json.results[3].formatted_address;
                        addressLocation =
                          json.results[0].address_components[1].long_name;
                      })
                      .catch((error) => console.warn(error));

                    try {
                      const loactionDetails = {
                        latitude: locations.latitude,
                        longitude: locations.longitude,
                        description:
                          addressLocation != null
                            ? addressLocation
                            : "Un-Named Road",
                      };

                      updateLocationHistory(loactionDetails, headers).then(
                        (rep) => {}
                      );
                    } catch (err) {
                      console.log("errr", err);
                    }
                  }
                );
              } else {
                locationSubscription && locationSubscription();
                locationTimeout && clearTimeout(locationTimeout);
                // alert(
                //   'no permissions to obtain location,So please go to setting and give the permissions  to obtaining the location',
                // );
                // console.log(
                //   "no permissions to obtain location,So please go to setting and give the permissions  to obtaining the location"
                // );
              }
            });
          },
          {
            delay: 1000,
            onLoop: true,
            taskId: "taskid",
            onError: (e) => console.log("Error logging:", e),
          }
        );
      } else {
      }
    }
  };
  const searchGetLocation = (data) => {
    // alert();
    let searchValue = data;
  //console.log("data**", searchValue.lng);
    let searchmarker = {
      latitude: data.lat,
      longitude: data.lng,
    };
    var searchMap = {
      latitude: data.lat,
      longitude: data.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setLocation({
      markerData: { ...searchmarker },
      mapData: { ...searchMap },
    });
  };

  const clearSearch = () => {
    locationRef.current.clear();

    setMikeShow(false);
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // console.log("postion", position);
        let resetsearchmarker = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        var resetsearchMap = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        if (locationUser !== {}) {
          setLocation({
            markerData: { ...resetsearchmarker },
            mapData: { ...resetsearchMap },
          });
        } else {
          setLocation({
            markerData: { ...resetsearchmarker },
            mapData: { ...resetsearchMap },
          });
        }
        setMarkerPress(true);
 /* Gab work */
      /*   Geocoder.init(APIKey);
         Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
           if (json != null) {
              if (markerRef.current.showCallout()) {
                 setMarkerAddress(json.results[3].formatted_address);
              }

               // alert(markerAddress);
              console.log('mar', markerAddress);
            }

           console.log(
             'json',
              markerAddress,
               json.results[3].formatted_address,
            );
          })
        //
        .catch(error => console.warn(error));
        //getting the Longitude from the location json */
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
      },
      (error) => alert(error.message),
      {}
    );
  };

  const getCurrentAddress = () => {
    let loactionAddress = { ...locationUser };
    setLocation(loactionAddress);
    markerRef.current?.showCallout();
    Geocoder.init(APIKey);
    Geocoder.from(
      loactionAddress.markerData.latitude,
      loactionAddress.markerData.longitude
    )
      .then((json) => {
        if (json != null) {
          setMarkerAddress(json.results[3].formatted_address);
          // alert(markerAddress);
          markerTitle = json.results[3].formatted_address;
          setMarkerPress(false);
        }
        // console.log("marker", markerPress, markerTitle);
        requestPermission();
        // console.log("json", json.results[3].formatted_address);
        // markerRef.current.ACCESS_FINE_LOCATION()
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {
    markerPress && getCurrentAddress();
  }, [markerPress]);

  // console.log('redrwa', markerRef.current.redrawCallout());
  // alert(markerAddress);

  const [pitch, setPitch] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [marginBottom, setMarginBottom] = useState(1);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const [searcValue, setSearchValue] = useState("");

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    // console.log("onSpeechStart: ", e);
    setModalText(true);
    setStarted("√");
    setVoiceModuleClose(true);
  };

  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    // console.log("onSpeechEnd: ", e);
    setModalText(false);

    setEnd("√");
  };

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    // console.log("onSpeechError: ", e);
    setError(JSON.stringify(e.error));
    setVoiceError(true);
    setVoiceModuleClose(false);
  };

  const onSpeechResults = (e) => {
    // console.log("onSpeechResults: ", e);
    setModalText(false);
    setModalVisible(false);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e) => {
    // console.log("onSpeechPartialResults: ", e);
    setPartialResults(e.value);
    setVoiceModuleClose(false);
    setModalText(false);
    setModalVisible(false);
    locationRef.current.setAddressText(e.value.toString());

    if (e.value.toString() != "") {
      Geocoder.init(APIKey);
      Geocoder.from(e.value.toString()).then((rep) => {
        let responspeData =
          rep.results[0] != null ? rep.results[0].geometry : null;
        responspeData = responspeData.location;
        let voicesearchmarker = {
          latitude: responspeData.lat,
          longitude: responspeData.lng,
        };
        var voicesearchMap = {
          latitude: responspeData.lat,
          longitude: responspeData.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setLocation({
          markerData: { ...voicesearchmarker },
          mapData: { ...voicesearchMap },
        });
        setMarkerPress(true);
        setMikeShow(true);
      });
    }
  };

  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    // console.log("onSpeechVolumeChanged: ", e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale

    setTimeout(() => {
      setModalText(true);
    }, 1500);

    try {
      await Voice.start("en-US");
      setPitch("");
      setError("");
      setStarted("");
      setResults([]);
      setPartialResults([]);
      setEnd("");
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  const voiceSearch = () => {
    setModalVisible(true);
    startRecognizing();
    setVoiceError(false);
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch("");
      setError("");
      setStarted("");
      setResults([]);
      setPartialResults([]);
      setEnd("");
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const onDismiss = () => {
    setModalVisible(false);
    setVoiceRecorder(false);
    setModalText(false);
    setVoiceError(false);
    setVoiceModuleClose(false);
  };

    
  useEffect(() => {
    clearSearch();
    // modalShow();
  }, []);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () =>
        navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
}, [navigation]);


  return (
    <View>
      <View
        style={{
          position: "absolute",
          top: 30,
          left: 20,
          zIndex: 1,
        }}
      >
        <TouchableWithoutFeedback onPress={() => press()}>
          <Image source={menu} style={{ width: 30, height: 30 , tintColor:"black"}} />
        </TouchableWithoutFeedback>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              // height: 48,
              marginVertical: "2%",
              borderRadius: 10,
              marginHorizontal: "3.2%",
            }}
          >

            <GooglePlacesAutocomplete
            onFail={(err)=>console.log(err,'aldm')}
              ref={locationRef}
              autoFillOnNotFound={true}
              placeholder={t("home.searchLocation")}
              onPress={(data, details = null) => {
                console.log(data,';ldmlamdlmlamldmldmlm');
                const locationSearch =
                  details != null ? details.geometry.location : null;
                searchGetLocation(locationSearch);
                // console.log(
                //   "ma",
                //   // markerRef.current.showCallout(),
                //   details.formatted_address
                // );
               setMikeShow(true);
               setMarkerAddress(details.formatted_address);
                
               setMikeShow(true);
               // console.log(JSON.stringify(details.geometry.location));
             }}
              listEmptyComponent={() =>
              (mikeShow === false && (
                  <View style={{ backgroundColor: "#fff" }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        paddingVertical: "2%",
                      }}
                    >
                      No Places Found
                    </Text>
                  </View>
                    
             )) ||
                null
              }
              minLength={2}
              // minimum length of text to search
              userLocation={detailsOfUser ? false : true}
              maxLength={15}
              autoFocus={false}
              fetchDetails={true}
              returnKeyType={"search"}
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              filterReverseGeocodingByTypes={[
                "locality",
                "administrative_area_level_3",
              ]}
              enablePoweredByContainer={false}
               // }}
              keyboardShouldPersistTaps={"always"}
              renderRightButton={() =>
                mikeShow ? (
                  <Text
                    style={{
                      // position: 'absolute',
                      right: wp("1%"),
                      top: hp("1.4%"),
                      fontSize: 18,
                      color: "grey",

                      marginHorizontal: wp("2.6%"),

                      width: wp("4%"),
                    }}
                    // onPress={clearSearch}
                  >
                    X
                  </Text>
                ) : (
                  <Text
                     onPress={voiceSearch}
                    style={{
                      top: hp("1.2%"),
                      marginHorizontal: wp("2%"),
                    }}
                  >
                    <Icon name="microphone" color="#ea1b91" size={28} />
                  </Text>
                )
              }
              predefinedPlacesAlwaysVisible={true}
              textInputProps={{
                style: {
                  color: "grey",
                  borderWidth: 1,
                  borderColor: "transparent",
                  // marginHorizontal: 10,
                  borderRadius: 10,
                  // marginTop: '4%',
                  backgroundColor: "white",
                  // padding: 0,
                  width: width - 150,
                  paddingLeft: 20,
                  // paddingRight: 20,
                  height: 48,
                  writingDirection: "rtl",
                },

                selectionColor: "black",
                // multiline: true,
              }}
              styles={{
                listView: {
                  width: width - 115,
                  marginVertical: "2%",
                },
              }}
             query={{
               key: APIKey,
               language: "en",
             }}
            />
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate("HomeScreenStack")}
            >
              <Image
                source={sideBadge}
                style={{
                  width: "90%",
                  height: 40,
                  marginHorizontal: "6%",

                  marginTop: "26%",
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View>
        <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map]}
          customMapStyle={theme.dark ? mapStandardStyle : mapDarkStyle}
          region={locationUser.mapData}
          onMapReady={() => setMarginBottom(0)}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Ripple
            rippleColor="rgb(255, 255, 255)"
            rippleFades={true}
            rippleSize={28}
            rippleOpacity={1}
            rippleDuration={400}
            rippleCentered={true}
          >
            <Marker
              ref={markerRef}
              coordinate={locationUser.markerData}
              // draggable={true}
              onDrag={(e) => {
                console.log("dragEnd", e.nativeEvent.coordinate);
              }}
              style={{ height: 0, width: 200 }}
              onDragStart={(e) => console.log("ondara", e)}
              onSelect={(e) => console.log("onSelect", e)}
              centerOffset={{ x: -18, y: -60 }}
              anchor={{ x: 0.69, y: 1 }}
              pinColor="green"
              // title={markerAddress}

              // titleText={markerAddress}
            >
              <CoustmCallout markerAddress={markerAddress} />
            </Marker>
          </Ripple>
        </MapView>
      </View>
      <View>
        <ImageBackground
          source={bgTab}
          style={{
            width: wp("100%"),
            height: hp("18%"),
            position: "absolute",
            marginTop: hp("-17%"),
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View
              style={{
                alignItems: "center",
                width: wp("33%"),
                marginTop: hp("6%"),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("ChatTabNavigation");
                }}
              >
                <Text>
                  <Icon name="comment" color="white" size={40} />
                </Text>
              </TouchableOpacity>
              <Text>{t("drawer.chat")}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: wp("33%"),
                marginTop: hp("4.2%"),
                marginLeft: wp("2.2%"),
              }}
            >
              <TouchableOpacity
                onPress={() => getCurrentAddress()}
                style={{
                  backgroundColor: "#ea1b91",
                  borderRadius: 50,
                  height: hp("6.4%"),
                  width: wp("14%"),
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  <Icon name="map-marker" color="white" size={40} />
                </Text>
              </TouchableOpacity>
              <Text style={{ textAlign: "center" }}>{t("home.explorer")}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: wp("33%"),
                marginTop: hp("5.8%"),
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("VoiceCode")}
              >
                <Text style={{ alignSelf: "flex-end" }}>
                  <Icon name="microphone" color="white" size={40} />
                </Text>
                {/* <Text>Voice PassCode</Text> */}
              </TouchableOpacity>
              <Text style={{ textAlign: "center" }}>
                {t("home.voicePasscode")}
              </Text>
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback
              onPress={voiceModuleClose ? null : onDismiss}
            >
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.centeredView}>
              <View style={styles.modalContent}>
                <View style={styles.modalView}>
                  <Text
                    // onPress={startRecognizing}
                    style={{
                      marginHorizontal: "2%",
                    }}
                  >
                    <Icon name="microphone" color="#ea1b91" size={42} />
                  </Text>
                  <Text
                    // onPress={startRecognizing}
                    style={{
                      marginHorizontal: "2%",
                    }}
                  >
                    {modalText ? (
                      <Text style={{ marginVertical: "2%" }}>.... </Text>
                    ) : voiceError ? (
                      <Text style={{ marginVertical: "2%" }}>
                        {" "}
                        Didn't catch that. Try speaking again{" "}
                      </Text>
                    ) : (
                      <Text style={{ marginVertical: "2%" }}>
                        {" "}
                        Try say something{" "}
                      </Text>
                    )}
                  </Text>
                  <View style={{ marginVertical: "2%" }}>
                    {voiceError ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#EA1B91",
                          // borderWidth: 1,
                          borderRadius: 10,
                          paddingVertical: "2%",
                          paddingHorizontal: "2%",
                        }}
                        // onPress={voiceSearch}
                      >
                        <View style={{ padding: 3 }}>
                          <Text
                            style={{
                              color: "#fff",
                            }}
                          >
                            {" "}
                            Try again
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Text> </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    margin: "5%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    position: "absolute",
    top: 250,
    // left: '25%',
    marginHorizontal: "10%",
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: "9%",
    // top: '150%',
    width: width - 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    height: "100%",
    width: "100%",
    // opacity: 0.4,
    // flex: 1,
  },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#8ad24e",
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
  horizontalView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  textStyle: {
    textAlign: "center",
    padding: 12,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: "center",
    color: "#B0171F",
  },
});
