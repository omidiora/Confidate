import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import sideBadge from '../../../assets/images/sideBadge.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../../components/AppHeader';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
export default function SafetyResources(props) {
  const { t, i18n } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };
  const goHome = () => {
    props.navigation.navigate('HomeScreenStack');
  };
  return (
    <View style={styles.conatiner}>
      <ScrollView>
        <View>
          <AppHeader
            title={t('safety.safetyResources')}
            goBack={goBack}
            goHome={goHome}
          />
          <View style={styles.header}>
            <View style={{marginTop: -40}}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 22,
                  paddingLeft: 20,
                  paddingTop: 15,
                }}>
                Safety
              </Text>
              <View style={styles.list}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('SafetyGuide', {
                      title: 'Safety Guidelines',
                    })
                  }>
                  <Text style={styles.listText}>{t('safety.safetyGuidelines')}</Text>
                  <Text style={styles.forw}>
                    <Icon name="file-text" color={'grey'} size={24} />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.list}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('SafetyGuide', {
                      title: 'Safety Policy',
                    })
                  }>
                  <Text style={styles.listText}>{t('safety.safetyPolicy')}</Text>
                  <Text style={styles.forw}>
                    <Icon name="file-text" color={'grey'} size={24} />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.list}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('SafetyGuide', {
                      title: 'Safety Tips',
                    })
                  }>
                  <Text style={styles.listText}>{t('safety.safetyTips')}</Text>
                  <Text style={styles.forw}>
                    <Icon name="file-text" color={'grey'} size={24} />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.list}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('SafetyGuide', {
                      title: 'International Crisis Resources',
                    })
                  }>
                  <Text style={styles.listText}>
                  {t('safety.iCResources')}
                  </Text>
                  <Text style={styles.forw}>
                    <Icon name="file-text" color={'grey'} size={24} />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{marginBottom: '10%'}}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 22,
                  paddingLeft: 20,
                  paddingTop: 15,
                }}>
                Legal
              </Text>
              <View style={styles.list}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('Legal', {
                      title: 'Cookies Policy',
                    })
                  }>
                  <Text style={styles.listText}>{t('safety.cookiesPolicy')}</Text>
                  <Text style={styles.forw}>
                    <Icon name="file-text" color={'grey'} size={24} />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.list}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('Legal', {
                      title: 'Privacy Policy',
                    })
                  }>
                  <Text style={styles.listText}>{t('safety.privacyPolicy')}</Text>
                  <Text style={styles.forw}>
                    <Icon name="file-text" color={'grey'} size={24} />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.list}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('Legal', {title: ' Terms of Use'})
                  }>
                  <Text style={styles.listText}>{t('safety.termsOfUse')}</Text>
                  <Text style={styles.forw}>
                    <Icon name="file-text" color={'grey'} size={24} />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
});
