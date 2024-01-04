import React from 'react';
import { useTranslation } from 'react-i18next';
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
function Help({navigation, route}) {
  let heading = route.params;
  console.log(route, heading.title);
  const goBack = () => {
    navigation.goBack();
  };
  const goHome = () => {
    navigation.navigate('HomeScreenStack');
  };
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View>
        <AppHeader title={heading.title} goBack={goBack} goHome={goHome} />
        <ScrollView>
          {heading.title === 'Safety Guidelines' ? (
            <View style={{marginBottom: '40%', marginTop: 0}}>
              <Text style={styles.header}>{t('safety.safetyGuidelines')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.safetyGuidelineContent')}
              </Text>
              <Text style={styles.header}>{t('safetyGuidelines.nuditySexual')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.nuditySexualContent')}
              </Text>
              <Text style={styles.header}>{t('safetyGuidelines.harassment')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.harassmentContent')}
              </Text>
              <Text style={styles.header}>{t('safetyGuidelines.hateSpeech')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.hateSpeechContect')}
              </Text>

              <Text style={styles.header}> {t('safetyGuidelines.prostitutionTrafficking')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.prostitutionTraffickingContent')}
              </Text>

              <Text style={styles.header}> {t('safetyGuidelines.minors')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.minorsContent')}
              </Text>
            </View>
          ) : heading.title === 'Safety Policy' ? (
            <View style={{marginBottom: '40%'}}>
              <Text style={styles.header}>{t('safetyGuidelines.ourCommitment')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.ourCommitmentContent')}
              </Text>
              <Text style={styles.header}>{t('safetyGuidelines.userEducation')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.userEducationContent')}
              </Text>
              <Text style={styles.header}> {t('safetyGuidelines.fraud')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.fraudContent')}
              </Text>
              <Text style={styles.header}>
              {t('safetyGuidelines.dataPrivacyPlatformSecurity')} :
              </Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.dataPrivacyPlatformSecurityContent')}
              </Text>
            </View>
          ) : heading.title === 'Safety Tips' ? (
            <View style={{marginTop: 0, marginBottom: '40%'}}>
              <Text style={styles.header}>{t('safetyGuidelines.onlineSafety')} :</Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.onlineSafetyContent')}
              </Text>
              <Text style={styles.header}>
              {t('safetyGuidelines.protectYourPersonalInformation')} :
              </Text>
              <Text style={styles.content}>
              {t('safetyGuidelines.protectYourPersonalInformationContent')}
              </Text>

              <Text style={styles.header}>
               {t('safetyGuidelines.reportAndSuspicious')}:
              </Text>
              <View style={styles.content}>
                <Text style={styles.content}>
                  &#10146; {t('safetyGuidelines.requestsMoneyDonations')}
                </Text>
                <Text style={styles.content}>&#10146; {t('safetyGuidelines.underageUsers')}</Text>
                <Text style={styles.content}>
                  &#10146;{t('safetyGuidelines.harassmentOffensiveMessages')}
                </Text>
                <Text style={styles.content}>
                  &#10146; {t('safetyGuidelines.inappropriateOrHarmful')}
                </Text>

                <Text style={styles.content}>&#10146; {t('safetyGuidelines.fraudulentProfiles')}</Text>
                <Text style={styles.content}>
                  &#10146; {t('safetyGuidelines.fraudulentProfilesContent')}
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.content}>{t('safetyGuidelines.waitingContent')} </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
