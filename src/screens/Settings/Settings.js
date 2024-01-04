import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
// import Feather from "react-native-vector-icons/Feather";
// import sideBadge from "../../../assets/images/sideBadge.png";
import AppHeader from "../../components/AppHeader";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginReset } from "../../redux/actions/login/login.action";
import { locationHide } from "../../API/listApisServices";
import { getUserDeatils } from "../../redux/actions/getUser/getUser.action";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { useTranslation } from "react-i18next";
// import i18n from "../../Localization/i18n";
import GenderDropDown from "../../components/DropDown";
import RNRestart from "react-native-restart";
import axios from "axios";
// import { MessageAction } from "../../components/commonHelper";

function Settings(props) {
  const { t, i18n } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [deleteAcc, setDeleteAcc] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [gender, setGender] = useState("English (İngilizce)");
  const inputRef = useRef({});
  const genderArray = ["English (İngilizce)", "Turkish (Türkçe)"];
  const dropDownText = (props) => {
    return (
      <View style={{ marginHorizontal: "6%" }}>
        <Text>
          <Icon name="angle-down" color="grey" size={20} />
        </Text>
      </View>
    );
  };

  useEffect(() => {
    if (gender == "Turkish (Türkçe)") {
      languageRestart("tr");
      AsyncStorage.setItem("lang", 'tr')
    } else if (gender == "English (İngilizce)") {
      languageRestart("en");
      AsyncStorage.setItem("lang", 'en')
      // RNRestart.Restart();
    }
  }, [gender]);

  function languageRestart(language) {
    i18n.changeLanguage(language);
  }

  const [isLocating, setLocation] = useState("");
  const state = useSelector((state) => state.userLogin);
  let token = state != null ? state?.user?.token : null;
  let stateEmail = useSelector((state) => state.userInfo.user);
  let mapMail = JSON.stringify(stateEmail);
  mapMail = JSON.parse(mapMail);
  // console.log("mail", mapMail.data.allowLocationTracking, isLocating);
  const toggleSwi = () => {
    trackLocation();
  };
  useEffect(() => {
    setLocation(mapMail?.data?.allowLocationTracking);
    AsyncStorage.getItem("user1").then((res) => {
      setDeleteAcc(JSON.parse(res));
    });
  }, []);
  const dispatch = useDispatch();
  const storage = async () => {
    ReactNativeForegroundService.stop();
    const load = await AsyncStorage.removeItem("user");
    RNRestart.Restart()

  };

  const deleteAccount = () => {
    try {
      axios.delete(
        `https://api.confidateapp.com/api/DeleteUser/${deleteAcc?.res?.id}`
      )
        .then((res) => {
          if (res.message == t("messages.deletedSuccessfully")) {
            ToastAndroid.SHORT("messages.accountDelete");
            storage();
            dispatch(loginReset());
          }
        });
    } catch (err) {
      ToastAndroid.SHORT("Something went wrong");
      console.log(err);
    }
  };

  const logOut = () => {
    storage();
    dispatch(loginReset());
  };
  const logOutAlert = () =>
    Alert.alert(t("messages.logoutAlert"),t("messages.wantLogout"), [
      {
        text: t("messages.Cancel"), 
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: t("messages.OK"), onPress: logOut },
    ]);
  const DeleteAlert = () =>
    Alert.alert(
      <text>{t("messages.deleteAlert")}</text>,
     <text> {t("messages.deleteAccountSure")}</text>,
      [
        {
          text: t("messages.Cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: t("messages.OK"), onPress: deleteAccount },
      ]
    );
  const goBack = () => {
    props.navigation.goBack();
  };
  const goHome = () => {
    // alert('Muneer');
    props.navigation.navigate("HomeScreenStack");
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log(isLocating);
  const trackLocation = () => {
    const details = {
      allowLocationTracking: !isLocating,
    };

    locationHide(details, headers)
      .then((rep) => {
        dispatch(getUserDeatils(headers));
        console.log("locact", rep);
        setLocation(!isLocating);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dispatch(getUserDeatils(headers)).then((rep) => {
      setLocation(rep.data.allowLocationTracking),
        console.log(rep.data.allowLocationTracking);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <AppHeader title={t("settings.setting")} goBack={goBack} goHome={goHome} />
          <View style={{ marginTop: -30 }}>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate("AllEmergencyPasscode")}
            >
              <View style={styles.list}>
                <Text style={styles.listText}>
                  {t("settings.editPassword")}
                </Text>
                <Text
                  style={styles.forw}
                  onPress={() => props.navigation.navigate("AllEmergencyPasscode")}
                >
                  <Icon name="angle-right" color={"grey"} size={24} />
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.list}>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("EmergencyUs")}
              >
                <Text style={styles.listText}>
                  {t("settings.editEmergencyMessage")}
                </Text>
                <Text
                  style={styles.forw}
                  onPress={() => props.navigation.navigate("EmergencyUs")}
                >
                  <Icon name="angle-right" color={"grey"} size={24} />
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.list}>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("VoiceCode")}
              >
                <Text style={styles.listText}>
                  {t("settings.editEmergecyVoicePasscode")}
                </Text>
                <Text
                  style={styles.forw}
                  onPress={() => props.navigation.navigate("VoiceCode")}
                >
                  <Icon name="angle-right" color={"grey"} size={24} />
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.list}>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("EmergencyContacts")}
              >
                <Text style={styles.listText}>
                  {t("settings.editEmergencyContacts")}
                </Text>
                <Text
                  style={styles.forw}
                  onPress={() => props.navigation.navigate("EmergencyContacts")}
                >
                  <Icon
                    name="angle-right"
                    color={"grey"}
                    size={24}

                  // onPress={() => props.navigation.navigate('PersonalityTest', { title: header })}
                  />
                </Text>
              </TouchableWithoutFeedback>
            </View>
            {/* <View style={styles.list}>
              <Text style={styles.listText}>{t("settings.hideLocation")}</Text>
              <View style={{ marginRight: "-10%" }}>
                <Switch
                  trackColor={{ false: "grey", true: "#EA1B91" }}
                  thumbColor={isLocating ? "#EA1B91" : "grey"}
                  onValueChange={toggleSwi}
                  value={isLocating}
                  style={{
                    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                    marginTop: -25,
                    marginLeft: "2%",
                  }}
                />
              </View>
            </View> */}
            {/* <View style={styles.list}>
              <Text
                style={styles.listText}
                onPress={() =>
                  props.navigation.navigate('SafetyGuide', {
                    title: 'International Crisis Resources',
                  })
                }>
                International Crisis Resources
              </Text>
              <Text
                style={styles.forw}
                onPress={() =>
                  props.navigation.navigate('SafetyGuide', {
                    title: 'International Crisis Resources',
                  })
                }
                >
                <Icon
                  name="angle-right"
                  color={'grey'}
                  size={24}

                  // onPress={() => props.navigation.navigate('PersonalityTest', { title: header })}
                />
              </Text>
            </View> */}

            <View style={styles.list}>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("Help")}
              >
                <Text style={styles.listText}>
                  {t("settings.help&support")}
                </Text>
                <Text
                  style={styles.forw}
                  onPress={() => props.navigation.navigate("Help")}
                >
                  <Icon name="file-text" color={"grey"} size={24} />
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{ width: "90%", alignSelf: "center", marginTop: "5%" }}
            >
              <GenderDropDown
                ref={inputRef}
                data={genderArray}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return gender != null ? selectedItem : "Select Language";
                }}
                defaultButtonText={gender}
                buttonStyle={{
                  backgroundColor: "black",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  paddingRight: 0,
                  paddingLeft: 0,
                  marginHorizontal: "1%",
                  marginBottom: "3%",
                  height: 56,
                  width: "96%",
                }}
                buttonTextStyle={{
                  color: "grey",
                  fontSize: 16,
                  fontFamily: "Rubika",
                  textTransform: "capitalize",
                }}
                renderDropdownIcon={dropDownText}
              />
            </View>
            {/* <View style={styles.list}>
              <Text style={styles.listText}>{t('settings.switchLanguage')}</Text>
              <View style={{ marginRight: '-10%' }}>
                <Switch
                  trackColor={{ false: 'grey', true: '#EA1B91' }}
                  thumbColor={isEnabled ? '#EA1B91' : 'grey'}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{
                    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                    marginTop: -25,
                    marginLeft: '2%',
                  }}
                />
              </View>
            </View> */}
          </View>
          <View>
            <Button title={t("settings.logout")} submit={logOutAlert} />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 28,
              color: "blue",
              marginBottom: "4%",
            }}
            onPress={DeleteAlert}
          >
            <Icon name="trash-o" size={30} color="blue" />{" "}
            {t("settings.deleteAccount")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  list: {
    borderBottomWidth: 1,
    paddingBottom: 22,
    borderColor: "grey",
    marginHorizontal: "5%",
  },
  listText: {
    color: "grey",
    fontSize: 16,
    marginTop: 20,
    padding: 3,
  },
  forw: {
    alignSelf: "flex-end",
    marginTop: -20,
    paddingRight: 10,
  },
});
export default Settings;
