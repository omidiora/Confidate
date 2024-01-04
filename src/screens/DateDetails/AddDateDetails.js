import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import sideBadge from '../../../assets/images/sideBadge.png';
import DropDown from 'react-native-paper-dropdown';
import Textarea from 'react-native-textarea';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {locationHistory} from '../../API/listApisServices';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function AddDateDetails(props) {
  const stated = useSelector(state => state.userLogin);

  let token = stated.user.token;
  let details = props.route.params.info || {};
  details = props.route.params.info;
  // alert(JSON.stringify(details))
  const [state, setState] = useState({});
  console.log(details,"state");
  const goBack = () => {
    props.navigation.goBack();
    setState('');
  };
  const goHome = () => {
    props.navigation.navigate('HomeScreenStack');
    setState('');
  };

  const [loactionData, setLocationData] = useState({});
  useEffect(() => {
    setState({...details});
  }, [details]);
  let from = new Date(details.startDate);
  let to = new Date(details.endDate);

  useEffect(() => {
    const daterange = {
      pageNumber: 1,
      pageSize: 10,
      dateFrom: from.toISOString(),
      dateTo: to.toISOString(),
    };
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    // alert(JSON.stringify(daterange))
    locationHistory(daterange, headers).then(rep => {
      console.log('rep---', rep);
      if (rep.data.items.length > 0) {
        setLocationData(rep.data.items);
        console.log('repee', rep);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Icon
            name="angle-left"
            color={'#ffff'}
            size={24}
            style={styles.backH}
            onPress={goBack}
          />
        </View>
        <View style={{marginTop: -10}}>
          <View style={styles.header}>
            <View style={styles.dateDetailsHeader}>
              <Text style={{paddingTop: 13, paddingRight: 10}}>
                <Icon name="info-circle" size={22} color="grey" />
              </Text>
              <Text style={styles.headerText}>Date Details</Text>
            </View>
            <View style={styles.sideLogo}>
              <TouchableOpacity onPress={goHome}>
                <Image source={sideBadge} style={styles.sideImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            value={state.date}
            placeholder="Date Name"
            placeholderTextColor="grey"
            label="Name"
            style={styles.input}>
            {' '}
            {state.dateName ? state.dateName : 'Date Name'}
          </Text>
          <Text style={styles.input}>{state.age ? state.age : 'Age'} </Text>
          <Text style={styles.input}>
            {' '}
            {state.gender
              ? state.gender === 'TRANS'
                ? 'Others'
                : state.gender
              : 'Gender'}{' '}
          </Text>
          <Text label="Name" style={styles.input}>
            {' '}
            {state.number ? state.number : 'Phone no.'}{' '}
          </Text>
          <Text style={styles.input}>
            {' '}
            {state.address ? state.address : 'Address'}
          </Text>
          {/* <Text style={styles.input}>
            {' '}
            {state.dateFrom
              ? moment(state.dateFrom).format('ddd, MMM D, YYYY')
              : 'Start Date'}
          </Text>
          <Text style={styles.input}>
            {' '}
            {state.dateTo
              ? moment(state.dateTo).format('ddd, MMM D, YYYY')
              : 'End Date'}
          </Text> */}
        </View>
        <View style={{marginTop: '8%'}}>
          <Text style={styles.locationHistory}>Location History</Text>
          {loactionData.length > 0 ? (
            loactionData.map(items => (
              <View>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 16,
                    fontFamily: 'Rubika',
                    textAlign: 'center',
                    marginVertical: '1%',
                  }}>
                  {' '}
                  {items.description != null ? items.description : null}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 16,
                    fontFamily: 'Rubika',
                    textAlign: 'center',
                  }}>
                  {' '}
                  {items.description != null
                    ? moment(items.updatedOn).format('YYYY-MM-DD HH:mm:ss')
                    : null}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{color: 'grey', fontSize: 16, fontFamily: 'Rubika'}}>
              No Location History Found
            </Text>
          )}
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
  backH: {
    marginTop: 20,
    marginLeft: 10,
  },
  sideLogo: {
    marginRight: 10,
    alignSelf: 'flex-end',
    marginTop: hp('-4.6%'),
    right: 10,
  },
  sideImage: {
    width: wp('12%'),
    height: hp('6%'),
  },
  header: {
    marginTop: 15,
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginTop: hp('1.2%'),
    fontSize: wp('5.2%'),
  },
  input: {
    borderWidth: 2,
    borderColor: 'grey',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    fontSize: 16,
    padding: 15,
    marginTop: 10,
    color: 'grey',
    textTransform: 'capitalize',
  },
  dateDetailsHeader: {flexDirection: 'row', justifyContent: 'center'},
  locationHistory: {color: 'grey', textAlign: 'center', fontSize: 22},
});
export default AddDateDetails;
