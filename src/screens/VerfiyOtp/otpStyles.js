import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  backH: {
    marginVertical: '3%',
    marginLeft: '2%',
  },
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  imageH: {
    width: '75%',
    height: 70,
    alignSelf: 'center',
    marginVertical: '10%',
  },
  forgetPass: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    // padding: 3,
    paddingTop: '6%',
  },
  foregtPassContent: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 60,
    marginRight: 50,
    marginTop: 10,
    padding: 5,
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20, marginLeft: 40, marginRight: 40},
  cell: {
    width: 60,
    height: 60,
    // lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'white',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 12,
  },
  focusCell: {
    borderColor: '#000',
  },
  timer: {
    color: '#EA1B91',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  seconds: {
    color: 'grey',
  },

  recive: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  resend: {
    color: '#EA1B91',
  },
});
