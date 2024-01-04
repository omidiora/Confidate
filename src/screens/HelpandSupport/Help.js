import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import sideBadge from '../../../assets/images/sideBadge.png';
import AppHeader from '../../components/AppHeader';
import { useTranslation } from 'react-i18next';
function Help(props) {
  const { t } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };
  const goHome = () => {
    props.navigation.navigate('HomeScreenStack');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View> 
          <AppHeader title={t('messages.HelpSupport')} goBack={goBack} goHome={goHome} />
          <View>
            <Text style={styles.header}>{t('help&support.CustomerSupportCentre')} </Text>
            <Text style={styles.content}>
            </Text>
            <View style={{marginTop: '5%'}}>
              
              <Text style={styles.content}>{t('help&support.email')}</Text>
            </View>

           
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
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginTop: 10,

    marginHorizontal: 10,
  },
  header: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Rubika-Bold',
    marginHorizontal: '5%',
    marginVertical: 10,
  },
  content: {
    color: 'grey',
    marginHorizontal: '5%',
    fontFamily: 'Rubika-Bold',
    fontSize: 16,
    paddingVertical: 2,
  },
});
export default Help;
