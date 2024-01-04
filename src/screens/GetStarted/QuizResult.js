import React, {useRef} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const QuizResult = ({score, totalQuestions = 100}) => {
  const [buttonsVisible, setButtonsVisible] = React.useState(true);
  console.log(score, 'lanld');
  const calculatePercentage = () => {
    return ((score / totalQuestions) * 100).toFixed(2);
  };
  const navigation = useNavigation();

  const viewShotRef = useRef(null);

  const captureAndShareScreenshot = async () => {
    try {
      setButtonsVisible(false);
      const uri = await captureRef(viewShotRef, {
        format: 'jpg',
        quality: 0.8,
      });

      const base64Image = await RNFS.readFile(uri, 'base64');
      const urlString = 'data:image/jpeg;base64,' + base64Image;

      const options = {
        title: 'Share Test',
        message: 'Share Message',
        url: urlString,
        type: 'image/jpeg',
      };

      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to capture and share screenshot.');
    }
  };

  return (
    <View style={styles.container} ref={viewShotRef}>
      <Text style={styles.resultHeader}>Test Result</Text>
      <View
        style={{
          alignSelf: 'center',
          marginLeft: widthPercentageToDP(-55),
          bottom: 50,
        }}>
        <Text style={{fontSize: 60, textAlign: 'center'}}>
          {score} Point 🙂
        </Text>
      </View>
      <View>
        <Text style={styles.resultText}> TEST RESULT!</Text>
        <View style={styles.resultContainer}>
          <Text style={{color: 'white'}}>Your Score:</Text>
          <Text style={styles.score}>{score} Point </Text>
        </View>
        <Text style={styles.percentage}>
          {/* {calculatePercentage()}% Correct */}
        </Text>
        {/* You can add more details or options here */}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {buttonsVisible && (
          <>
            <Button
              title="Okay"
              submit={() => {
                navigation.goBack();
              }}
            />
            <Button
              title="Share"
              submit={() => {
                captureAndShareScreenshot();
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'white',
  },
  percentage: {
    fontSize: 16,
    color: 'green', // Change the color based on performance
  },
});

export default QuizResult;
