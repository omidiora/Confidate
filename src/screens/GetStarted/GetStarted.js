import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import getStartedScreen from '../../../assets/images/getStartedScreen.png';
import {SliderBox} from 'react-native-image-slider-box';
import hedaer from '../../../assets/images/hedare.png';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {loginReset} from '../../redux/actions/login/login.action';
let {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function GetStarted(props) {
  const [images, setImages] = useState([
    require('../../../assets/images/getStartedScreen.png'),
    require('../../../assets/images/1.png'),
    require('../../../assets/images/2.png'),
    require('../../../assets/images/3.png'),
  ]);
  const getStart = () => {
    props.navigation.navigate('Disclaimer');
  };

  useEffect(() => {
    //    dispatch(loginReset())
  }, []);
  return (
    <View style={styles.conatiner}>
      <SliderBox
        images={images}
        sliderBoxHeight={height}
        dotColor="#ea1b91"
        inactiveDotColor="#b3fde7"
        style={{
          height: height,
          width: width,
        }}
        paginationBoxVerticalPadding={wp('50%')}
        autoplay
        circleLoop
        disableOnPress={true}
      />
      <View
        style={{
          position: 'absolute',
          top: '42%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{position: 'absolute', left: '-4%', right: '0%', top: '-28%'}}>
          <Image source={hedaer} style={{width: '100%', height: hp('34%')}} />

          <View style={{top: '-30%'}}>
            {/* <Text
              style={{
                fontSize: 21,
                fontWeight: 'bold',
                color: '#1E1E1E',
                textAlign: 'center',
                fontFamily: 'Rubika',
                marginTop: '-4%',
              }}>
              {' '}
              Find <Text style={{color: '#EA1B91'}}> your</Text> love
            </Text> */}
            <Text
              style={{
                fontSize: 16,
                color: '#1E1E1E',
                textAlign: 'center',
                marginTop: '2%',
                fontFamily: 'Rubika',
              }}>
              {' '}
              Your Journey to A More Secure and Confident Dating Life
            </Text>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            paddingTop: '34%',
            position: 'relative',
            top: '110%',
          }}>
          <TouchableOpacity style={styles.button} onPress={getStart}>
            <Text style={styles.logintext}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    height: height,
    width: width,
  },
  button: {
    backgroundColor: '#b3fde6',
    borderRadius: 28,

    width: width - 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '-4%',
  },
  logintext: {
    paddingVertical: 14,
    color: '#ea1b91',
    fontFamily: 'Rubik-Medium',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: 0.24,
  },
});
export default GetStarted;
