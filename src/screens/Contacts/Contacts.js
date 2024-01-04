// Import React
import React, { useState, useEffect } from "react";

// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image,
  Keyboard,
  RefreshControl,
  TouchableOpacity,
  Button,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import Contacts, { getCount } from "react-native-contacts";
import { useSelector, useDispatch } from "react-redux";
import { findContacts } from "../../API/listApisServices";
import Icon from "react-native-vector-icons/FontAwesome";
import ChatTabNavigation from "../ChatTabNavigations/ChatTabNavigation";
import { getContactDeatils } from "../../redux/actions/chat/getContact.action";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import profile from "../../../assets/images/processed.jpeg";
import styles from "./ContactsStyle.js";
import ReactNativeInput from "../../components/ReactNativeInput";
import { Message, MessageAction } from "../../components/commonHelper";
import { useTranslation } from "react-i18next";
import axios from "axios";

let granted;
function contacts({ navigation }) {
  const [contact, setContact] = useState([]);
  const [state, setState] = useState(false);
  const [loader, setLoader] = useState(false);

  let token = useSelector((state) => state.userLogin.user);
  const dispatch = useDispatch();
  const [findedContacts, setFindedContacts] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [pages, setPages] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);
  const [serachText, setSearchText] = useState("");
  const [chatList, setChatList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [refreshButton, setRefresButton] = useState(0);
  const [phoneNumbersArray, setPhoneNumbersArray] = useState([]);
  const [contactList, setContactList] = useState([]);
  const onRefresh = () => {
    // setRefreshing(true);
    // setRefresButton(true);
  };

  const reset = async () => {
    setSearchText("");
    if (Platform.OS === "android") {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      // alert(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        loadContacts();
        // setRefresButton(true);
        // alert('muneer---');
        // Message('success', granted);
      } else {
        Message(
          "info",
          "This app would like to view your contacts. So please enable the access from the settings"
        );
      }
    } else {
      loadContacts();
    }
    // accesContacts();
  };

  const headers = {
    Accept: "application/json, text/plain",
    Authorization: `Bearer ${token.token}`,
    "Content-Type": "application/json",
  };

  const getContactList = async () => {
    try {
      axios.get("https://api.confidateapp.com/api/getAllUser").then((res) => {
        // let number = res.data.map((items) => items.number);
        let number = res.data.map((item) => {
          return {
            number: item.number,
            id: item.id,
          };
        });
        setContactList(number);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getChatList = async () => {
    try {
      axios
        .post("https://api.confidateapp.com/api/getChat", {
          userID: token?.user?.id.toString(),
        })
        .then((res) => {
          setChatList(res.data);
        });
    } catch (error) {
      console.log(error, "error");
    }
  };
  const createChat = async (item) => {
    let newChatData = chatList;

    let data = {
      to: token?.user?.id,
      from: item?.id,
      roomId: `toid ${token?.user?.id} fromid ${item.id}`,
      title: item?.number,
    };

    let filterChat = newChatData.find((v) => v.roomId === item.number);
    if (filterChat == undefined) {
      axios
        .post("https://api.confidateapp.com/api/ChatCreate", data)
        .then((res) => {
          if (res.data.id !== "") {
            navigation.navigate("GetChat", { data });
          }
        });
    } else {
      navigation.navigate("GetChat", { data });
    }
  };
  useEffect(() => {
    accesContacts();
    getContactList();
    getChatList();
  }, []);

  const accesContacts = async () => {
    if (Platform.OS === "android") {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      // alert(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        loadContacts();
        // setRefresButton(true);
        // alert('muneer---');
      } else if (granted != PermissionsAndroid.RESULTS.GRANTED) {
        Message(
          "info",
          "This app would like to view your contacts. So please enable the access from the settings"
        );
        // alert(
        //   'This app would like to view your contacts. So please enable the access from the settings',
        // );
      }
    } else {
      loadContacts();
    }
  };
  useEffect(() => {
    accesContacts();
  }, []);

  useEffect(() => {
    setSearchText("");
    loadContacts();
    const willFocusSubscription = navigation.addListener("focus", async () => {
      accesContacts();
    });
    return willFocusSubscription;
  }, []);

  const loadContacts = () => {
    setLoader(true);
    let mobileArray = [];
    let obj;
    if (granted) {
      Contacts.getAll().then((contacts) => {
        console.log(contacts,'33333333333')

        let number = contacts.map((items) => items);
        number.map((items) => {
          obj = items.phoneNumbers.map((item, i) => {
            return mobileArray.push(item.number.replace(/\s/g, ""));
          });
        });


        console.log(mobileArray)
        setPhoneNumbersArray(mobileArray);

        findFriendsList(mobileArray);
      });
    } else {
      setLoader(false);

      // MessageAction(
      //   'info',
      //   'This app would like to view your contacts. So please enable the access from the settings',
      //   error,
      // );
    }
  };
  let listOfContacts = [];
  const findFriendsList = (data) => {
    const details = {
      numbers: data,
    };

    dispatch(getContactDeatils(details, headers))
      .then((rep) => {
        if (rep.data) {
          setRefreshing(false);
          setLoader(false);
          setFindedContacts(rep.data);
          setOriginalData(rep.data);
          listOfContacts.push(rep.data);
          setRefresButton(0);
          // alert(JSON.stringify(rep.data));
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const goBack = () => {
    navigation.goBack();
    setState(true);
  };

  const handleChangeText = (text) => {
    setSearchText(text);
    if (text.length >= 1) {
      let searchNumber;
      searchNumber = originalData;
      let filterSearch = searchNumber.filter((item) => {
        return item.phoneNumber.includes(text);
      });
      setFindedContacts(filterSearch);
    } else {
      loadContacts();
    }
  };

  const numberFilter = contactList.map((item) => {
    return item.number;
  });

  const filterContact = phoneNumbersArray.filter((item) => {
    return numberFilter.includes(item);
  });
  const filterNumber = [...new Set(filterContact)];

  const renderContacts = ({ item, i }) => {
    return (
      <View key={i}>
        <View style={styles.contactsList}>
          <View style={styles.contactListitem}>
            {item.profileImage != null ? (
              <Image
                source={{ uri: item.profileImage }}
                style={styles.contactImage}
              />
            ) : (
              <Image source={profile} style={styles.contactImage} />
            )}
          </View>
          <View key={item.phoneNumber} style={{ marginVertical: "3%" }}>
            <Text
              style={styles.contactsNumber}
              // onPress={() =>
              //   // navigation.navigate("GetChat", { key: item ,  })
              //   console.log(contactList, "contactList")
              // }
              onPress={() => {
                if (contactList.length > 0) {
                  contactList.map((v) => {
                    if (v.number == item) {
                      createChat(v);
                      // navigation.navigate("GetChat", { id : v.id , key : v.number  });
                    }
                  });
                }
              }}
            >
              {item != null ? item : item.phoneNumber}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "70%" }}>
          <ReactNativeInput
            style={styles.containerItem}
            value={serachText}
            placeholder={t("chat.searchNumber")}
            placeholderTextColor="grey"
            onChangeText={(text) => handleChangeText(text)}
            keyboardType="numeric"
          />
          <Text
            style={styles.searcIcon}
            // onPress={searchItem}
          >
            <Icon name="search" color="grey" size={28} />
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.refresBtn} onPress={reset}>
            <Text style={styles.btnText}>{t("chat.refresh")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {loader ? (
          <ActivityIndicator
            color="#ffff"
            size={"large"}
            style={{ marginTop: "10%" }}
          />
        ) : (
          (filterNumber?.length > 0 && (
            <View>
              <FlatList
                data={filterNumber}
                renderItem={renderContacts}
                // keyExtractor={(item, i) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          )) || (
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "grey",
                marginTop: "5%",
              }}
            >
              No Contacts Found
            </Text>
          )
        )}
      </ScrollView>
    </View>

    // </SafeAreaView>
  );
}
export default contacts;
