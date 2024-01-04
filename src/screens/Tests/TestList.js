import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import sideBadge from '../../../assets/images/sideBadge.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../../components/AppHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getLinkDeatils} from '../../redux/actions/getUser/getLinks.actions';

function TestList({navigation, route, params}) {
  // alert(JSON.stringify(state.getLinks))
  console.log('props', route);
  let testLinkss = route.params;
  let testData = testLinkss ? testLinkss.key : '';
  console.log('testData', testData);

  const [getLinksContent, setGetLinksContent] = useState([]);
  const [testDetails, setTestDetails] = useState({
    title: '',
    sourceLink: '',
    description: '',
    procedure: '',
    participation: '',
  });
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    setTestDetails(testDetails => ({
      ...testDetails,
      title: testData ? testData.title : '',
      sourceLink: testData ? testData.link : '',
      description: testData ? testData.testType : '',
      procedure: testData ? testData.procedure : '',
      participation: testData ? testData.participation : '',
    }));
  }, [navigation, testLinkss]);

  // alert(JSON.stringify(getLinksContent))

  const goHome = () => {
    navigation.navigate('HomeScreenStack');
  };
  return (
    <View style={styles.container}>
      <AppHeader title={testDetails.title} goBack={goBack} goHome={goHome} />
      <ScrollView>
        <View>
          <View>
            <View style={styles.headerTop}>
              <Text style={styles.headerList}>Source Link : </Text>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 16,
                  fontFamily: 'Ribika-medium',
                  color: '#3F6AED',
                }}
                onPress={() => Linking.openURL(testDetails.sourceLink)}>
                {testDetails.sourceLink}
              </Text>
            </View>
            <View style={styles.headerTop}>
              <Text style={styles.headerList}> Description:</Text>

              <Text style={styles.content}>{testDetails.description}</Text>
            </View>
            {/* <View style={styles.headerTop}>
              <Text style={styles.headerList}>Procedure:</Text>
              <Text style={styles.content}>{testDetails.procedure}</Text>
            </View>
            <View style={styles.headerTop}>
              <Text style={styles.headerList}>Participation:</Text>
              <Text style={styles.content}>{testDetails.participation}</Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    color: '#ffff',
  },
  testType: {
    color: 'grey',
    fontSize: 20,
    // paddingTop: 30,
    paddingLeft: 20,
  },
  list: {
    // flexDirection: 'row'
    // paddingTop: 40,
    // paddingLeft: 30,
    borderBottomWidth: 1,
    paddingBottom: 22,
    borderColor: 'grey',
    marginRight: 18,
    marginLeft: 18,
  },
  listText: {
    color: 'grey',
    fontSize: 16,
    marginTop: 20,
    padding: 3,
  },
  forw: {
    alignSelf: 'flex-end',
    marginTop: -20,
    paddingRight: 10,
    // marginRight: 20
  },
  listTotal: {
    paddingTop: 8,
  },
  headerList: {
    color: 'grey',
    fontSize: 22,
    fontFamily: 'Ribika-medium',
    marginVertical: '2%',
  },
  content: {
    color: 'grey',
    fontSize: 16,
    fontFamily: 'Ribika-medium',
  },
  headerTop: {
    marginHorizontal: '4%',
    marginVertical: '2%',
  },
});

export default TestList;
