import React, {useState, useEffect} from 'react';
// import { Router, Scene } from 'react-native-router-flux'
import {
  AddEditContacts,
  EmergencyContacts,
  Home,
  Profile,
  Login,
  Register,
  ForgetPassword,
  VerfiyOtp,
  Disclaimer,
  ResetPassword,
  TestList,
  PersonalityTest,
  EditProfile,
  EmergencyUs,
  Settings,
  EditPaasword,
  VoiceCode,
  AddEditVoicePasscode,
  DateEntry,
  Share,
  Help,
  SafetyGuide,
  Legal,
  AddDateDetails,
  DateList,
  Gallery,
  SafetyResources,
  ProfileImage,
  VerifyProfile,
  GetChat,
  PracticeMode,
  EmergencyPasscode,
} from '../screens/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SideBarContent from '../navigations/SideBarContent';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from '../navigations/BottomNavigation';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {createStackNavigator} from '@react-navigation/stack';
// import Contact from '../screens/Contacts/Contacts';
import {useSelector} from 'react-redux';
import contacts from '../screens/Contacts/Contacts';
import ChatTabNavigation from '../screens/ChatTabNavigations/ChatTabNavigation';
import AllEmergencyPasscode from '../screens/AllEmergencyPasscode/AllEmergencyPasscode';
import BorderlineTest from '../screens/GetStarted/QuizScreen ';

const Stack = createStackNavigator();

const NavigationDrawerStructure = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          textAlign: 'center',
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarLabel: '  Screen',
          tabBarStyle: {
            display: 'none',
          },
          tabBarButton: () => null,
          // tabBarIcon: ({color, size}) => (
          //   <MaterialCommunityIcons name="map-marker" color={color} size={42} />
          // ),

          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={({route}) => ({
          // headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        })}
      />
    </Stack.Navigator>
  );
};

function Route(props) {
  const stated = useSelector(state => state.userLogin.success);
  const token = useSelector(state => state.userLogin.token);

  console.log('stateMaintain ROUTE', token);
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState('');
  let data;
  const storage = async () => {
    const load = await AsyncStorage.getItem('user');
    data = JSON.parse(load);
    data = data ? data.token : null;
    setState(data);
    // console.log(load,'loaded')
  };

  useEffect(() => {
    storage();
  });
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
      initialRouteName=""
      drawerContent={props => <SideBarContent {...props} />}>
      <Drawer.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{headerMode: 'none', headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
        options={{headerMode: 'none', headerShown: false}}
      />
      {/* <Drawer.Screen
        name="Quknkiz"
        component={BorderlineTest}
        options={{headerMode: 'none', headerShown: false}}
      /> */}
      <Drawer.Screen
        name="EmergencyContacts"
        component={EmergencyContacts}
        options={{headerMode: 'none', headerShown: false}}
      />
      <Drawer.Screen name="AddEditContacts" component={AddEditContacts} />
      {/* <Drawer.Screen name='Register' component={Register} />
            <Drawer.Screen name='Login' component={Login} /> */}

      <Drawer.Screen name="TestList" component={TestList} />
      <Drawer.Screen name="PersonalityTest" component={PersonalityTest} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="EmergencyUs" component={EmergencyUs} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="EditPaasword" component={EditPaasword} />
      <Drawer.Screen name="PracticeMode" component={PracticeMode} />
      <Drawer.Screen name="EmergencyPasscode" component={EmergencyPasscode} />
      <Drawer.Screen
        name="AllEmergencyPasscode"
        component={AllEmergencyPasscode}
      />
      <Drawer.Screen name="VoiceCode" component={VoiceCode} />
      <Drawer.Screen
        name="AddEditVoicePasscode"
        component={AddEditVoicePasscode}
      />
      <Drawer.Screen name="DateEntry" component={DateEntry} />
      <Drawer.Screen name="Share" component={Share} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="SafetyGuide" component={SafetyGuide} />
      <Drawer.Screen name="Legal" component={Legal} />
      <Drawer.Screen name="AddDateDetails" component={AddDateDetails} />
      <Drawer.Screen name="DateList" component={DateList} />
      <Drawer.Screen name="Gallery" component={Gallery} />
      <Drawer.Screen name="SafetyResources" component={SafetyResources} />
      <Drawer.Screen name="ProfileImage" component={ProfileImage} />
      <Drawer.Screen name="VerifyProfile" component={VerifyProfile} />
      <Drawer.Screen name="ChatTabNavigation" component={ChatTabNavigation} />
      <Drawer.Screen
        name="GetChat"
        component={GetChat}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen name="AddDateDetails" component={AdOverView} />







            {/*  */}
    </Drawer.Navigator>
  );
}

export default Route;
