import React, { useState, createRef, useEffect } from "react";
import { View, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Keyboard } from "react-native";
import { TouchableRipple, Text, Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Button from "../../components/Button";
import { getProfile, updateProfile } from "../../API/listApisServices";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../../components/AppHeader";
import { getUserDeatils } from "../../redux/actions/getUser/getUser.action";
import moment from "moment";
import styles from "./EditProfileStyles";
import ReactNativePaperInput from "../../components/ReactNativePaperInput";
import ReactNativeInput from "../../components/ReactNativeInput";
import GenderDropDown from "../../components/DropDown";
import { Message, MessageAction } from "../../components/commonHelper";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

function EditProfile(props) {
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState();
  let token = useSelector((state) => state.userLogin.user);
  let stateEmail = useSelector((state) => state.userInfo.user);
  let mapMail = JSON.stringify(stateEmail);
  mapMail = JSON.parse(mapMail);
  const { t, i18n } = useTranslation();
  const [profileData, setProfileData] = useState(
    mapMail != null ? mapMail.data : {}
  );
  const _textInput = createRef();
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(
    profileData.dateOfBirth != null
      ? new Date(profileData.dateOfBirth)
      : new Date()
  );
  const [show, setShow] = useState(false);
  const [ageYear, setAgeYear] = useState("");
  const [weight, setWeight] = useState(5);
  const [height, setheight] = useState(100);
  const [loader, setLoader] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dateValues, setDateValue] = useState(false);
  const [gender, setGender] = useState(
    profileData.gender != null ? profileData.gender : ""
  );

  const headersOne = {
    Authorization: `Bearer ${token.token}`,
  };
  const genderArray = ["Male", "Female", "Others"];

  const genderList = [
    { label: "Male", value: "MALE" },

    { label: "Female", value: "FEMALE" },

    { label: "Others", value: "TRANS" },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (date) => {
    handleClose();
    setDate(date);
    getAge(date);
    console.log(date);
  };
  const getAge = (dateString) => {
    setDateValue(true);
    var today = new Date();
    var birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAgeYear(age);
    return age;
  };

  let regexp = /^[0-9\b]+$/;
  const changeValue = (text, name) => {
    if (name === "Edu") {
      console.log(name, text);
      let edtivalues = { ...profileData };
      edtivalues.education = text;
      setProfileData(edtivalues);
    } else if (name == "about") {
      let edtivalues = { ...profileData };
      edtivalues.aboutMe = text;
      setProfileData(edtivalues);
    } else if (name == "location") {
      let edtivalues = { ...profileData };
      edtivalues.address = text;
      setProfileData(edtivalues);
    } else if (name == "job") {
      let edtivalues = { ...profileData };
      edtivalues.jobTitle = text;
      setProfileData(edtivalues);
    } else if (name == "height") {
      let edtivalues = { ...profileData };
      edtivalues.jobTitle = text;
      setheight(edtivalues);
    }else if (name == "weight") {
      let edtivalues = { ...profileData };
      edtivalues.jobTitle = text;
      setWeight(edtivalues);
    }
     else if (name == "name") {
      if (text.length <= 20) {
        let edtivalues = { ...profileData };
        edtivalues.name = text;
        setProfileData(edtivalues);
      } else {
        Message("info", t("messages.TextLetters"));
      }
    } else if (name == "mobile") {
      if (text.length <= 15) {
        let editvalues = { ...profileData };
        editvalues.phoneNumber = text;
        if (
          editvalues.phoneNumber === "" ||
          regexp.test(editvalues.phoneNumber)
        ) {
          setProfileData(editvalues);
        }
      } else {
        Message("info", t("messages.TextLetters"));
      }
    }
  };
  const sucessAlert = () =>
    Alert.alert("Alert", t("messages.profileUpdated"), [
      { text: t("messages.OK"), onPress: () => props.navigation.goBack() },
    ]);

  const sucess = () => {
    props.navigation.goBack();
  };
  const error = () => {
    console.log("Test");
  };

  const profileupDate = async (e) => {
    e.preventDefault();
    getAge(date.toISOString());

    if (profileData.name && date && gender && profileData.address) {
      if (ageYear >= 18) {
        setLoader(true);
        const detailsProfile = {
          name: profileData.name,
          // phoneNumber: profileData.phoneNumber,
          age: date.toISOString(),
          gender: gender === "Others" ? "TRANS" : gender.toUpperCase(),
          aboutMe: profileData.aboutMe,
          location: profileData.address,
          education: profileData.education,
          job: profileData.jobTitle,
          height: height + "CM",
          weight: weight + "FT",
          email: token.user.email,
        };

        // console.log("detailsProfile", detailsProfile);
        const headers = {
          "Content-Type": "application/json",
        };
        await updateProfile(detailsProfile, headers)
          .then((res) => {
            if (res.data.id !== "") {
              MessageAction("success", t("messages.profileUpdated"));
              setLoader(false);
              props.navigation.goBack();
            }
          })
          .catch((err) => {
            setLoader(false);
            MessageAction("error", "Something went wrong");
          });
        // await updateProfile(detailsProfile, headers)
        //   .then(response => {
        //     if (response.data.succeeded) {
        //       console.log('er', response);
        //       setLoader(false);
        //       dispatch(getUserDeatils(headersOne));
        //       // sucessAlert();

        //       Message('success', 'Profile Updated Successfully');
        //       props.navigation.goBack();
        //     } else {
        //       setLoader(false);
        //       response.data.errors ? alert(response.data.errors[0]) : '';
        //       Message(
        //         'error',
        //         ` ${response.data.errors ? response.data.errors[0] : ''}$`,
        //       );
        //     }
        //   })
        //   .catch(err => {
        //     setLoader(false);
        //   });
      } else {
        Message("error", t("messages.AgeGreater"));
      }
    } else {
      Message("error", t("messages.allMandatoryFields"));
    }
  };


  const getProfileInfo = async () => {
    axios.post('https://api.confidateapp.com/api/getProfile' , {"email" : token?.user?.email}).then((res)=>{
      console.log("res", res.data)
      setheight(res.data.height)
      setWeight(res.data.weight)
      setUserName(res.data.name)
      setGender(res.data.gender)
      setProfileData(res.data)
    })
  }

  useEffect(() => {
    getAge(date);
    getProfileInfo()
  }, []);


  

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    Keyboard.dismiss();
    setShow(true);
  };
  const renderTouchText = (props) => {
    const { style, value, getValue } = props;

    return (
      <View>
        <TouchableRipple onPress={handleOpen} style={{ color: "grey" }}>
          <View style={{ marginVertical: "2%", paddingVertical: "1%" }}>
            <Text style={styles.dateValue}> {value} </Text>
            {/* <Text style={styles.ageYears}>{ageYear} Years
                        </Text> */}
          </View>
        </TouchableRipple>
      </View>
    );
  };

  const value = date
    ? date.getUTCDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getUTCFullYear()
    : "";

  const Values = new Date(profileData.dateOfBirth);
  const getValue = Values
    ? Values.getUTCDate() +
      "/" +
      (Values.getMonth() + 1) +
      "/" +
      Values.getUTCFullYear()
    : "";
  const [textHeight, setTextHeight] = useState(false);
  const IncrementWeight = () => {
    setWeight(weight >= 0 ? weight + 1 : 0);
  };
  const DecrementWeight = () => {
    setWeight(weight < 0 ? 0 : weight - 1);
  };
  const renderText = (props) => {
    return (
      <View>
        <Text style={styles.kgText}> {weight} Kg</Text>
      </View>
    );
  };

  const IncrementHeight = () => {
    console.log("data");
    setheight(height > 0 ? height + 1 : 0);
  };
  const DecrementHeight = () => {
    setheight(height < 0 ? 0 : height - 1);
  };

  const renderHeight = (props) => {
    return (
      <View>
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            paddingVertical: "2%",
            paddingHorizontal: "2%",
          }}
        >
          {" "}
          {height} Cm
        </Text>
      </View>
    );
  };

  const dropDownText = (props) => {
    return (
      <View style={{ marginHorizontal: "4%" }}>
        <Text>
          <Icon name="angle-down" color="#fff" size={20} />
        </Text>
      </View>
    );
  };
  const goBack = () => {
    props.navigation.goBack();
    // setProfileData({name:profileData.name})
  };
  const goHome = () => {
    props.navigation.navigate("HomeScreenStack");
    // setProfileData({name:profileData.name})
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <AppHeader title="Edit Profile" goBack={goBack} goHome={goHome} />
            <View>
              <View style={styles.ageContainer}>
                <Text style={styles.listConatiner}>Name *</Text>
                <ReactNativeInput
                  mode={"flat"}
                  value={profileData.name}
                  mode={"outlined"}
                  onChangeText={(text) => changeValue(text, "name")}
                  style={styles.inputText}
                  theme={{
                    colors: { text: "grey", primary: "rgb(128,128,128)" },
                  }}
                  underlineColorAndroid="transparent"

                  // maxLength={12}
                />
              </View>

              <View style={styles.ageContainerOne}>
                <Text style={{ color: "grey", padding: 3, fontSize: 16 }}>
                  {" "}
                  Age *
                </Text>
                <ReactNativePaperInput
                  ref={_textInput}
                  render={renderTouchText}
                  value={value}
                  style={[styles.dateOf, { backgroundColor: "black" }]}
                  // theme={{colors: {text: 'white', primary: 'rgb(128,128,128)'}}}
                />
                <Text
                  style={{
                    alignSelf: "flex-end",
                    top: "-50%",
                    right: "5%",
                    marginBottom: "-7%",
                  }}
                  onPress={() => setShow(!show)}
                >
                  <Icon name="calendar" size={26} color="#fff" />
                </Text>

                <DateTimePicker
                  // minimumDate={moment().subtract(18, "years")}
                  date={date}
                  isVisible={show}
                  onConfirm={handleChange}
                  onCancel={handleClose}
                  // maximumDate={new Date}
                />
              </View>
              <View style={styles.containerStyle}>
                <Text style={styles.listConatiner}>Gender *</Text>
                <GenderDropDown
                  // ref={inputRef}
                  data={genderArray}
                  onSelect={(selectedItem, index) => {
                    setGender(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  defaultButtonText={gender != null ? gender : "Select Gender"}
                  buttonStyle={{
                    backgroundColor: "black",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "grey",
                    paddingRight: 0,
                    paddingLeft: 0,
                    marginVertical: "2%",
                    width: "98%",
                    textTransform: "capitalize",
                    textAlign: "left",
                  }}
                  renderDropdownIcon={dropDownText}
                  buttonTextStyle={{
                    color: "#fff",
                    fontSize: 16,
                    fontFamily: "Rubika",
                    textTransform: "capitalize",
                    marginLeft: "-40%",
                  }}
                  dropdownStyle={{ borderWidth: 1 }}
                  dropdownIconPosition="right"
                />
              </View>

              <View style={styles.education}>
                <Text style={styles.listConatiner}>Education</Text>
                <ReactNativeInput
                  mode={"flat"}
                  value={profileData.education}
                  mode={"outlined"}
                  onChangeText={(text) => changeValue(text, "Edu")}
                  style={styles.inputText}
                  theme={{
                    colors: { text: "grey", primary: "rgb(128,128,128)" },
                  }}
                />
              </View>
              <View style={styles.education}>
                <Text style={styles.listConatiner}>About me</Text>
                <ReactNativeInput
                  mode={"outlined"}
                  value={profileData.aboutMe}
                  onChangeText={(text) => changeValue(text, "about")}
                  multiline={true}
                  style={styles.inputText}
                  theme={{
                    colors: { text: "grey", primary: "rgb(128,128,128)" },
                  }}
                />
              </View>
              <View style={styles.education}>
                <Text style={styles.listConatiner}>Current Location *</Text>
                <ReactNativeInput
                  value={profileData.address}
                  onChangeText={(text) => changeValue(text, "location")}
                  mode={"outlined"}
                  multiline={true}
                  style={styles.inputText}
                  theme={{
                    colors: { text: "grey", primary: "rgb(128,128,128)" },
                  }}
                />
              </View>
              <View style={styles.education}>
                <Text style={styles.listConatiner}>Job Title</Text>
                <ReactNativeInput
                  mode={"outlined"}
                  value={profileData.jobTitle}
                  multiline={true}
                  onChangeText={(text) => changeValue(text, "job")}
                  style={styles.inputText}
                  theme={{
                    colors: { text: "grey", primary: "rgb(128,128,128)" },
                  }}
                />
              </View>
              <View style={styles.education}>
                <Text style={styles.listConatiner}>Height</Text>
                <ReactNativeInput
                  mode={"outlined"}
                  value={height}
                  multiline={true}
                  keyboardType='numeric'
                  onChangeText={(text) => setheight(text)}
                  style={styles.inputText}
                  placeholder='Enter you height in cm'
                  theme={{
                    colors: { text: "grey", primary: "rgb(128,128,128)" },
                  }}
                />
              </View>
              <View style={styles.education}>
                <Text style={styles.listConatiner}>Weight (Optional)</Text>
                <ReactNativeInput
                  keyboardType='numeric'
                  mode={"outlined"}
                  value={weight}
                  multiline={true}
                  onChangeText={(text) => setWeight(text)}
                  placeholder='Enter you weight in kg'
                  style={styles.inputText}
                  theme={{
                    colors: { text: "grey", primary: "rgb(128,128,128)" },
                  }}
                />
              </View>

              {/* <View style={styles.education}>
                <Text style={styles.listConatiner}>Height</Text>
                <ReactNativeInput
                  mode={"outlined"}
                  value={height}
                  // render={renderHeight}
                  onChange={(e) => setheight(e.target.value)}
                  multiline={true}
                  style={styles.heightInpu}
                  theme={{
                    colors: { text: "#fff", primary: "rgb(128,128,128)" },
                  }}
                /> */}
                {/* <View style={styles.heightInput}>
                  <Icon
                    name="minus"
                    color="white"
                    onPress={DecrementHeight}
                    size={20}
                    style={styles.heightDecrement}
                  />

                  <Icon
                    name="plus"
                    color="white"
                    onPress={IncrementHeight}
                    size={18}
                    style={styles.heightIncrement}
                  />
                </View> */}
              {/* </View> */}
              {/* <View style={styles.education}>
                <Text style={styles.listConatiner}>Weight (Optional)</Text>
                <ReactNativePaperInput
                  mode={"outlined"}
                  value={profileData.weight}
                  onChange={(e) => setWeight(e.target.value)}
                  // render={renderText}
                  multiline={true}
                  style={styles.heightInpu}
                  theme={{
                    colors: { text: "#fff", primary: "rgb(128,128,128)" },
                  }}
                />
              </View> */}
              {/* <View style={styles.weightInput}>
                <Icon
                  name="minus"
                  color="white"
                  onPress={DecrementWeight}
                  size={20}
                  style={styles.weightDecrement}
                />

                <Icon
                  name="plus"
                  color="white"
                  onPress={IncrementWeight}
                  size={20}
                  style={styles.weightIncremnt}
                />
              </View> */}
            </View>
            <View style={styles.button}>
              <Button title={"Save"} submit={profileupDate} loader={loader} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
}

export default EditProfile;
