import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  listAllQuestions,
  listAllSecondQuestions,
  submitQuiz,
} from '../../API/listApisServices';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
import {useTranslation} from 'react-i18next';
import {getLinkDeatils} from '../../redux/actions/getUser/getLinks.actions';
import QuizResult from '../GetStarted/QuizResult';

const BorderlineTest = () => {
  const questions = [
    // Your array of questions and options here
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [topic, setTopic] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [hideQuestion, sethideQuestion] = useState(false);

  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setloading] = useState(false);
  const [resultToAnswer, setResultToAnswer] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({
    quiz_id: 1,
    email: user?.user?.email,
    answers: {},
  });
  const navigation = useNavigation();
  const [showPage, setShowPage] = useState(true);

  let user = useSelector(state => state.userLogin.user);
  let token = user != null ? user.token : null;

  const headers = {
    Accept: 'application/json, text/plain',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const error = () => {
    console.log('erre');
  };

  React.useEffect(() => {
    listAllSecondQuestions()
      .then(response => {
        setShowPage(false);
        setTopic(response?.data?.data?.quiz);
        setQuestionsData(response?.data?.data?.questions_data);
      })
      .catch(err => {
        setShowPage(false);
        console.log(err);
      })
      .finally(false);
  }, [questionsData]);

  const [answers, setAnswers] = useState({});
  const quizId = 1; // Replace with the actual quiz ID
  const userEmail = 'hamza.hussain335@gmail.com'; // Replace with the actual email

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: {
        ...(answers[questionId] || {}),
        [Object.keys(answers[questionId] || {}).length]: value,
      },
    });
  };

  const submitAnswers = () => {
    setloading(true);
    const formattedAnswers = {
      quiz_id: quizId,
      email: userEmail,
      answers: {},
    };

    // Loop through the answers object to restructure it as required
    Object.keys(answers).forEach(questionId => {
      const questionAnswers = {};
      Object.keys(answers[questionId]).forEach(index => {
        questionAnswers[index] = answers[questionId][index];
      });
      formattedAnswers.answers[questionId] = questionAnswers;
    });

    // Loop through the answers object to restructure it as required
    Object.keys(answers).forEach(questionId => {
      const questionAnswers = {};
      Object.keys(answers[questionId]).forEach(index => {
        questionAnswers[index] = answers[questionId][index];
      });
      formattedAnswers.answers[questionId] = questionAnswers;
    });
    const unansweredQuestions = questionsData.filter(
      question =>
        !answers[question.id] || Object.keys(answers[question.id]).length === 0,
    );

    if (unansweredQuestions.length > 0) {
      Alert.alert('Test', 'Please answer all questions before submitting.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      submitQuiz(formattedAnswers, headers)
        .then(response => {
          setloading(false);
          console.log(
            response?.data?.data?.points,
            'response?.data?.datalnlnlnlk?.points',
          );
          setResultToAnswer(response?.data?.data?.points);
          sethideQuestion(true);
          // Alert.alert(
          //   `You got  ${response?.data?.data?.points} point !!!! ☺️. `,
          // );
          // Alert.alert(
          //   'Question',
          //   `You got  ${response?.data?.data?.points} point !!!! ☺️. `,
          //   [{text: 'OK', onPress: () => navigation.navigate('DrawerRoute')}],
          // );
          return response?.data?.data;
        })
        .catch(err => {
          console.log(err, 'error from quiz');
          setloading(false);
        })
        .finally(() => {
          setloading(false);
        });
    }

    // Here, you can perform further actions like sending the formattedAnswers to an API endpoint
  };

  const Validation = () => {};

  const renderOption = ({item, questionId}) => {
    const isSelected =
      answers[questionId] &&
      answers[questionId][Object.keys(answers[questionId]).length - 1] ===
        item.option;

    return (
      <TouchableOpacity
        style={[styles.optionButton, isSelected && styles.selectedOption]}
        onPress={() => handleAnswer(questionId, item.option)}>
        <Text
          style={[styles.optionText, isSelected && styles.selectedOptionText]}>
          {item.option}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderQuestion = ({item: question}) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.title}</Text>
      <FlatList
        data={question.options}
        renderItem={option =>
          renderOption({item: option.item, questionId: question.id})
        }
        keyExtractor={option => `${question.id}-${option.value}`}
      />
    </View>
  );

  const goBack = () => {
    navigation.goBack();
  };
  const dispatch = useDispatch();
  const [getLinksContent, setGetLinksContent] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [loader, setLoader] = useState(false);
  const {t, i18n} = useTranslation();
  const goHome = () => {
    navigation.navigate('HomeScreenStack');
  };
  const testLinks = () => {
    setLoader(true);
    dispatch(getLinkDeatils())
      .then(rep => {
        // console.log('rep', rep.data);
        setGetLinksContent(rep.data);
        JSON.stringify(rep);
        setLoader(false);
        console.log('rere', rep.data.items);
        // alert(JSON.stringify(rep))
      })
      .catch(err => {
        setLoader(false);
        alert(err);
      });
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      testLinks();
    });
    return willFocusSubscription;
  }, []);

  return (
    <View style={[styles.container, hideQuestion && {padding: 0}]}>
      <AppHeader
        title={t('Test Category')}
        goBack={goBack}
        goHome={goHome}
        marginTop={30}
      />
      {showPage ? (
        <View
          style={{alignSelf: 'center', marginTop: heightPercentageToDP(30)}}>
          <ActivityIndicator size={'large'} color="green" />
          <Text style={styles.question}>Loading Question!!</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity>
            <Text>{'Borderline Personality Test'}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>{'Pychopathy Test'}</Text>
          </TouchableOpacity>
          
          {hideQuestion ? (
            <QuizResult score={resultToAnswer} />
          ) : (
            <>
              <FlatList
                data={questionsData}
                renderItem={renderQuestion}
                keyExtractor={question => question.id}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => submitAnswers()}>
                <Text style={styles.submitText}>
                  {loading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    'Submit'
                  )}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: 'black',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  question: {
    color: 'white',
  },
});

export default BorderlineTest;
