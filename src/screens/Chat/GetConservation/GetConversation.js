import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getConrDeatils } from "../../../redux/actions/chat/getConversation.action";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Auth from "../../../API/listApisServices";
import profile from "../../../../assets/images/processed.jpeg";
import styles from "./GetConversationStyles.js";
import ReactNativeInput from "../../../components/ReactNativeInput";
import AlertNotification from "../../../components/AlertNotification";
import { Message, MessageAction } from "../../../components/commonHelper";
import { useTranslation } from "react-i18next";
import axios from "axios";

function GetConversations({ navigation }) {
  let token = useSelector((state) => state.userLogin.user);
  // console.log("token", token);
  // token = token != null ? token.token : null;
  let id = token?.user?.id;

  const getConList = useSelector((state) => state.getConser.getList);

  const [stated, setStated] = useState([]);
  const [parties, setParties] = useState([]);
  const [loader, setLoader] = useState(false);
  const [serachText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTrue, setSearchTrue] = useState(false);
  const [stateTrue, setStateTrue] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  const [pages, setPages] = useState("");

  // const dispatch = useDispatch();
  // const error = () => {
  //   console.log('err');
  // };
  const onRefresh = () => {
    setRefreshing(true);

    if (pageNumber <= pages.totalPages && pageSize <= pages.totalCount) {
      setPageSize(pageSize + 20);
      getConservationResult();
    } else {
      // alert('No New Conversations Found');
      Message("info", "No New Conversations Found");
      setRefreshing(false);
    }
  };

  // const getConservationResult = () => {
  //   setLoader(true);
  //   const params = {
  //     pageNumbe: pageNumber,
  //     pageSize: pageSize,
  //   };
  //   const headers = {
  //     Accept: 'application/json, text/plain',
  //     Authorization: `Bearer ${token}`,
  //     Accept: 'application/json',
  //   };
  //   return dispatch(getConrDeatils(params, headers))
  //     .then(rep => {
  //       setRefreshing(false);

  //       setPages(rep.data);
  //       setLoader(false);
  //       setStated(rep.data.items);
  //       setOriginalData(rep.data.items);
  //     })
  //     .catch(err => setLoader(false));
  // };
  // const searchItem = () => {
  //   if (serachText.length > 0) {
  //     setSearchTrue(true);
  //     let searchNumber;
  //     searchNumber = stated.map(item => item.parties);
  //     searchNumber = searchNumber.map(item =>
  //       item.filter(items => {
  //         return items.phoneNumber.includes(serachText);
  //       }),
  //     );
  //     const dataList = searchNumber.flat();
  //     setStated(dataList);
  //   } else {
  //     // alert('Enter the Number to Search ');
  //     Message('info', 'Enter the Number to Search');
  //   }
  // };

  // const handleChangeText = text => {
  //   setSearchText(text);
  //   if (text.length >= 1) {
  //     let searchNumber;
  //     const data = originalData.map(item => item.latestChat);
  //     if (data.toString() != '') {
  //       searchNumber = originalData.map(item => item.parties);
  //       searchNumber = searchNumber.flat();
  //       searchNumber = searchNumber.map(item => item);
  //       const dataArry = searchNumber.filter(items => {
  //         return items && items.phoneNumber.includes(text);
  //       });
  //       setStated(dataArry);
  //     } else {
  //       searchNumber = stated.map(item => item);
  //       const dataArry = searchNumber.filter(items => {
  //         return items.phoneNumber.includes(text);
  //       });
  //       console.log('value', dataArry);
  //       setStated(dataArry);
  //     }
  //   } else {
  //     getConservationResult();
  //   }
  // };

  const getConservationResult = () => {
    axios
      .post("http://44.213.172.99:5000/api/getChat", {
        userID: JSON.stringify(id),
      })
      .then((res) => {
        setStated(res.data);
        // console.log(res.data);
      });
  };

  useEffect(() => {
    getConservationResult();
  }, []);

  const reset = () => {
    setSearchText("");
    getConservationResult();
  };
  // const deleteChat = items =>
  //   return
  //     <AlertNotification
  //       okay={deleteChatAPi}
  //       alertTilte={'Delete Chat'}
  //       items={items}
  //       alertMessage={'Are you sure, you want delete to this conversation?'}
  //     />
  //   );
  // };
  // Alert.alert(
  //   'Delete Chat',
  //   'Are you sure, you want delete to this conversation?',
  //   [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'OK', onPress: () => deleteChatAPi(items)},
  //   ],
  // );

  // const deleteChatAPi = items => {
  //   const deleteItems = {
  //     conversationId: items,
  //   };
  //   const headers = {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${token}`,
  //     Accept: 'application/json',
  //   };
  //   Auth.deleteConversation(deleteItems, headers)
  //     .then(rep => {
  //       if (rep.data.succeeded) {
  //         Message('success', 'Conversation Deleted Successfully');
  //         getConservationResult();
  //       } else {
  //         Message('error', data.errors[0]);
  //         // data.errors != null ? alert(data.errors[0]) : null;
  //       }
  //       console.log('rep', rep);
  //     })
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // };


  const navigateChat = (items) => {
    let data = {
      to : items?.to,
      from : items?.from,
      roomId : `toid ${items?.to} fromid ${items?.from}}`,
      title : items?.title,
    }
    // console.log(items)
    navigation.navigate("GetChat", {data});
  };
  const renderCons = ({ item }) => {
    let data = [];
    data = item.parties != null ? item.parties.map((items) => items) : null;
    let latest = item.latestChat != null ? item.latestChat : null;
    return (
      (data &&
        data.map((items) => (
          <View>
            <View>
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.listContacts}
                  onPress={() => navigation.navigate("GetChat", { key: items })}
                  onLongPress={() => deleteChat(items.conversationId)}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginRight: "10%", marginVertical: "3%" }}>
                      {items.profileImage != null ? (
                        <Image
                          source={{ uri: items.profileImage }}
                          style={styles.listOfImages}
                        />
                      ) : (
                        <Image source={profile} style={styles.listOfImages} />
                      )}
                    </View>
                    <View>
                      <Text style={styles.listOfNames}>
                        {items.name != null ? items.name : items.title}
                      </Text>

                      <Text style={{ color: "grey", marginRight: "2%" }}>
                        {latest != null
                          ? latest.message.length > 40
                            ? `${latest.message.slice(0, 30)}.....`
                            : latest.message
                          : ""}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))) || (
        <View>
          <View>
            <View>
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.listContacts}
                  onPress={()=>{navigateChat(item)}}
                    // () =>
                    // navigation.navigate("GetChat", {
                    //   id: item.id,
                    //   key: item.number,
                    // })
                  // }
                  onLongPress={() => {
                    console.log("Long Press");
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginRight: "10%", marginVertical: "3%" }}>
                      {item.profileImage != null ? (
                        <Image
                          source={{ uri: item.profileImage }}
                          style={styles.listOfImages}
                        />
                      ) : (
                        <Image source={profile} style={styles.listOfImages} />
                      )}
                    </View>
                    <View>
                      <Text style={styles.listOfNames}>
                        {item.roomId != null ? item.title : "Test"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) || (
        <View>
          <Text style={{ color: "grey", fontSize: 16, textAlign: "center" }}>
          {t("noContact")} 
          </Text>
        </View>
      )
    );
  };
  // useEffect(() => {
  //   setSearchText('');
  //   getConservationResult();
  //   const willFocusSubscription = navigation.addListener('focus', () => {
  //     getConservationResult();
  //   });
  //   return willFocusSubscription;
  // }, []);
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "70%" }}>
          <ReactNativeInput
            style={styles.containerChild}
            value={serachText}
            placeholder={t("chat.searchNumber")}
            placeholderTextColor="grey"
            onChangeText={(text) => handleChangeText(text)}
            keyboardType="numeric"
          />
          <Text
            style={styles.searchIcon}
            // onPress={searchItem}
          >
            <Icon name="search" color="grey" size={28} />
          </Text>
        </View>
        <View style={{ marginVertical: "5.4%", width: "21%" }}>
          <TouchableOpacity style={styles.resetBtn} onPress={reset}>
            <Text style={styles.btnText}>{t("chat.refresh")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {loader ? (
          <ActivityIndicator
            size={"large"}
            color="#ffff"
            style={{ marginTop: "10%" }}
          />
        ) : (
          (stated.length > 0 && (
            <View>
              <FlatList
                data={stated}
                renderItem={renderCons}
                keyExtractor={(item, i) => item.id}
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
               {(t("messages.NoConversation"))}
            </Text>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default GetConversations;
