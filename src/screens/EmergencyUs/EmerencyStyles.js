import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    fontFamily: 'Rubik-Medium',
  },
  backH: {
    marginTop: 20,
    marginLeft: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: wp('5.2%'),
    alignItems: 'center',
    paddingRight: 25,
    paddingHorizontal: '6%',
    marginTop: hp('2.2%'),
  },

  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,

    borderColor: 'grey',
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 16,
    color: '#ffff',
  },
  button: {
    backgroundColor: '#EA1B91',
    borderRadius: 10,

    height: 55,

    color: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginTop: '10%',
    marginBottom: '6%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 15,
  },
  listMessage: {
    marginVertical: '6%',
  },
  sideBadge: {
    width: wp('12%'),
    height: hp('6%'),
    marginRight: 0,
    marginLeft: wp('6%'),
    marginTop: hp('0.6%'),

    alignSelf: 'flex-end',
    // right: '2%',
    // top: -5,
  },

  content: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'left',
    paddingHorizontal: '2.1%',
  },
  switchEnableBorder: {
    borderColor: '#6fa6d3',
    borderWidth: 1,
  },

  switchDisableBorder: {
    borderColor: '#f2f2f2',
    borderWidth: 1,
  },
});
