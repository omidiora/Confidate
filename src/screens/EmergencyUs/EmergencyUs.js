import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Switch,
  Alert,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import sideBadge from "../../../assets/images/sideBadge.png";
import Textarea from "react-native-textarea";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  activateMessage,
  addMessage,
  getMessage,
  deleteMessages,
} from "../../API/listApisServices";
import { MessageAction } from "../../components/commonHelper";
import styles from "./EmerencyStyles";
import { emergencyMessageDeatils } from "../../redux/actions/emergencymessage/emergencymessage.action";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { writePhotoToPath } from "react-native-contacts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EmergencyUs(props) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [textOpen, setTextOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [final, setFinal] = useState("");
  const [active, setActive] = useState(false);
  const [isEnabled, setIsEnabled] = useState({});
  let token = useSelector((state) => state.userLogin.user);
  let userId = token?.user?.id;
  token = token != null ? token.token : null;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const dispatch = useDispatch();
  const [messages, setMessage] = useState([]);
  const [loader, SetLoader] = useState(false);
  const [count, setCount] = useState(0);

  const AlertNotifications = (i) => {
    Alert.alert(
      t("drawer.emergencyMessage"),
      t("messages.deleteMessage"),
      [
        {
          text: t("messages.Cancel"),
          //    onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: t("messages.OK"), onPress: () => deleteMsg(i) },
      ]
    );
  };
  // const AlertNotifications = i => {
  //   MessageAction('info', 'Are you sure you want to delete message?', () =>
  //     deleteMsg(i),
  //   );
  // };

  const onChange = (text) => {
    setText(text);
  };

  const error = () => {
    console.log("erre");
  };
  const openText = () => {
    if (count != 4) {
      setTextOpen(!textOpen);
      setText("");
    } else {
      // alert('You Can add only 4 Messages');
      MessageAction("info", "You can add only 4 messages", error);
    }
  };
  const save = (e) => {
    if (text.length >= 10) {
      SetLoader(true);
      const sendMessage = {
        messageText: text,
        userID: JSON.stringify(userId),
      };

      addMessage(sendMessage, headers)
        .then((rep) => {
          console.log("datamessage Create", rep);
          if (rep.data) {
            SetLoader(false);
            console.log("rep", rep.data);
            setTextOpen(!textOpen);
            getMessages();
            MessageAction("success", t("messages.addedSuccessfully"), error);
          } else {
            SetLoader(false);
            rep.data.errors ? alert(rep.data.errors[0]) : "";
            MessageAction("error", rep.data.errors[0], error);
          }
        })
        .catch((err) => {
          SetLoader(false);
        });
    } else {
      SetLoader(false);
      MessageAction(
        "error",
        "Text length Should be More than 10 letters",
        error
      );
      // alert('Text length Should be More than 10 letters');
    }
  };
  const check = (id) => {
    setActive(id);
    AsyncStorage.setItem("saveMessage", JSON.stringify(id?.messageText));
    // const detailsId = {
    //   id: id.id,
    // };
    // console.log("id", id);
  };
  const deleteMsg = (i) => {
    console.log("id", i);

    const detailsId = {
      id: JSON.stringify(i),
    };
    deleteMessages(detailsId, headers)
      .then((rep) => {
        if (rep.data) {
          getMessages();
          console.log("rep---dele", rep);
          MessageAction("success", t("messages.deletedSuccessfully"), error);
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
    // const params = {
    //   pageNumber: 1,
    //   pageSize: 10,
    // };
    const params = {
      userID: JSON.stringify(userId),
    };

    dispatch(emergencyMessageDeatils(params, headers))
      .then((rep) => {
        console.log("data----", rep.data);
        setMessage(rep.data);
        setCount(rep.data.totalCount);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getMessages();
  }, []);
  const submit = () => {
    save();
    getMessages();
  };
  const goHome = () => {
    props.navigation.navigate("HomeScreenStack");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <Text
              style={styles.backH}
              onPress={() => {
                setTextOpen(false);
                props.navigation.goBack();
              }}
            >
              <Icon name="angle-left" color={"#ffff"} size={24} />
            </Text>
          </View>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>
                {t("drawer.emergencyMessage")}
              </Text>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={openText}>
                <Feather
                  name="plus-circle"
                  size={26}
                  color="#3F6AED"
                  style={{ marginTop: hp("2.2%") }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={goHome}>
                <Image source={sideBadge} style={styles.sideBadge} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.listMessage}>
            {messages?.length > 0 ? (
              messages?.map((item, i) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "80%", marginVertical: "2%" }}>
                      <Text style={styles.content} key={i}>
                        {i + 1}
                        <Text style={{ marginHorizontal: "1%" }}>.</Text>
                        <Text style={{ color: "white" }}>
                          {" "}
                          {item.messageText}
                        </Text>
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
                        disabled={textOpen}
                        value={active.id == item.id ? true : false}
                      />

                      <Text
                        disabled={textOpen}
                        onPress={() => AlertNotifications(item.id)}
                      >
                        <Icon name="trash-o" size={24} color="grey" />
                      </Text>
                    </View>
                  </View>
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
                 {t("messages.NoMessageAdded")}
               
                </Text>
              </View>
            )}
          </View>

          {textOpen && (
            <View style={{ marginHorizontal: 15 }}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={onChange}
                value={text}
                maxLength={120}
                placeholder={"Type Message Here"}
                placeholderTextColor={"grey"}
              />
            </View>
          )}

          <View></View>
        </View>
        <View style={{ marginHorizontal: "2%" }}>
          {textOpen && (
            <Button
              loader={loader}
              disabled={loader}
              submit={submit}
              title={t("settings.save")}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default EmergencyUs;
