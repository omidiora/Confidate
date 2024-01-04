import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
  forwardRef,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDown from "react-native-paper-dropdown";
import Textarea from "react-native-textarea";
import AppHeader from "../../components/AppHeader";
import Button from "../../components/Button";
import moment from "moment";
import { addEntry, dateDetails } from "../../API/listApisServices";
import { useSelector, useDispatch } from "react-redux";
import PhoneInput from "react-native-phone-input";
import styles from "./DateEntryStyles.js";
import ReactNativePaperInput from "../../components/ReactNativePaperInput";
import GenderDropDown from "../../components/DropDown";
import ReactNativeInput from "../../components/ReactNativeInput";
import { dateEntryDeatils } from "../../redux/actions/dateEntry/dateEntry.action";
import { Message, MessageAction } from "../../components/commonHelper";
import { useTranslation } from "react-i18next";
let { width } = Dimensions.get("window");
let fastDay;
let today = moment();
function DateEntry(props) {
  const inputRef = useRef({});
  const state = useSelector((state) => state.userLogin);
  const id = state?.user?.user?.id;
  const { t } = useTranslation();


  const phoneInput = useRef(null);
  let token = state != null ? state.user.token : null;
  const dispatch = useDispatch();

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const [loader, setLoader] = useState(false);
  const [gender, setGender] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [age, setAge] = useState();
  const [text, setText] = useState("");
  const [dateName, setDateName] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsperPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [dateDetailsArray, setDateDetails] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [pageNext, setPageNext] = useState(false);
  const [loaderDetails, setLoaderDetails] = useState(false);
  const [date, setDate] = useState(moment);
  const [endDate, setEndDate] = useState(today);
  const [dateDate, setDateDate] = useState(moment().format("MM"));
  const [dateDay, setDateDay] = useState(moment().format("DD"));
  const [year, setDateYear] = useState(year ? year : moment().format("YYYY"));
  const [dateDateE, setEDateDate] = useState(today.format("MM"));
  const [dateDayE, setEDateDay] = useState(today.format("DD"));
  const [yearE, setEDateYear] = useState(today.format("YYYY"));
  const [formattedValue, setFormattedValue] = useState("");
  const [isReset, setIsReset] = useState(false);
  const genderList = [
    { label: "Male", value: "MALE" },

    { label: "Female", value: "FEMALE" },

    { label: "Others", value: "TRANS" },
  ];

  const onChange = (text) => {
    setText(text);
  };

  //  Start Date
  const changeStartDate = (id, name) => {
    console.log("mOnth", name);
    if (name === "Month") {
      let dateNormal = date;
      dateNormal.add(id, "month");
      setDate(dateNormal);
      setDateDate(date?.format("MM"));
    } else if (name === "Day") {
      let dateNormal = date;
      dateNormal.add(id, "days");
      setDate(dateNormal);
      setDateDay(date?.format("DD"));
    } else if (name === "Year") {
      let dateNormal = date;
      dateNormal.add(id, "year");
      setDate(dateNormal);
      setDateYear(date.format("YYYY"));
    }
  };

  const changeEndDate = (id, name) => {
    if (name === "Month") {
      let dateNorm = endDate;
      dateNorm.add(id, "month");
      setEndDate(dateNorm);
      setEDateDate(endDate?.format("MM"));
      console.log("end", endDate, dateNorm, name);
    } else if (name === "Day") {
      let dateNorm = endDate;
      dateNorm.add(id, "days");
      setEndDate(dateNorm);
      setEDateDay(endDate?.format("DD"));
    } else if (name === "Year") {
      let dateNorm = endDate;
      dateNorm.add(id, "year");
      setEndDate(dateNorm);
      setEDateYear(endDate.format("YYYY"));
    }
  };
  const genderArray = ["MALE", "FEMALE", "OTHERS"];
  const clearIntv = () => {
    clearInterval(fastDay);
  };
  // alert(gender);

  let regexp = /^[0-9\b]+$/;
  const handleChange = (id, name) => {
    if (name === "name") {
      if (id.length < 20) {
        setDateName(id);
      } else {
        MessageAction("info", "Maximum 20 characters allowed");
        // alert('Maximum 12 characters allowed');
      }
    } else if (name == "age") {
      if (id.length <= 3) {
        if (id == "" || regexp.test(id)) setAge(id);
      } else {
        MessageAction("info", "Age length should not be more than  3 digits");
        // alert('Age length should be in 2 digits');
      }
    } else if (name == "mobile") {
      if (id.length <= 15) {
        if (id === "" || regexp.test(id)) setPhoneNumber(id);
      } else {
        // alert('Maximum 10 digits allowed');
        MessageAction("info", "Maximum 15 digits allowed");
      }
    }
  };
  const onPhoneInputChange = (value, iso2) => {
    const newState = {
      phoneInputValue: value,
    };
    if (iso2) {
      newState.countryCode = iso2?.toUpperCase();
    }

    console.log("new", newState, value);

    if ("") {
      MessageAction("info", t("messages.enterDateName"));
    } else {
      if (value.length <= 15) {
        // let values = {...info};
        // values.mobile = value;
        setPhoneNumber(value);
      } else {
        MessageAction("info", " Only 15 digits allowed");
      }
    }
  };
  const error = () => {
    console.log("err");
  };

  const saveDateDetails = () => {
    const checkValid = phoneInput.current.isValidNumber(phoneNumber);
    setLoader(true);
    let startDate = new Date(date);
    let endDates = new Date(endDate);
    if (dateName) {
      if (gender) {
        if (text.length >= 10) {
          if (age >= 18 && age <= 200) {
            if (phoneNumber.length >= 10 && checkValid) {
              if (+startDate <= +endDates) {
                const dateDeatils = {
                //const dateDetails = {
                  name: dateName,
                  //age: age,
                  // gender: gender === 'OTHERS' ? 'TRANS' : gender,
                   //address: text,
                  // dateFrom: date.toISOString(),
                  // dateTo: endDate.toISOString(),
                  // phoneNumber: phoneNumber,
                  address: text,
                  age: age,
                  dateName: dateName,
                  gender: gender === 'OTHERS' ? 'TRANS' : gender,
                  number: phoneNumber,
                  startDate: date.toISOString(),
                  endDate: endDate.toISOString(),
                  userID: JSON.stringify(id),
                };

                if (+startDate === +endDate) {
                  // Perform any additional logic or set specific flags if needed
                  // For example, you could set a flag like "isSameDay" to true to indicate that start and end dates are the same.
                  dateDeatils.isSameDay = true;
                }

                console.log('dateDeatils', dateDeatils);

                addEntry(dateDeatils)
                  .then((rep) => {
                    // console.log(rep, 'repDataEntry');
                    //    alert(JSON.stringify(rep))
                    if (rep.data) {
                      // alert(JSON.stringify(dateDeatils))
                      //alert('Date Details Added Successfully');{
                      if(dateDeatils.isSameDay){
                        console.log("Same day entry detected");
                      }
                      MessageAction(
                        "success",
                        "Date Details Added Successfully"
                      );
                      setLoader(false);

                      setGender(null);

                      setAge("");
                      setPhoneNumber("");
                      setDateName("");
                      setText("");
                      getDateDetails();
                      setEndDate(today);
                      setDate(moment);
                      setDateDate(moment().format("MM"));
                      setDateDay(moment().format("DD"));
                      setDateYear(moment().format("YYYY"));
                      setEDateDate(moment().format("MM"));
                      setEDateDay(moment().format("DD"));
                      setEDateYear(moment().format("YYYY"));
                      setFormattedValue("");
                      phoneInput.current.setValue("+90");
                    } else {
                      //    rep.data.errors?   alert(rep.data.errors[0]) :''
                      MessageAction("error", rep.data.errors[0]);
                    }
                  })
                  .catch((error) => {
                     console.error('Error adding entry:', error);
      MessageAction("error", "Failed to add date details");
                    // alert(err);
                    setLoader(false);
                  });
        } else {
            //   setLoader(false);
             //   MessageAction(
               //   "error",
              //    "Start date must be less than or equal to end date"
             //   );
                // alert('End Date is greater than start date'); 
                MessageAction("error", "End date must be after or equal to start date");
              }
            } else {
              setLoader(false);
              MessageAction(
                "error",
                t("messages.numberLimit")
              );
              // alert(
              //   'Enter 10-Digit Mobile Number or Please Check Format of 10 Digits Mobile Number',
              // );
            }
          } else {
            MessageAction(
              "error",
              t("messages.ageLimit")
            );
            // alert('Age Should be Greater than 18 and less than 45');
            setLoader(false);
          }
        } else {
          MessageAction("error", t("messages.addressCharacters"));
          // alert('Address Should be Minimum 10 Characters');
          setLoader(false);
        }
      } else {
        setLoader(false);
        MessageAction("error", "Please Select Gender");
        // alert('Please Select Gender');
      }
    } else {
      MessageAction("error", "Please Enter Date Name");
      // alert('Please Enter Date Name');
      setLoader(false);
    }
  };

  const dateInfo = (items, i) => {
    console.log(items, i);
    props.navigation.navigate("AddDateDetails", { info: items });
  };
  const forMore = (items, i) => {
    Alert.alert("More Details", "Click Ok For More Details", [
      {
        text: t("messages.Cancel"), 
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: t("messages.OK"), onPress: () => dateInfo(items, i) },
    ]);
  };

  const getDateDetails = () => {
    setLoaderDetails(true);
    // const details = {
    //   pageNumber: page,
    //   pageSize: rowsperPage,
    // };

    dispatch(dateEntryDeatils())
      .then((rep) => {
        console.log(rep.data, "repDataEntry");
        setLoaderDetails(false);
        // alert(rep)
        setDateDetails(rep.data);
        // setTotalCount(rep.data.totalCount);
        // setPageIndex(rep.data.pageIndex);
        // setTotalPage(rep.data.totalPages);
        // alert(JSON.stringify(dateDetailsArray))
      })
      .catch((err) => {
        setLoaderDetails(false);
        console.log(err);
      });
  };
  console.log(pageIndex, totalPages);
  const arrowForward = () => {
    setPage(page >= 1 ? page + 1 : 1);
    if (page) {
      setPageNext(false);
      getDateDetails();
    } else {
      setPageNext(true);
    }
  };
  const arrowBackWard = () => {
    setPage(page >= 1 ? page - 1 : 1);
    if (page > 0) {
      getDateDetails();
    }
  };
  useEffect(() => {
    getDateDetails();
  }, [page, date, endDate, gender, pageIndex, totalPages]);

  const goBack = () => {
    props.navigation.goBack();
    phoneInput.current.setValue("+90");
    setDate("");
  };
  const goHome = () => {
    props.navigation.navigate("HomeScreenStack");
    phoneInput.current.setValue("+90");
  };

  // let regexp = /^[0-9\b]+$/
  const mobileChange = (number) => {
    if (number.length <= 15) {
      if (number === "" || regexp.test(number)) setPhoneNumber(number);
      // text.replace(/[^0-9]/g, '')
    } else {
      MessageAction("info", "Maximum 15 digits allowed");

      // alert('Maximum 10 digits allowed');
    }
  };

  const setItems = (text) => {
    console.log(text);
    setGender(text);
  };
  const dropDownText = (props) => {
    return (
      <View style={{ marginHorizontal: "6%" }}>
        <Text>
          <Icon name="angle-down" color="grey" size={20} />
        </Text>
      </View>
    );
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <AppHeader
              title={"Add Date Entry"}
              goBack={goBack}
              goHome={goHome}
            />
            <View>
              <ReactNativeInput
                placeholder="Date Name"
                placeholderTextColor="grey"
                style={styles.nameInput}
                value={dateName}
                // maxLength={12}
                theme={{
                  colors: { text: "grey", primary: "rgb(128,128,128)" },
                }}
                onChangeText={(text) => handleChange(text, "name")}
                selectionColor="#fff"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: "4%",
                width: "100%",
              }}
            >
              <View style={{ width: "44%" }}>
                <ReactNativeInput
                  placeholder="Age"
                  placeholderTextColor="grey"
                  style={styles.ageInput}
                  value={age}
                  keyboardType={"numeric"}
                  // maxLength={2}
                  theme={{
                    colors: { text: "#fff", primary: "rgb(128,128,128)" },
                  }}
                  onChangeText={(text) => handleChange(text, "age")}
                  selectionColor="#fff"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={{ width: "44%" }}>
                <GenderDropDown
                  ref={inputRef}
                  data={genderArray}
                  onSelect={(selectedItem, index) => {
                    console.log("Gender", selectedItem, index);
                    setGender(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return gender != null ? selectedItem : "Select Gender";
                  }}
                  defaultButtonText="Select Gender"
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
            </View>
            <View>
              <PhoneInput
                ref={phoneInput}
                initialCountry="tr"
                allowZeroAfterCountryCode={false}
                flagStyle={{
                  height: 52,
                  width: "18%",
                  borderRadius: 8,
                }}
                style={{
                  color: "red",
                  // padding: '4%',
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                  marginHorizontal: "4%",
                }}
                textProps={{
                  placeholder: "Enter a phone number...",
                }}
                textStyle={{
                  color: "#fff",
                }}
                onChangePhoneNumber={onPhoneInputChange}
              />
            </View>
            <View style={{ marginHorizontal: "3.6%", marginVertical: "2.2%" }}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={onChange}
                value={text}
                maxLength={120}
                placeholder={"Enter Address"}
                placeholderTextColor={"grey"}
                selectionColor="#fff"
              />
            </View>
            <View>
              <View>
                <View style={styles.dateContainer}>
                  <Text style={styles.header}>Start Date</Text>

                  <View style={styles.conatinerDate}>
                    <View>
                      <Text style={styles.heading}>Month</Text>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ paddingHorizontal: "5%" }}>
                          <ReactNativePaperInput
                            value={dateDate || date.format("MM")}
                            theme={{
                              colors: {
                                text: "#fff",
                                primary: "rgb(128,128,128)",
                              },
                            }}
                            style={styles.textInput}
                          />
                        </View>

                        <View style={{ marginTop: "12%" }}>
                          <TouchableOpacity
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onPress={() => {
                              changeStartDate(1, "Month");
                            }}
                          >
                            <Icon name="caret-up" color="grey" size={24} />
                          </TouchableOpacity>

                          <TouchableHighlight
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onPress={() => {
                              changeStartDate(-1, "Month");
                            }}
                          >
                            <Icon name="caret-down" color="grey" size={24} />
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>

                    <View style={{ marginTop: "11%" }}>
                      <Text style={{ color: "white", fontSize: 22 }}>
                        &#x3a;
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.heading}>Date</Text>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ paddingHorizontal: "5%" }}>
                          <ReactNativePaperInput
                            value={dateDay || date.format("DD")}
                            theme={{
                              colors: {
                                text: "#fff",
                                primary: "rgb(128,128,128)",
                              },
                            }}
                            style={styles.textInput}
                          />
                        </View>

                        <View style={{ marginTop: "12%" }}>
                          <TouchableOpacity
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onPress={() => {
                              changeStartDate(1, "Day");
                            }}
                          >
                            <Icon name="caret-up" color="grey" size={24} />
                          </TouchableOpacity>

                          <TouchableHighlight
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onPress={() => {
                             // changeStartDate(1, "Day");
                              changeStartDate(-1, "Day");
                            }}
                          >
                            <Icon name="caret-down" color="grey" size={24} />
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>

                    <View style={{ marginTop: "11%" }}>
                      <Text style={{ color: "white", fontSize: 22 }}>
                        &#x3a;
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.heading}>Year</Text>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ paddingHorizontal: "5%" }}>
                          <ReactNativePaperInput
                            value={year ? year : date.format("YYYY")}
                            theme={{
                              colors: {
                                text: "#fff",
                                primary: "rgb(128,128,128)",
                              },
                            }}
                            style={{
                              backgroundColor: "transparent",
                              color: "white",
                              fontSize: 20,
                              height: 30,
                              marginTop: "12%",
                              paddingTop: "16%",
                            }}
                          />
                        </View>
                        <View style={{ marginTop: "8%" }}>
                          <TouchableOpacity
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onPress={() => {
                              changeStartDate(1, "Year");
                            }}
                          >
                            <Icon name="caret-up" color="grey" size={24} />
                          </TouchableOpacity>

                          <TouchableHighlight
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onPress={() => {
                              changeStartDate(-1, "Year");
                             // changeStartDate(-1, "Year");
                            }}
                          >
                            <Icon name="caret-down" color="grey" size={24} />
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.dateContainer}>
                  <Text style={styles.header}>End Date</Text>

                  <View style={styles.conatinerDate}>
                    <View>
                      <Text style={styles.heading}>Month</Text>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ paddingHorizontal: "5%" }}>
                          <ReactNativePaperInput
                            value={dateDateE}
                            theme={{
                              colors: {
                                text: "#fff",
                                primary: "rgb(128,128,128)",
                              },
                            }}
                            style={styles.textInput}
                          />
                        </View>

                        <View style={{ marginTop: "12%" }}>
                          <TouchableOpacity
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onLongPressDown={() => {
                              fastDay = setInterval(() => {
                                changeEndDate(1, "Month");
                              }, 100);
                            }}
                            onPress={() => {
                              changeEndDate(1, "Month");
                            }}
                          >
                            <Icon name="caret-up" color="grey" size={24} />
                          </TouchableOpacity>

                          <TouchableHighlight
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onLongPressDown={() => {
                              fastDay = setInterval(() => {
                              //  changeEndDate(1, "Month");
                               changeEndDate(-1, "Month");
                              }, 100);
                            }}
                            onPress={() => {
                              changeEndDate(-1, "Month");
                            }}
                          >
                            <Icon name="caret-down" color="grey" size={24} />
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>

                    <View style={{ marginTop: "11%" }}>
                      <Text style={{ color: "white", fontSize: 22 }}>
                        &#x3a;
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.heading}>Date</Text>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ paddingHorizontal: "5%" }}>
                          <ReactNativePaperInput
                            value={dateDayE}
                            theme={{
                              colors: {
                                text: "#fff",
                                primary: "rgb(128,128,128)",
                              },
                            }}
                            style={styles.textInput}
                          />
                        </View>

                        <View style={{ marginTop: "12%" }}>
                          <TouchableOpacity
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onLongPressDown={() => {
                              fastDay = setInterval(() => {
                                changeEndDate(1, "Day");
                              }, 100);
                            }}
                            onPress={() => {
                              changeEndDate(1, "Day");
                            }}
                          >
                            <Icon name="caret-up" color="grey" size={24} />
                          </TouchableOpacity>

                          <TouchableHighlight
                            delayLongPress={500}
                            onPressOut={clearIntv}
                            onLongPressDown={() => {
                              fastDay = setInterval(() => {
                                changeEndDate(-1, "Day");
                              }, 100);
                            }}
                            onPress={() => {
                              changeEndDate(-1, "Day");
                            }}
                          >
                            <Icon name="caret-down" color="grey" size={24} />
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>

                    <View style={{ marginTop: "11%" }}>
                      <Text style={{ color: "white", fontSize: 22 }}>
                        &#x3a;
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.heading}>Year</Text>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ paddingHorizontal: "5%" }}>
                          <ReactNativePaperInput
                            value={yearE}
                            theme={{
                              colors: {
                                text: "#fff",
                                primary: "rgb(128,128,128)",
                              },
                            }}
                            style={{
                              backgroundColor: "transparent",
                              color: "white",
                              fontSize: 20,
                              height: 30,
                              marginTop: "12%",
                              paddingTop: "16%",
                            }}
                          />
                        </View>
                        <View style={{ marginTop: "8%" }}>
                          <TouchableOpacity
                            //   delayLongPress={500}
                            //   onPressOut={clearIntv}
                            //   onLongPressDown={() => {
                            //       fastDay = setInterval(() => {
                            //           changeEndDate(1,'Year')
                            //       }, 100)
                            //   }}

                            onPress={() => {
                              changeEndDate(1, "Year");
                            }}
                          >
                            <Icon name="caret-up" color="grey" size={24} />
                          </TouchableOpacity>

                          <TouchableHighlight
                            onPress={() => {
                              changeEndDate(-1, "Year");
                            }}
                          >
                            <Icon name="caret-down" color="grey" size={24} />
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Button
                title={"Save"}
                loader={loader}
                disabled={loader}
                submit={saveDateDetails}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                marginHorizontal: 15,
                marginVertical: 15,
              }}
            >
              Date Details
            </Text>
            {loaderDetails ? (
              <ActivityIndicator
                size="large"
                color="#ffff"
                style={{ marginVertical: "10%" }}
              />
            ) : dateDetailsArray ? (
              dateDetailsArray.map((items, i) => {
                return (
                  <View key={items.id} style={styles.dateListContainer}>
                    <View>
                      <Text style={styles.nameList}>Name </Text>
                      <Text style={styles.detalsList}>{items.dateName}</Text>
                    </View>
                    <View>
                      <Text style={styles.nameList}>Age </Text>
                      <Text style={styles.detalsList}>{items.age}</Text>
                    </View>
                    <View>
                      <Text style={styles.dateList}> Start Date</Text>
                      <Text style={styles.detalsList}>
                        {moment(items.dateFrom).format("ddd, MMM D, YYYY")}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={styles.moreDetails}
                        onPress={() => forMore(items, i)}
                      >
                        <Icon name="info-circle" size={28} color="grey" />
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{ textAlign: "center", color: "white" }}>
                Add Date Details
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: "10%",
            }}
          >
            <TouchableOpacity
              disabled={pageIndex <= 1 ? true : false}
              onPress={arrowBackWard}
            >
              <Text style={{ textAlign: "center", paddingLeft: "10%" }}>
                <Icon name="chevron-circle-left" color={"white"} size={28} />
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center",
                paddingTop: "1%",
              }}
            >
              {" "}
              {loaderDetails
                ? ""
                : `${pageIndex != null ? pageIndex : 0}-${
                    totalPages != null ? totalPages : 0
                  }`}
            </Text>
            <TouchableOpacity
              disabled={pageIndex >= totalPages ? true : false}
              onPress={arrowForward}
            >
              <Text style={{ paddingRight: "10%" }}>
                <Icon name="chevron-circle-right" color={"white"} size={28} />
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
}

export default DateEntry;
