import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import sideBadge from '../../assets/images/sideBadge.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');
function AppHeader(props) {
  return (
    <View>
      <View>
        <Text style={styles.backH} onPress={props.goBack}>
          <Icon name="angle-left" color={'#ffff'} size={24}  style={{marginTop:310}}/>
        </Text>

        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>{props.title}</Text>
          </View>
          <View style={styles.sideLogo}>
            <TouchableOpacity onPress={props.goHome} style={styles.touhable}>
              {props.showCamera == true ?
                <Entypo name="camera" color={'#ffff'} size={24} />
                : <Image
                  source={sideBadge}
                  style={styles.sideImage}
                // onPress={props.goHome}
                />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  touhable: { top: hp('-4.4%'), right: wp('6%') },
  sideImage: {
    width: wp('12%'),
    height: hp('6%'),
  },
  backH: {
    marginTop: 20,
    marginLeft: 20,
  },
  header: {
    // justifyContent: 'center',
    marginTop: 10,
    // flexDirection: 'row',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: wp('5.2%'),
    width: '90%',

    // paddingRight: 25,
  },
  sideLogo: {
    // width: 60,
    // height: 60,
    alignSelf: 'flex-end',
    // position: 'relative',
    // zIndex: 99,

    // top: -40,
    // right: 10000,
    // bottom: 10,
    // left: 500000,
  },
});
export default AppHeader;
