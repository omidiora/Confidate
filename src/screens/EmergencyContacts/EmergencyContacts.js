import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContacts, getContacts } from '../../API/listApisServices';
import { emergencyContactDeatils } from '../../redux/actions/emergencycontcats/emergencycontact.action';
import { Message } from '../../components/commonHelper';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EmergencyContacts(props) {
  let keyvalue = props.route.params;

  const [contacts, setContacts] = useState([]);
  console.log(contacts)
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [active, setActive] = useState(false);
  let token = useSelector(state => state.userLogin.user);
  let userId = token.user.id
  token = token != null ? token.token : null;
  console.log('token', token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const dispatch = useDispatch();
  const AlertNotifications = i => {
    Alert.alert(
     title = t('messages.emergencyContact'),
      t('messages.deleteContact'),
      [
        {
          text: t("messages.Cancel"),
          //    onPress: () => console.log("Cancel Pressed"),
          style: 'cancel',
        },
        { text: t("messages.OK"), onPress: () => deleteMsg(i) },
      ],
    );
  };

  const link = (i, item) => {
    console.log('peops', item);
    props.navigation.navigate('AddEditContacts', {
      text: item,
      bol: true,
      key: i,
      title: t("editContact"),
    });
  };
  const addContact = () => {
    if (count != 4) {
      props.navigation.navigate('AddEditContacts', {
        bol: false,
        title: t("addContacts"),
      });
    } else {
      Message('info',  t("messages.FourContactOnly"));
    }
  };
  const goBack = () => {
    props.navigation.goBack();
  };

  const getContactsDetails = () => {
    setLoader(true);
    const getConatcsDe = {
      userID: JSON.stringify(userId)
    };
    dispatch(emergencyContactDeatils(getConatcsDe, headers))
      .then(rep => {
        console.log('da', rep);
        setContacts(rep.data);
        setCount(rep.data.totalCount);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log('err', err);
      });
  };
  console.log('count', count);
  const reload = () => {
    getContactsDetails();
  };

  const deleteMsg = i => {
    console.log('id', i);

    const detailsId = {
      id: JSON.stringify(i),
    };
    deleteContacts(detailsId, headers)
      .then(rep => {
        getContactsDetails();
        Message('success', t('messages.contactDeletedMsg'));
        console.log('rep---dele', rep);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getContactsDetails();
    });
    return unsubscribe;
  }, [props.navigation]);
  const goHome = () => {
    props.navigation.navigate('HomeScreenStack');
  };
  const { t, i18n } = useTranslation();

  const check = (id) => {
    setActive(id);
    console.log(id)
    AsyncStorage.setItem("contacts", JSON.stringify(id.number));
    // const detailsId = {
    //   id: id.id,
    // };
    // console.log("id", id);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <AppHeader
            title={t('drawer.emergencyContacts')}
            goBack={goBack}
            goHome={goHome}
          />

          <View>
            {loader ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <View style={{ marginTop: -10 }}>
                {contacts?.length > 0 ? (
                  contacts?.map((item, i) => {
                    return (
                      <View style={styles.contactHeader} key={item.id}>
                        <View key={i} onPress={() => link(i, item)}>
                          <Text style={styles.contactText}>{item.name}</Text>
                          <Text style={styles.contactText}>
                            {item.number}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginVertical: '4%',
                          }}>
                          <View style={{ marginHorizontal: '10%' }}>
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
                            {/* <Text
                              style={styles.editIcon}
                              onPress={() => link(i, item)}>
                              {' '}
                              <Icon name="pencil" size={24} color="#3F6AED" />
                            </Text> */}
                          </View>

                          <View style={{ marginLeft: '6%', marginRight: '-15%' }}>
                            <Text
                              onPress={() => AlertNotifications(item.id)}
                              style={{ marginHorizontal: '1%' }}>
                              <Icon name="trash-o" size={24} color="grey" />
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Rubik-medium',
                        fontSize: 16,
                      }}>
                      {t('contactAdded')}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{ marginBottom: '15%', marginHorizontal: '2%' }}>
        <Button submit={addContact} title={t('addContacts')} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    fontFamily: 'Rubika-medium',
  },

  contactHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  contactText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 5,
  },
  editIcon: {
    // paddingVertical:5,
    // marginTop:10
    marginRight: '1%',
  },

  sideBadge: {
    width: 60,
    height: 60,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginTop: -45,
  },
});
export default EmergencyContacts;
