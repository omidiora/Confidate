import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import sideBadge from '../../../assets/images/sideBadge.png';
function DateList(props) {
  let listOfDates = props.route.params || '';
  let datesList = listOfDates.list || [];
  console.log();
  const addEntry = () => {
    props.navigation.navigate('DateEntry');
  };
  const dateInfo = (items, i) => {
    console.log(items, i);
    props.navigation.navigate('AddDateDetails', {info: items});
  };
  const forMore = (items, i) => {
    Alert.alert('More Details', 'Click Ok For More Details', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dateInfo(items, i)},
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Icon
            name="angle-left"
            color={'#ffff'}
            size={24}
            style={styles.backH}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>Date Entry List</Text>
            </View>
            <View>
              <Image source={sideBadge} style={styles.sideLogo} />
            </View>
          </View>
        </View>
        <View>
          {datesList.map((items, i) => {
            return (
              <View key={i} style={styles.dateListContainer}>
                <Text style={styles.nameList}>Name : {items.date}</Text>
                <Text style={styles.dateList}>
                  StartDate :{' '}
                  {items.startDate.getUTCDate() +
                    '/' +
                    (items.startDate.getMonth() + 1) +
                    '/' +
                    items.startDate.getUTCFullYear()}
                </Text>
                <Text style={styles.dateList}>
                  EndDate :{' '}
                  {items.end.getUTCDate() +
                    '/' +
                    (items.end.getMonth() + 1) +
                    '/' +
                    items.end.getUTCFullYear()}
                </Text>

                <Text
                  style={styles.moreDetails}
                  onPress={() => forMore(items, i)}>
                  <Icon name="info-circle" size={28} color="grey" />
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={addEntry}>
        <Text style={styles.buttonText} onPress={addEntry}>
          Add Date Entry
        </Text>
      </TouchableOpacity>
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
  header: {
    marginTop: 15,
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#EA1B91',
    borderRadius: 10,
    borderWidth: 3,

    height: 55,

    color: 'white',
    marginLeft: 15,
    marginRight: 15,

    marginBottom: '10%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',

    fontSize: 18,
    paddingTop: 10,
  },
  sideLogo: {
    width: 60,
    height: 60,
    marginRight: 10,
    alignSelf: 'flex-end',
    marginTop: -45,
  },
  dateListContainer: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  nameList: {color: 'grey', fontSize: 18, padding: 5},
  dateList: {color: 'grey', fontSize: 18, padding: 5, paddingBottom: 5},
  moreDetails: {
    paddingRight: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 40,
  },
});
export default DateList;
