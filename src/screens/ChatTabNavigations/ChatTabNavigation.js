import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import contacts from '../Contacts/Contacts';
import AddEditContacts from '../EmergencyContacts/AddEditContacts';
import Home from '../Home/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../../components/AppHeader';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import sideBadge from '../../../assets/images/sideBadge.png';
import GetConversations from '../Chat/GetConservation/GetConversation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
function TabStack() {
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="GetConversations"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: 'black',
          textAlign: 'center',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#EA1B91',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="GetConversations"
        component={GetConversations}
        options={{
          tabBarLabel: t('drawer.chat'),
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name={t('chat.Contacts')}
        component={contacts}
        options={{
          // tabBarLabel: 'Contacts',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //     name="settings"
          //     color={'white'}
          //     size={size}
          //   />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}
function ChatTabNavigation(props) {
  const { t, i18n } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Stack.Navigator
      initialRouteName="GetConversations"
      screenOptions={{
        headerTitleStyle: { textAlign: 'center' },
        headerStyle: { backgroundColor: 'black', height: 80 },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="TabStack"
        component={TabStack}
        options={{
          title: t('drawer.friends'),
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <Text style={{ marginLeft: 30 }}>
                <Icon name="angle-left" color={'#ffff'} size={26} />
              </Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            marginLeft: '20%',

            fontSize: 22,
          },
          headerRight: () => (
            <View>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate('HomeScreenStack')}>
                <Image
                  source={sideBadge}
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'flex-end',
                    marginRight: 30,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          ),
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default ChatTabNavigation;
