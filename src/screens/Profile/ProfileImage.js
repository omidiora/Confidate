import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Profile from '../../../assets/images/ProfileVerify.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import sideBadge from '../../../assets/images/sideBadge.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import profileDummy from '../../../assets/images/profileDummy.jpg';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import styles from './profileImaStyles';
let {height, width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function ProfileImage(props) {
  let title = props.route.params.title || '';
  let image = props.route.params.image || '';
  let stateEmail = useSelector(state => state.userInfo.user);
  let mapMail = JSON.stringify(stateEmail);
  mapMail = JSON.parse(mapMail);

  console.log('MapProfile', mapMail);
  const [userName, setUserName] = useState(
    mapMail != null ? mapMail.data : null,
  );

  return (
    <View style={{backgroundColor: '#000000'}}>
      <ImageBackground
        source={
          image != null
            ? {uri: image}
            : profileDummy
        }
        style={{width: width, height: height}}
        resizeMode="contain">
        <View>
          <Text style={styles.backH} onPress={() => props.navigation.goBack()}>
            <Icon name="angle-left" color={'#ffff'} size={24} />
          </Text>
        </View>
        <View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate('HomeScreenStack')}>
              <Image source={sideBadge} style={styles.sideLogo} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        {title === 'UploadVedio' ? (
          <View style={styles.vedioVerify}>
            <View style={styles.vedioVerifyHeader}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{width: '30%', marginHorizontal: '2%'}}>
                  {mapMail.data.profileImage != null ? (
                    <Image
                      source={{
                        uri: mapMail.data.profileImage,
                      }}
                      style={{
                        borderWidth: 1,
                        height: 90,
                        width: 90,
                        borderRadius: 10,
                        borderColor: 'grey',
                      }}
                    />
                  ) : (
                    <Image
                      source={profileDummy}
                      style={{
                        borderWidth: 1,
                        height: 90,
                        width: 90,
                        borderRadius: 10,
                        borderColor: 'grey',
                      }}
                    />
                  )}
                </View>

                <View style={{width: '40%'}}>
                  <Title style={styles.title}>
                    {mapMail != null ? mapMail.data.name : 'xxx'}{' '}
                  </Title>
                  <MaterialIcons
                    name="verified-user"
                    color="#ffff"
                    size={28}
                    style={{
                      textAlign: 'right',
                      marginTop: '-22%',
                      marginLeft: '2%',
                    }}
                  />
                  <Caption style={styles.caption}>
                    {mapMail != null ? mapMail.data.email : ''}
                  </Caption>
                </View>
                <View style={{width: '20%'}}>
                  <Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.verification}>
              <Text style={styles.verifyHeader}>Verify Yourself</Text>
              <View>
                <Text style={styles.verifyContent}>
                  Another scenario is. in either cases.neither of the parties
                  look physically like their photos.Hence , our ID tests using
                  photo verification(face identification by AI) prior to the
                  participants first meeting will help to provide some security
                  and confidence that the person in the photo is not a robot or
                  using a fake photo
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.verfiyButton}
              onPress={() => props.navigation.navigate('VerifyProfile')}>
              <Text
                style={{color: '#EA1B91', textAlign: 'center', fontSize: 18}}
                onPress={() => props.navigation.navigate('VerifyProfile')}>
                Get Photo/Video verified
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.textValues}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              {mapMail != null ? mapMail.data.name : ''}{' '}
            </Text>
            <Text style={{color: 'white', fontSize: 16, paddingLeft: 15}}>
              {mapMail != null ? mapMail.data.email : ''}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default ProfileImage;
