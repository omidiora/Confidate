import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
function CoustmCallout(props) {
  return (
    <View>
      <View style={{marginRight: '12%'}}>
        <Image
          source={require('../../../assets/images/location.png')}
          style={styles.imageCallout}
          resizeMode="contain"
        />
      </View>
      <View>
        <View style={styles.textContainerCallout}>
          <Text style={styles.textCallout}>{props.markerAddress}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'flex-end',
    // marginTop: -58,

    transform: [{rotate: '270deg'}],
    marginRight: 6.94,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'flex-end',
    transform: [{rotate: '270deg'}],
    marginRight: 6.94,

    marginTop: 3,
    // marginBottom: -15
  },
  imageCallout: {
    width: 26,
    height: 28,
    alignSelf: 'flex-end',
    marginTop: '4%',
  },
  textContainerCallout: {
    backgroundColor: 'transparent',
    width: '80%',

    position: 'absolute',
    marginBottom: '50%',

    borderRadius: 6,
  },
  textCallout: {
    textAlign: 'center',
    paddingBottom: '4%',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CoustmCallout;
