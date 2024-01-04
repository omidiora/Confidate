import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {
    flex: 1,
    // height:height,
    // width:width
  },
  backH: {
    marginTop: 20,
    marginLeft: 10,
  },
  sideLogo: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
    //   marginTop: -50,
    marginRight: '6%',
  },
  textValues: {
    position: 'absolute',
    bottom: 150,
  },
  vedioVerify: {
    backgroundColor: '#EA1B91',
    marginHorizontal: wp('4%'),
    height: '55%',
    position: 'absolute',
    top: hp('18%'),
  },
  vedioVerifyHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: hp('2%'),
    borderRadius: 8,
  },
  title: {
    fontSize: wp('5%'),
    marginTop: 3,
    fontWeight: 'bold',

    color: '#fff',

    fontFamily: 'Rubik',
  },
  caption: {
    fontSize: wp('3%'),

    fontFamily: 'Rubik',
    color: '#fff',
    // alignSelf: 'center',
  },

  verification: {
    color: '#ffff',
  },
  verifyHeader: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginVertical: 10,
  },
  verifyContent: {
    color: '#ffff',
    fontSize: 16,
    padding: wp('4%'),
    marginHorizontal: wp('4%'),
    textAlign: 'center',
  },
  verfiyButton: {
    backgroundColor: '#ffff',
    padding: wp('4%'),
    marginHorizontal: wp('4%'),
    marginVertical: hp('1%'),
    borderRadius: 10,
    // marginTop:'8%'
  },
});
