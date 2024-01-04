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
import { useTranslation } from "react-i18next";
function Help(props) {
  const { t } = useTranslation();
  let heading = props.route.params;
  console.log(props, heading.title);
  const goBack = () => {
    props.navigation.goBack();
  };
  const goHome = () => {
    props.navigation.navigate('HomeScreenStack');
  };
  
  return (
    <View style={styles.container}>
      <View>
        <AppHeader title={heading.title} goBack={goBack} goHome={goHome} />
        <View>
          <ScrollView>
            {heading.title === t("legal.cookiesPolicy") ? (
              <View style={{marginBottom: '80%', marginTop: 0}}>
                <Text style={styles.header}>{t("legal.cookiesPolicy")}:</Text>
                <Text style={styles.content}>
                {t("legal.cookiesPolicyContent")}
               
                </Text>
                <Text style={styles.header}> {t("legal.whatAreCookies")} </Text>
                <Text style={styles.content}>
                {t("legal.whatAreCookiesContent")}
                </Text>
                <Text style={styles.header}>
                {t("legal.firstPartyAndThirsPartyCookies")}
                </Text>
                <Text style={styles.content}>
                {t("legal.firstPartyAndThirsPartyCookiesContent")}
                </Text>
                <Text style={styles.header}>{t("legal.whatDoWeUseCookies")}</Text>
                <Text style={styles.content}>
                {t("legal.whatDoWeUseCookiesContent")}
                </Text>
              </View>
            ) : heading.title == t("legal.privacyPolicy") ? (
              <View style={{marginBottom: '76%', marginTop: 0}}>
                <Text style={styles.header}> {t("legal.ourCommitmentToYou")}:</Text>
                <Text style={styles.content}>
                {t("legal.ourCommitmentToYouContent")}
                </Text>

                <Text style={styles.header}>
                {t("legal.whereThisprivacyPolicyApplies")}:
                </Text>
                <Text style={styles.content}>
                {t("legal.whereThisprivacyPolicyAppliesContent")}
                </Text>
                <Text style={styles.header}>{t("legal.informationWeCollect")}:</Text>
                <Text style={styles.content}>
                {t("legal.informationWeCollectContent")}
                </Text>
                <Text style={styles.header}>{t("legal.informationYouGIveUs")}:</Text>
                <Text style={styles.content}>
                {t("legal.informationYouGIveUsContent")}
                </Text>
              </View>
            ) : (
              <View style={{marginBottom: '80%', marginTop: 0}}>
                <Text style={styles.header}>
                {t("legal.acceptanceOfTermsOfUseAgreement")}  :
                </Text>
                <Text style={styles.content}>
                {t("legal.acceptanceOfTermsOfUseAgreementContent")} 
             
                </Text>
                <Text style={styles.header}> {t("legal.EligiBility")} :</Text>
                <Text style={styles.content}>
                {t("legal.EligiBilityContent")} 
                </Text>
                <Text style={styles.header}>{t("legal.yourAccount")} :</Text>
                <Text style={styles.content}>
                {t("legal.yourAccountContent")}
                </Text>
                <Text style={styles.header}>
                {t("legal.modifyingTheServicesAndTermination")}:
                </Text>
                <Text style={styles.content}>
                {t("legal.modifyingTheServicesAndTerminationContent")}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // height: '100%',
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
