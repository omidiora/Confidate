import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import hedaer from '../../../assets/images/hedare.png';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import GenderDropDown from '../../components/DropDown';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Disclaimer(props) {
  const exitApp = () => {
    BackHandler.exitApp();
  };
  const { t, i18n } = useTranslation();
  const [gender, setGender] = useState("English (İngilizce)");
  const genderArray = ["English (İngilizce)", "Turkish (Türkçe)"];
  const inputRef = useRef({});
  const dropDownText = (props) => {
    return (
      <View style={{ marginHorizontal: "6%" }}>
        <Text>
          <Icon name="angle-down" color="grey" size={20} />
        </Text>
      </View>
    );
  };

  useEffect(() => {
    if (gender == "Turkish (Türkçe)") {
      languageRestart("tr");
      AsyncStorage.setItem("lang", 'tr')
    } else if (gender == "English (İngilizce)") {
      languageRestart("en");
      AsyncStorage.setItem("lang", 'en')
      // RNRestart.Restart();
    }
  }, [gender]);

  function languageRestart(language) {
    i18n.changeLanguage(language);
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Disclaimer</Text>
        </View>
        <View>
          <Image source={hedaer} style={styles.imageH} />
        </View>
        <View>
          <Text style={styles.content}>
            {t("disclaimer.text")}
          </Text>
        </View>
        <View
          style={{ width: "90%", alignSelf: "center", marginTop: "5%" }}
        >
          <GenderDropDown
            ref={inputRef}
            data={genderArray}
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return gender != null ? selectedItem : "Select Language";
            }}
            defaultButtonText={gender}
            buttonStyle={{
              backgroundColor: "black",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "grey",
              paddingRight: 0,
              paddingLeft: 0,
              marginHorizontal: "1%",
              marginBottom: "3%",
              height: 56,
              width: "96%",
            }}
            buttonTextStyle={{
              color: "grey",
              fontSize: 16,
              fontFamily: "Rubika",
              textTransform: "capitalize",
            }}
            renderDropdownIcon={dropDownText}
          />
        </View>
        <View style={styles.buttons}>
          <View>
            <TouchableOpacity style={styles.button} onPress={exitApp}>
              <LinearGradient
                colors={['#A16AEB', '#Ec75F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}>
                <Text style={styles.logintext}>Decline</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={['#A16AEB', '#Ec75F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}>
                <Text
                  style={styles.logintext}
                  onPress={() => props.navigation.navigate('Login')}>
                  Accept
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    paddingTop: '8%',
  },
  imageH: {
    width: '70%',
    height: 50,
    marginTop: '10%',
    alignSelf: 'center',
  },
  content: {
    color: 'grey',
    marginLeft: 30,
    marginRight: 25,
    fontSize: 18,
    lineHeight: 22,
    padding: '7%',
    marginTop: '5%',
  },
  button: {
    marginTop: '60%',
    alignSelf: 'center',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 3,
    height: 55,
    width: 130,
    marginTop: 10,
    color: 'white',
  },
  logintext: {
    padding: 6,
    color: 'white',
    fontFamily: 'Rubik-Medium',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: 0.24,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
export default Disclaimer;
