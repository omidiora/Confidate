import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import sideBadge from '../../../assets/images/sideBadge.png';
import profile from '../../../assets/images/Profile.png';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Share,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import {useSelector} from 'react-redux';
function Shared(props) {
  const goBack = () => {
    props.navigation.goBack();
  };
  const goHome = () => {
    props.navigation.navigate('HomeScreenStack');
  };
const { t, i18n } = useTranslation();
  const state = useSelector(state => state.getLinks.links);
  let testLinks = state != null ? state.data : null;
  // const data = testLinks.items.map(items => items.sourceLink);
  // console.log(data.toString());

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Try this amazing security app with voice activated alarm',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //   alert(error.message);
    }
  };
  const onShareTest = async () => {
    // alert(testLinks.items.description);

    const shareOptions = {
      title: 'Share via',
      message: `${
        testLinks != null
          ? testLinks.items.map(
              (items, i) =>
                ` Description ${i + 1} : - ${items.description}` +
                `'\n' Test Link${i + 1} : - ${items.sourceLink} `,
            )
          : 'No links found'
      }`,
      filename: 'test', // only for base64 file in Android
    };
    console.log('opt', shareOptions);

    try {
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        alert('Muneer');
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //   alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <AppHeader title={t("messages.SendInvite")} goBack={goBack} goHome={goHome} />
          <View>
            <Text
              style={{
                color: '#ffff',
                fontSize: 18,
                paddingLeft: 18,
                marginTop: 8,
              }}>
              
              {t("messages.InviteSomeone")}
            </Text>
          </View>

          <TouchableOpacity onPress={onShare}>
            <View
              style={{
                paddingTop: 30,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  backgroundColor: '#000000',
                  textAlign: 'center',
                  color: 'white',
                  paddingRight: 10,
                  marginTop: 3,
                }}>
                <FontAwesome5
                  name="link"
                  color="#EA1B91"
                  size={20}
                  style={{transform: [{rotate: '220deg'}]}}
                />
              </Text>
              <Text
                style={{
                  backgroundColor: '#000000',
                  textAlign: 'center',
                  color: '#3F6AED',
                  fontSize: 20,
                }}>
                   {t("messages.Invite")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                paddingTop: 30,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  backgroundColor: '#000000',
                  textAlign: 'center',
                  color: 'white',
                  paddingRight: 10,
                  marginTop: 3,
                }}>
                <FontAwesome5
                  name="link"
                  color="#EA1B91"
                  size={20}
                  style={{transform: [{rotate: '220deg'}]}}
                />
              </Text>
              <Text
                style={{
                  backgroundColor: '#000000',
                  textAlign: 'center',
                  color: '#3F6AED',
                  fontSize: 20,
                }}>
                   {t("messages.ShareTestLink")}
                  
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  linkShare: {alignSelf: 'center', marginVertical: 16},
});
export default Shared;
