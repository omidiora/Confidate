import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import sideBadge from "../../../assets/images/sideBadge.png";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { deletePasscode } from "../../API/listApisServices";
import { useSelector } from "react-redux";
import axios from "axios";
import { MessageAction } from "../../components/commonHelper";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function AllEmergencyPasscode(props) {
  const isFocused = useIsFocused();
  let token = useSelector((state) => state.userLogin.user);
  let userId = token?.user?.id;
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getMessages();
  }, [isFocused]);

  const AlertNotifications = (i) => {
    Alert.alert(
      t("messages.emergencyMessages"), 
    t("messages.deleteMessage"), 
      [
        {
          text: t("messages.Cancel"),
          //    onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: t("messages.OK") , onPress: () => deleteMsg(i) },
      ]
    );
  };

  const deleteMsg = (i) => {
    console.log("id", i);

    const detailsId = {
      id: JSON.stringify(i),
    };
    deletePasscode(detailsId)
      .then((rep) => {
        if (rep.data) {
          getMessages();
          console.log("rep---dele", rep);
          MessageAction("success", "Message Deleted Successfully", error);
        } else {
          MessageAction("error", rep.data.errors[0], error);
        }
      })
      .catch((err) => {
        console.log("err", err);
        // MessageAction('success ', err, error);
      });
  };

  const getMessages = async () => {
    const params = {
      userID: JSON.stringify(userId),
    };
    axios
      .post(`https://api.confidateapp.com/api/getVoicePassword`, params)
      .then((res) => {
        console.log(res?.data,'from get voice password')
        setMessages(res.data);
      }).catch((err)=>{
        // console.log(error,'lamldmalmldlamlmdlm')
      });
  };

  const check = (id) => {
    setActive(id);
    AsyncStorage.setItem("passcodeId", JSON.stringify(id));
    // const detailsId = {
    //   id: id.id,
    // };
    // console.log("id", id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={styles.backH}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Icon name="angle-left" color={"#ffff"} size={24} />
        </Text>
        <View>
          <Text style={styles.headerText}>{t("messages.emergencyPasscode")}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              if (messages?.length < 3) {
                props.navigation.navigate("VoiceCode");
              } else {
                MessageAction("error", "You can add only 3 messages");
              }
            }}
          >
            <Feather
              name="plus-circle"
              size={26}
              color="#3F6AED"
              style={{ marginTop: hp("2.2%") }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("HomeScreenStack");
            }}
          >
            <Image source={sideBadge} style={styles.sideBadge} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.listMessage}>
        {messages?.length > 0 ? (
          messages?.map((item, i) => {
            return (
              <>
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginTop: 20
                  }}
                >
                  <View style={{ width: "80%", marginVertical: "2%" }}>
                    <Text style={styles.content} key={i}>
                      {i + 1}
                      <Text style={{ marginHorizontal: "1%" }}>.</Text>
                      <Text style={{ color: "white", fontSize: 18 }}> {item.passwordText}</Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      // marginHorizontal: '1%',
                      width: "10%",
                      alignSelf: "center",
                    }}
                  >
                    <Switch
                      trackColor={{ false: "grey", true: "#EA1B91" }}
                      thumbColor={item.isActive ? "#EA1B91" : "grey"}
                      // style={{ }}
                      style={{
                        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                        marginVertical: "4%",
                      }}
                      onValueChange={() => check(item)}
                      value={active.id == item.id ? true : false}
                    />

                    <Text onPress={() => AlertNotifications(item.id)}>
                      <Icon name="trash-o" size={24} color="grey" />
                    </Text>
                  </View>

                </View>
                <Divider style={{ backgroundColor: 'gray', width: '98%', height: 1, alignSelf: 'center', marginTop: 5 }} />
              </>
            );
          })
        ) : (
          <View>
            <Text
              style={{
                color: "white",
                fontFamily: "Rubika-medium",
                textAlign: "center",
                marginTop: "50%",
              }}
            >
              {t("messages.NoPasscodeAdded")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 50,
  },
  headerText: {
    color: "white",
    fontSize: wp("5.2%"),
    alignItems: "center",
    paddingRight: 25,
    paddingHorizontal: "6%",
    marginTop: hp("2.2%"),
  },
  sideBadge: {
    width: wp("12%"),
    height: hp("6%"),
    marginRight: 0,
    marginLeft: wp("6%"),
    marginTop: hp("0.6%"),

    alignSelf: "flex-end",
    // right: '2%',
    // top: -5,
  },
  backH: {
    marginTop: 20,
    marginLeft: 10,
  },
});
