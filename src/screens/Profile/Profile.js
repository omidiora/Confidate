import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
  ActivityIndicator,
} from "react-native-paper";
import profile from "../../../assets/images/Profile.png";
import sideBadge from "../../../assets/images/sideBadge.png";
import Icon from "react-native-vector-icons/FontAwesome";
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from "react-native-image-crop-picker";

import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RNS3 } from "react-native-aws3";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfile,
  profileUpload,
  updateProfile,
} from "../../API/listApisServices";
import { getUserDeatils } from "../../redux/actions/getUser/getUser.action";
import { set } from "react-native-reanimated";
import styles from "./ProfileStyles";
import { MessageAction } from "../../components/commonHelper";
import profileDummy from "../../../assets/images/profileDummy.jpg";
import { useIsFocused } from "@react-navigation/native";
// import { RNS3 } from "react-native-upload-aws-s3";
import axios from "axios";
function Profile(props) {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [edit, setEdit] = useState(
    "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
  );
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [stated, setStated] = useState({});
  const [profileData, setProfileData] = useState([]);
  const [locations, setLoaction] = useState(null);

  const editInfo = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const stateEmail = useSelector((state) => state.userInfo.user);
  let mapMail = JSON.stringify(stateEmail);
  mapMail = JSON.parse(mapMail);
  // console.log('mapProfile', mapMail.data.profilImage);
  const linksMail = useSelector((state) => state.getLinks.links);
  let linksList = linksMail != null ? linksMail.data.items : null;

  let ageYear = mapMail != null ? mapMail.data.dateOfBirth : "";
  const [age, setAge] = useState("");
  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
    return age;
  };

  let ima = require("../../../assets/images/Profile.png");
  const [profilImage, setProfileImage] = useState(mapMail?.data?.profileImage);

  let token = useSelector((state) => state.userLogin.user);

  // console.log('token', token)
  const headersOne = {
    Authorization: `Bearer ${token.token}`,
  };
  const [userName, setUserName] = useState(
    mapMail != null ? mapMail?.data : null
  );
  const handleChoosePhoto = async () => {
    const data = {
      multiple: false,
      waitAnimationEnd: false,
      includeBase64: false,
      cropping: true,
    };
    ImagePicker.openPicker(data).then(async (response) => {
      let file = {
        uri: response.path,
        name:
          "uploads" +
          `${response.size}` +
          `${response.mime === "video/mp4" ? ".mp4" : ".jpg"}`,
        type: response.mime,
      };
      // console.log("file", file);
      const options = {
        keyPrefix: "uploads/",
        bucket: "cofindate",
        region: "ap-south-1",
        accessKey: "AKIA4CJJSHZPNFDKCHC5",
        secretKey: "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",
        successActionStatus: 201,
      };
      const res = await RNS3.put(file, options);
      if (res.status === 201) {
        let url = res.body.postResponse.location;
        axios
          .put("https://api.confidateapp.com/api/updateProfile", {
            userImage: url,
            email: token?.user?.email,
          })
          .then((res) => {
            if (res.id !== "") {
             alert("success");
              console.log(res, "RES UPDATE PROFILE");
            }
          })
          .catch((err) => {
            alert(err.data,'error from image')
            console.log(err, "Updateldamlmldmfladmfldmlmadlmlamfldmflamlfmdlmalmfldmldamladfm Profile ERR");
          });
      } else {
        alert(res.data,'error from image')
        console.log("eralmlfamdlmfldaldmklmal;dmlfmadl;mfl;amlfmadlmror", res);

      }
    });
  };

  const error = () => {
    console.log("error");
  };
  const uploadFile = (source) => {
    if (Object.keys(source).length == 0) {
      // alert('Please select image first');
      MessageAction("error", "Please select image first", error);
      return;
    }
    setLoader(true);
    const file = {
      uri: source.path,
      name:
        "uploads" +
        `${source.size}` +
        `${source.mime === "video/mp4" ? ".mp4" : ".jpg"}`,
      type: source.mime,
    };

    const options = {
      keyPrefix: "profileUploads/", // Ex. myuploads/
      bucket: "confidate-stag", // Ex. aboutreact
      region: "eu-central-1", // Ex. ap-south-1
      accessKey: "AKIA4CJJSHZPELPCWKNJ",
      // Ex. AKIH73GS7S7C53M46OQ
      secretKey: "FYOzH3LAG7cdY/uZU0Zrg4G3FRVtA",
      
      // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
      successActionStatus: 201,
    };
    RNS3.put(file, options)
      .progress((progress) => {
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`
        );
      })
      .then((response) => {
        if (response.status === 201) {
          setLoaction(response.body.postResponse.location);

          uplaodImage(response.body.postResponse.location);
        } else {
        }
      });
  };

  const uplaodImage = async (locationImage) => {
    const params = {
      profileImage: locationImage,
    };
    const headers = {
      Accept: "application/json, text/plain",
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    };
    console.log("details", params, headers, headersOne);

    await profileUpload(params, headers)
      .then((rep) => {
        if (rep.data.succeeded) {
          dispatch(getUserDeatils(headersOne)).then((rep) => {
            setStated(rep.data);
            MessageAction(
              "success",
              "Profile Photo Updated Successfully",
              error
            );
            // alert('Profile Photo Updated Successfully');
            setProfileImage(rep.data.profileImage);
            setLoader(false);
          });
        } else {
          MessageAction("info", "Please Update Profile Details", error);
          // alert('Please Update Profile Details');
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  useEffect(() => {}, [userName, stated, profilImage, props.navigation]);

  useEffect(() => {
    getAge(ageYear);
  });

  useEffect(() => {
    // dispatch(getUserDeatils({"email" : token?.user?.email})).then((res)=>{
    //   console.log('RES', res.data)
    // })
    axios
      .post("https://api.confidateapp.com/api/getProfile", {
        email: token?.user?.email,
      })
      .then((res) => {
        setProfileData(res.data);
      });
  }, [isFocused, handleChoosePhoto]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <Text
              style={styles.backH}
              onPress={() => props.navigation.goBack()}
            >
              <Icon name="angle-left" color={"#ffff"} size={24} />
            </Text>
          </View>
          <View>
            <View style={styles.conatinerItem}>
              <View style={{ width: "30%" }}>
                <TouchableRipple
                  onPress={() =>
                    props.navigation.navigate("ProfileImage", {
                      title: "ViewImage",
                      image : profileData?.userImage
                    })
                  }
                >
                  {loader ? (
                    <ActivityIndicator size={"small"} color="#ffff" />
                  ) : profileData.userImage != null ? (
                    <Image
                      source={{
                        uri: profileData.userImage,
                      }}
                      style={styles.profilePics}
                    />
                  ) : (
                    <Image source={profileDummy} style={styles.profilePics} />
                  )}
                </TouchableRipple>
              </View>
              <Text></Text>
              <Icon
                name="camera"
                color="white"
                size={24}
                style={styles.icons}
                onPress={handleChoosePhoto}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "40%",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "66%" }}>
                  <Title
                    style={styles.title}
                    onPress={() => props.navigation.navigate("Profile")}
                  >
                    {profileData?.name}
                  </Title>

                  <Text style={styles.caption}>{profileData?.email}</Text>
                </View>
                <View
                  style={{ width: "20%", marginTop: "3%", marginRight: "16%" }}
                >
                  <Text
                    style={{ opacity: 0.5 }}
                    onPress={() =>
                      props.navigation.navigate("ProfileImage", {
                        title: "UploadVedio",
                      })
                    }
                  >
                    <MaterialIcons
                      name="verified-user"
                      color="#3F6AED"
                      size={28}
                    />
                  </Text>
                </View>
              </View>
              <View style={{ width: "20%" }}>
                <TouchableWithoutFeedback
                  onPress={() => props.navigation.navigate("HomeScreenStack")}
                >
                  <Image
                    source={sideBadge}
                    style={{ width: 60, height: 60, marginRight: 20 }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.personal}>{t("safetyGuidelines.PersonalInfo")}</Text>
            <Text
              style={{
                color: "#3F6AED",
                alignSelf: "flex-end",
                marginRight: 50,
                marginTop: "-6%",
              }}
              onPress={() => props.navigation.navigate("EditProfile")}
            >
              Edit
              <Text
                style={{ marginTop: -30 }}
                onPress={() => props.navigation.navigate("EditProfile")}
              >
                {" "}
                <Icon name="pencil" color={"#3F6AED"} size={20} />
              </Text>
            </Text>
            <View>
              <Text
                style={{
                  color: "grey",
                  fontSize: 16,
                  paddingLeft: 20,
                  paddingTop: 6,
                }}
              >
             <Text>{t("profile.Gender")}</Text> : {profileData?.gender}
                {/* {mapMail != null
                  ? mapMail?.data.gender === 'TRANS'
                    ? 'OTHERS'
                    : mapMail?.data.gender
                  : ''} */}
              </Text>
              <Text
                style={{
                  color: "grey",
                  fontSize: 16,
                  paddingLeft: 20,
                  paddingTop: 6,
                }}
              >
           <Text> {t("profile.Age")} </Text> : {profileData?.age?.slice(0, 10)}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ marginTop: "5%", marginLeft: 15 }}>
              <Text style={{ color: "white", fontSize: 22 }}>
              {t("profile.TestLink")} 
              </Text>
            </View>
            {linksList ? (
              linksList.map((items, i) => (
                <View key={i}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      fontFamily: "Rubika",
                      marginVertical: "4%",
                      marginHorizontal: "4%",
                      textTransform: "capitalize",
                    }}
                  >
                    {items.title} : -
                  </Text>
                  <Text
                    editable={true}
                    style={styles.linksInputs}
                    onPress={() => Linking.openURL(items.sourceLink)}
                  >
                    {" "}
                    {items.sourceLink}
                  </Text>
                </View>
              ))
            ) : (
              <Text>No test links found</Text>
            )}
            <View></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
