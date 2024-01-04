import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import sideBadge from "../../../assets/images/sideBadge.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppHeader from "../../components/AppHeader";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { editPasswords } from "../../API/listApisServices";
import { changePassword } from "../../API/adduser.Service";
import ReactNativeInput from "../../components/ReactNativeInput";
import { MessageAction } from "../../components/commonHelper";
import { useTranslation } from "react-i18next";
import axios from "axios";
function EditPaasword(props) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const showPass = () => {
    setShowPassword(!showPassword);
  };
  const [showUpdatePassword, setshowUpdatePassword] = useState(false);
  const update = () => {
    setshowUpdatePassword(!showUpdatePassword);
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [loader, setLoader] = useState(false);
  let token = useSelector((state) => state.userLogin.user);

  console.log("token", token.user.email);
  const error = () => {
    console.log("err");
  };

  const updatePassword = () => {
    setLoader(true);
    if (oldPassword != "") {
      if (newPassword != "" || reEnterPassword != "") {
        if (newPassword === reEnterPassword) {
          const newPasswordItem = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            email: token?.user?.email,
          };
          changePassword(newPasswordItem)
            .then(rep => {
              if(rep.data.id !== ""){
                MessageAction("success", "Password Updated Successfully", error);
                setLoader(false);
                setReEnterPassword("");
                setNewPassword("");
                setOldPassword("");
                // alert('Password Updated Successfully');
              }
            })
            .catch(err => 
              MessageAction(
                "error",
                "Old Password is not matched",
                error
              )
              );
        } else {
          setLoader(false);
          MessageAction(
            "error",
            "New password and re-enter password not matched",
            error
          );
          // alert('New password and re-enter password not matched');
        }
      } else {
        MessageAction("error", "Please Enter the New password", error);
        // alert('Please Enter the New password');
      }
    } else {
      setLoader(false);
      // alert('Enter the old password');
      MessageAction("error", "Enter the old password", error);
    }
  };
  const goBack = () => {
    props.navigation.goBack();
    setReEnterPassword("");
    setNewPassword("");
    setOldPassword("");
    setshowUpdatePassword(false);
    setShowPassword(false);
  };
  const goHome = () => {
    props.navigation.navigate("HomeScreenStack");
    setReEnterPassword("");
    setNewPassword("");
    setOldPassword("");
    setshowUpdatePassword(false);
    setShowPassword(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <AppHeader
            title={t("settings.editPassword")}
            goBack={goBack}
            goHome={goHome}
          />
          <View style={{ marginTop: -25 }}>
            <View>
              <Text style={styles.passwordText}>
                {t("settings.oldpassword")}
              </Text>
              <ReactNativeInput
                style={styles.input}
                placeholder={t("settings.oldpassword")}
                secureTextEntry={showPassword ? false : true}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                selectionColor="black"
              />

              {showPassword === true ? (
                <MaterialCommunityIcons
                  name="eye"
                  color="grey"
                  size={28}
                  style={styles.eyeIcon}
                  onPress={showPass}
                />
              ) : (
                <MaterialCommunityIcons
                  name="eye-off"
                  color="grey"
                  size={28}
                  style={styles.eyeIcon}
                  onPress={showPass}
                />
              )}
            </View>
            <View>
              <Text style={styles.passwordText}>
                {t("settings.newpassword")}
              </Text>
              <ReactNativeInput
                style={styles.input}
                placeholder={t("settings.newpassword")}
                secureTextEntry={showUpdatePassword ? false : true}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                selectionColor="black"
              />

              {showUpdatePassword === true ? (
                <MaterialCommunityIcons
                  name="eye"
                  color="grey"
                  size={28}
                  style={styles.eyeIcon}
                  onPress={update}
                />
              ) : (
                <MaterialCommunityIcons
                  name="eye-off"
                  color="grey"
                  size={28}
                  style={styles.eyeIcon}
                  onPress={update}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  paddingLeft: "6%",
                  marginTop: "4%",
                }}
              >
                {t("settings.confirmpassword")}
              </Text>
              <ReactNativeInput
                style={styles.input}
                placeholder={t("settings.confirmpassword")}
                secureTextEntry={showUpdatePassword ? false : true}
                value={reEnterPassword}
                onChangeText={(text) => setReEnterPassword(text)}
                selectionColor="black"
              />
              {showUpdatePassword === true ? (
                <MaterialCommunityIcons
                  name="eye"
                  color="grey"
                  size={28}
                  style={styles.eyeIcon}
                  onPress={update}
                />
              ) : (
                <MaterialCommunityIcons
                  name="eye-off"
                  color="grey"
                  size={28}
                  style={styles.eyeIcon}
                  onPress={update}
                />
              )}
            </View>
          </View>
          <View>
            <Button title={t("settings.update")} submit={updatePassword} />
          </View>
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

  button: {
    backgroundColor: "#EA1B91",
    borderRadius: 10,

    height: 55,

    color: "white",
    marginLeft: 15,
    marginRight: 15,
    marginTop: "35%",
    // marginBottom: '6%'
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    // marginTop: 15
    fontSize: 18,
    paddingTop: 15,
  },
  input: {
    color: "grey",
    borderWidth: 1,
    borderColor: "grey",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    fontFamily: "Rubik-Medium",
  },
  eyeIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 14,
    right: 30,
  },
  sideLogo: { width: 60, height: 60, marginRight: 20, marginLeft: 10 },
  passwordText: {
    color: "white",
    fontSize: 18,
    paddingLeft: "6%",
    marginTop: "4%",
    fontFamily: "Rubik-Medium",
  },
});
export default EditPaasword;
