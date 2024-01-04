import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import AppHeader from '../../components/AppHeader';
function TermsandCondtions({navigation}) {
  const goBack = () => {
    navigation.goBack();
  };
  const goHome = () => {
    navigation.navigate('HomeScreenStack');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppHeader title="Terms and Conditions" goBack={goBack} />
        <View style={{marginBottom: 20, marginTop: -26}}>
          <Text style={styles.header}>Terms of use :</Text>
          <Text style={styles.header}>
            Acceptance of Terms of Use Agreement :
          </Text>
          <Text style={styles.content}>
            By creating a Confidate account, whether through a mobile device,
            mobile application or computer (collectively, the “Service”) you
            agree to be bound by (i) these Terms of Use, (ii) our Privacy
            Policy, Cookie Policy, Safety Tips, and safety Guidelines, each of
            which is incorporated by reference into this Agreement, and (iii)
            any terms disclosed and agreed to by you if you purchase additional
            features, products or services we offer on the Service
            (collectively, this "Agreement"). If you do not accept and agree to
            be bound by all the terms of this Agreement, please do not use the
            Service. We may make changes to this Agreement and to the Service
            from time to time. We may do this for a variety of reasons including
            to reflect changes in or requirements of the law, new features, or
            changes in business practices. The most recent version of this
            Agreement will be posted on the Service under Settings and on our
            app, and you should regularly check for the most recent version. The
            most recent version is the version that applies. If the changes
            include material changes to your rights or obligations, we will
            notify you in advance of the changes by reasonable means, which
            could include notification through the Service or via email. If you
            continue to use the Service after the changes become effective, then
            you agree to the revised Agreement.
          </Text>
          <Text style={styles.header}>Eligibility :</Text>
          <Text style={styles.content}>
            You must be at least 18 years of age to create an account on
            Confidate and use the Service. By creating an account and using the
            Service, you represent and warrant that you can form a binding
            contract with Confidate, that you will comply with this Agreement
            and all applicable local, national and international laws, rules and
            regulations, and you have never been convicted of a felony or
            indictable offense (or crime of similar severity), a sex crime, or
            any crime involving violence, and that you are not required to
            register as a sex offender with any state, federal or local sex
            offender registry.
          </Text>
          <Text style={styles.header}>Your Account :</Text>
          <Text style={styles.content}>
            To use Confidate, you may sign in using several ways. For more
            information regarding the information, we collect from you and how
            we use it, please consult our Privacy Policy. You are responsible
            for maintaining the confidentiality of your login credentials you
            use to sign up for Confidate, and you are solely responsible for all
            activities that occur under those credentials. If you think someone
            has gained access to your account, please immediately contact us.
          </Text>
          <Text style={styles.header}>
            Modifying the Service and Termination :
          </Text>
          <Text style={styles.content}>
            Confidate, is always striving to improve the Service and bring you
            additional functionality that you will find engaging and useful.
            This means we may add new product features or enhancements from time
            to time as well as remove some features, and if these actions do not
            materially affect your rights or obligations, we may not provide you
            with notice before taking them. We may even suspend the Service
            entirely, in which event we will notify you in advance unless
            extenuating circumstances, such as safety or security concerns,
            prevent us from doing so
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
export default TermsandCondtions;
