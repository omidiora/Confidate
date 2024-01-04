import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  RefreshControl,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableOpacity,
  Switch,
  TouchableRipple,
  List,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../../assets/images/Profile.png';
import sideBadge from '../../assets/images/sideBadge.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { saveGmail } from '../Helper/asyncStroageHelper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginReset } from '../redux/actions/login/login.action';
import voiceSecurityImage from '../../assets/images/VoiceSecurity.png';
import voicePasscodeImage from '../../assets/images/VoicePasscode.png';
import profileDummy from '../../assets/images/profileDummy.jpg';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import { useTranslation } from 'react-i18next';
import { StackActions } from '@react-navigation/native';
const { width } = Dimensions.get('window');
import RNRestart from "react-native-restart";
import axios from 'axios';

export default function SideBarContent(props) {
  const { t } = useTranslation();
  let stateEmail = useSelector(state => state.userInfo.user);

  let mapMail = stateEmail ? JSON.stringify(stateEmail) : null;
  mapMail = JSON.parse(mapMail);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(
    mapMail != null ? mapMail.data : null,
  );
  const [state, setState] = useState();
  const [show, setShowPress] = useState(false);
  const [profileData , setProfileData] = useState([])
  const [active, setActive] = React.useState('');
  let token = useSelector(state => state.userLogin.user);

  const storage = async () => {
    const load = await AsyncStorage.removeItem('user');
    ReactNativeForegroundService.stop();
    RNRestart.Restart()
  };

  const logOut = () => {
    storage();
    dispatch(loginReset());
    
    // StackActions.replace('PublicRoute')
  };

  useEffect(()=>{
    // dispatch(getUserDeatils({"email" : token?.user?.email})).then((res)=>{
    //   console.log('RES', res.data)
    // })
    axios.post('https://api.confidateapp.com/api/getProfile' , {"email" : token?.user?.email}).then((res)=>{
      setProfileData(res.data)
    })

  },[])

  const logOutAlert = () =>
    Alert.alert(t("messages.logoutAlert"),t("messages.wantLogout"), [
      {
       
        text:  t("messages.Cancel"), 
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: t("messages.OK") , onPress: logOut },
    ]);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View
      style={{
        flex: 1,
        width: ` ${props.__initialized === true ? width - 10 : '100%'}`,
        height: '100%',
        backgroundColor: '#000000',
      }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <TouchableRipple
              onPress={() => props.navigation.navigate('Profile')}>
              <View
                style={{
                  marginTop: '10%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View style={{ alignSelf: 'flex-start', width: '30%' }}>
                  {mapMail != null ? (
                    profileData.userImage != null ? (
                      <Image
                        source={{
                          uri: profileData.userImage,
                        }}
                        style={{
                          borderWidth: 1,
                          height: 70,
                          width: 70,
                          borderRadius: 10,
                          borderColor: 'grey',
                        }}
                      />
                    ) : (
                      <Image
                        source={profileDummy}
                        style={{
                          borderWidth: 1,
                          height: 70,
                          width: 70,
                          borderRadius: 10,
                          borderColor: 'grey',
                        }}
                      />
                    )
                  ) : (
                    <Image
                      source={profileDummy}
                      style={{
                        borderWidth: 1,
                        height: 70,
                        width: 70,
                        borderRadius: 10,
                        borderColor: 'grey',
                      }}
                    />
                  )}
                </View>

                <View style={{ width: '40%' }}>
                  <Title style={styles.title}>
                    {profileData?.name}
                  </Title>

                  <Text style={styles.caption}>
                    {profileData?.email}
                  </Text>
                </View>

                <View
                  style={{
                    width: '30%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View>
                    <Text style={{ marginRight: '10%' }}>
                      <MaterialIcons
                        name="verified-user"
                        color="#3F6AED"
                        size={28}
                      />
                    </Text>
                  </View>
                  <View>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        props.navigation.navigate('HomeScreenStack')
                      }>
                      <Image
                        source={sideBadge}
                        style={{ width: 40, height: 40, marginTop: '-50%' }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </TouchableRipple>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <Icon
                  name="wechat"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.emergencyMessage')}
              labelStyle={{marginLeft: '-6%',color: 'grey'}}
              onPress={() => props.navigation.navigate('EmergencyUs')}
            />
            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <Icon
                  name="phone"
                  color={'#ffff'}
                  size={size}
                  style={{
                    borderRadius: 50,
                    // padding: 10,
                    backgroundColor: '#EA1B91',
                    height: 45,
                    width: 45,
                    padding: 12,
                  }}
                />
              )}
              label={t('drawer.emergencyContacts')}
              onPress={() => props.navigation.navigate('EmergencyContacts')}
            />
            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <Icon
                  name="comment"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.chat')}
              labelStyle={{ color: 'grey' }}
              onPress={() => props.navigation.navigate('ChatTabNavigation')}
            />
            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <Icon
                  name="image"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.gallery')}
              onPress={() => props.navigation.navigate('Gallery')}
            />
            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="file-clock"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.tests')}
              // onPress={this.gotoMatches}
              onPress={() => props.navigation.navigate('PersonalityTest')}
            />
            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <Icon
                  name="share-alt"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.sendInvite')}
              // onPress={this.gotoAddPost}
              onPress={() => props.navigation.navigate('Share')}
            />
            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-month"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.dateEntry')}
              onPress={() => props.navigation.navigate('DateEntry')}
            />

            <List.Section>
              <List.Accordion
                title={t('drawer.voiceSecurity')}
                left={props => (
                  <View
                    style={{
                      // borderWidth: 1,
                      borderRadius: 50,
                      backgroundColor: '#EA1B91',
                      padding: 10,
                      marginLeft: '2.6%',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={voiceSecurityImage}
                      {...props}
                      style={{
                        width: 24,
                        height: 24,
                        // borderRadius: 10,
                      }}
                    />
                  </View>
                )}
                right={props =>
                  expanded ? (
                    <Icon
                      {...props}
                      name="angle-up"
                      color={'#ffff'}
                      size={26}
                      style={{ marginRight: '5%' }}
                    // style={styles.iconD}
                    />
                  ) : (
                    <Icon
                      {...props}
                      name="angle-down"
                      color={'#ffff'}
                      size={26}
                      style={{ marginRight: '5%' }}
                    // style={styles.iconD}
                    />
                  )
                }
                expanded={expanded}
                onPress={handlePress}
                titleStyle={{
                  color: 'grey',
                  fontFamily: 'Rubkia-Bold',
                  textAlign: 'center',
                  // marginLeft: '5%',
                }}
                descriptionStyle={{
                  color: 'grey',
                }}>
                <List.Item
                  title={t('drawer.practiceMode')}
                  titleStyle={{
                    color: 'grey',
                    // marginHorizontal: '6%',

                    textAlign: 'center',
                  }}
                  left={props => (
                    <Icon
                      {...props}
                      name="cogs"
                      color={'#ffff'}
                      size={24}
                      style={{
                        borderRadius: 50,
                        padding: 8,

                        backgroundColor: '#EA1B91',
                        marginLeft: '6.8%',
                      }}
                    />
                  )}
                  onPress={() => props.navigation.navigate('PracticeMode')}
                />
                <List.Item
                  title={t('drawer.voicePasscode')}
                  titleStyle={{
                    color: 'grey',
                    // marginHorizontal: '6%',
                    paddingLeft: '4%',
                    textAlign: 'center',
                  }}
                  left={props => (
                    <View
                      style={{
                        // borderWidth: 1,
                        borderRadius: 50,
                        backgroundColor: '#EA1B91',
                        padding: 8,
                        marginLeft: '7.8%',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={voicePasscodeImage}
                        {...props}
                        style={{
                          width: 24,
                          height: 24,
                          // borderRadius: 10,
                        }}
                      />
                    </View>
                  )}
                  onPress={() => props.navigation.navigate('AllEmergencyPasscode')}
                />
              </List.Accordion>
            </List.Section>

            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <Icon
                  name="file-text-o"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.safetyResources')}
              onPress={() => props.navigation.navigate('SafetyResources')}
            />

            <DrawerItem
              labelStyle={{ color: 'gray', fontFamily: 'Rubkia-Bold' }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="cog"
                  color={'#ffff'}
                  size={size}
                  style={styles.iconD}
                />
              )}
              label={t('drawer.settings')}
              onPress={() => props.navigation.navigate('Settings')}
            />
          </Drawer.Section>
          <View></View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{
            color: 'gray',
            fontFamily: 'Rubkia-Bold',
            display: 'none',
          }}
          icon={({ color, size }) => (
            <Icon
              name='sign-out'
              color={'#ffff'}
              size={size}
              style={{ transform: [{ rotateY: '180deg' }] }}
            />
          )}
          label="Sign Out"
          onPress={logOutAlert}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#000000',
    // width: 1000
  },
  userInfoSection: {
    paddingLeft: 10,
    paddingBottom: 20,
    // marginLeft: -80
    // padding: 100
    // paddingRight: 100
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    // textAlign: 'center',
    color: '#fff',
    // marginLeft: '5%',
    // paddingLeft: 20,
    fontFamily: 'Rubika-medium',
  },
  caption: {
    fontSize: 10,
    // lineHeight: 14,
    textAlign: 'center',

    fontFamily: 'Rubika-medium',
    color: '#ffff',
    // marginLeft: '-10%',
    // paddingLeft: 50
    // paddingLeft
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    color: '#fff',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    color: '#fff',
  },
  drawerSection: {
    marginTop: 15,
    color: 'white',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    // borderTopColor: '#f4f4f4',
    // borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#fff',
  },
  iconD: {
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#EA1B91',
  },
});
