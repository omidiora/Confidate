// import React, { useState, useEffect } from 'react'
// import { Platform, StyleSheet, Text, TouchableHighlight, View, Image, TouchableOpacity } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import moment from 'moment'
// import Icon from 'react-native-vector-icons/FontAwesome'
// let fastDay;
// let today = moment()


// function Calender() {

//     const [date, setDate] = useState(moment)
//     const [endDate, setEndDate] = useState(today)
//     const [dateDate, setDateDate] = useState(date.format('MM'))
//     const [dateDay, setDateDay] = useState(date.format('DD'))
//     const [year, setDateYear] = useState(date.format('YYYY'))
//     const [dateDateE, setEDateDate] = useState(endDate.format('MM'))
//     const [dateDayE, setEDateDay] = useState(endDate.format('DD'))
//     const [yearE, setEDateYear] = useState(endDate.format('YYYY'))

//     const changeStartDate = (id, name) => {
//         console.log('mOnth', name)
//         if (name === 'Month') {
//             let dateNormal = date
//             dateNormal.add(id, "month")
//             setDate(dateNormal)
//             setDateDate(date?.format('MM'))
//         }
//         else if (name === 'Day') {
//             let dateNormal = date
//             dateNormal.add(id, "days")
//             setDate(dateNormal)
//             setDateDay(date?.format('DD'))
//         }
//         else if (name === 'Year') {
//             let dateNormal = date
//             dateNormal.add(id, "year")
//             setDate(dateNormal)
//             setDateYear(date.format('YYYY'))
//         }

//     }

//     const changeEndDate = (id, name) => {
//         if (name === 'Month') {
//             let dateNorm = endDate
//             dateNorm.add(id, "month")
//             setEndDate(dateNorm)
//             setEDateDate(endDate?.format('MM'))
//             console.log('end',endDate,dateNorm,name)
//         }
//         else if (name === 'Day') {
//             let dateNorm = endDate
//             dateNorm.add(id, "days")
//             setEndDate(dateNorm)
//             setEDateDay(endDate?.format('DD'))
//         }
//         else if (name === 'Year') {
//             let dateNorm = endDate
//             dateNorm.add(id, "year")
//             setEndDate(dateNorm)
//             setEDateYear(endDate.format('YYYY'))
//         }

//     }


//     const clearIntv = () => {
//         clearInterval(fastDay)
//     }





//     return (
//         <View>
//             <View style={styles.dateContainer} >
//                 <Text style={styles.header}>Start Date</Text>

//                 <View style={styles.conatiner}>
//                     <View>
//                         <Text style={styles.heading}>Month</Text>
//                         <View style={{ flexDirection: 'row' }}>
//                             <View style={{ paddingHorizontal: '5%' }}>
//                                 <TextInput value={date.format('MM')}
//                                     theme={{ colors: { text: 'grey', primary: 'rgb(128,128,128)' } }}
//                                     style={styles.textInput}
//                                 />
//                             </View>


//                             <View style={{ marginTop: '12%' }}>
//                                 <TouchableOpacity
//                                     delayLongPress={500}
//                                     onPressOut={clearIntv}
//                                     onPress={() => { changeStartDate(1, 'Month') }}

//                                 >

//                                     <Icon name='caret-up' color='grey' size={24} />

//                                 </TouchableOpacity>



//                                 <TouchableHighlight
//                                     delayLongPress={500}
//                                     onPressOut={clearIntv}
//                                     onPress={() => { changeStartDate(-1, 'Month') }}


//                                 >

//                                     <Icon name='caret-down' color='grey' size={24} />


//                                 </TouchableHighlight>

//                             </View>

//                         </View>


//                     </View>

//                     <View style={{ marginTop: "11%" }}><Text style={{ color: 'white', fontSize: 22 }}>&#x3a;</Text></View>



//                     <View>
//                         <Text style={styles.heading}>Date</Text>
//                         <View style={{ flexDirection: 'row', }}>


//                             <View style={{ paddingHorizontal: '5%' }}>

//                                 <TextInput value={date.format('DD')}
//                                     theme={{ colors: { text: 'grey', primary: 'rgb(128,128,128)' } }}
//                                     style={styles.textInput}

//                                 />

//                             </View>

//                             <View style={{ marginTop: '12%' }}>
//                                 <TouchableOpacity
//                                     delayLongPress={500}
//                                     onPressOut={clearIntv}
//                                     onPress={() => { changeStartDate(1, 'Day') }}>




//                                     <Icon name='caret-up' color='grey' size={24} />

//                                 </TouchableOpacity>

//                                 <TouchableHighlight
//                                     delayLongPress={500}
//                                     onPressOut={clearIntv}
//                                     onPress={() => { changeStartDate(-1, 'Day') }}>

//                                     <Icon name='caret-down' color='grey' size={24} />

//                                 </TouchableHighlight>
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ marginTop: "11%" }}><Text style={{ color: 'white', fontSize: 22 }}>&#x3a;</Text></View>
//                     <View>
//                         <Text style={styles.heading}>Year</Text>
//                         <View style={{ flexDirection: 'row' }}>
//                             <View style={{ paddingHorizontal: '5%' }}>
//                                 <TextInput value={date.format('YYYY')}

//                                     theme={{ colors: { text: 'grey', primary: 'rgb(128,128,128)' } }}
//                                     style={{ backgroundColor: 'transparent', color: 'white', fontSize: 20, height: 30, marginTop: '12%', paddingTop: "16%" }}
//                                 />
//                             </View>
//                             <View style={{ marginTop: '8%' }}>
//                                 <TouchableOpacity
//                                     delayLongPress={500}
//                                     onPressOut={clearIntv}
//                                     onPress={() => { changeStartDate(1, 'Year') }}>


//                                     <Icon name='caret-up' color='grey' size={24} />

//                                 </TouchableOpacity>




//                                 <TouchableHighlight

//                                     delayLongPress={500}
//                                     onPressOut={clearIntv}

//                                     onPress={() => { changeStartDate(-1, 'Year') }}
//                                 >


//                                     <Icon name='caret-down' color='grey' size={24} />


//                                 </TouchableHighlight>
//                             </View>
//                         </View>

//                     </View>








//                 </View>
//             </View>


//             <View style={styles.dateContainer}>
//                 <Text style={styles.header}>End Date</Text>

//                 <View style={styles.conatiner}>
//                     <View>
//                         <Text style={styles.heading}>Month</Text>
//                         <View style={{ flexDirection: 'row' }}>
//                             <View style={{ paddingHorizontal: '5%' }}>
//                                 <TextInput value={endDate.format('MM')}
//                                     theme={{ colors: { text: 'grey', primary: 'rgb(128,128,128)' } }}
//                                     style={styles.textInput}
//                                 />
//                             </View>


//                             <View style={{ marginTop: '12%' }}>
//                                 <TouchableOpacity
//                                  delayLongPress={500}
//                                  onPressOut={clearIntv}
//                                  onLongPressDown={() => {
//                                      fastDay = setInterval(() => {
//                                          changeEndDate(1,'Month')
//                                      }, 100)
//                                  }}
//                                     onPress={() => { changeEndDate(1, 'Month') }}

//                                 >

//                                     <Icon name='caret-up' color='grey' size={24} />

//                                 </TouchableOpacity>



//                                 <TouchableHighlight
//   delayLongPress={500}
//   onPressOut={clearIntv}
//   onLongPressDown={() => {
//       fastDay = setInterval(() => {
//           changeEndDate(-1,'Month')
//       }, 100)
//   }}

//                                     onPress={() => { changeEndDate(-1, 'Month') }}


//                                 >

//                                     <Icon name='caret-down' color='grey' size={24} />


//                                 </TouchableHighlight>

//                             </View>

//                         </View>


//                     </View>

//                     <View style={{ marginTop: "11%" }}><Text style={{ color: 'white', fontSize: 22 }}>&#x3a;</Text></View>



//                     <View>
//                         <Text style={styles.heading}>Date</Text>
//                         <View style={{ flexDirection: 'row', }}>


//                             <View style={{ paddingHorizontal: '5%' }}>

//                                 <TextInput value={endDate.format('DD')}
//                                     theme={{ colors: { text: 'grey', primary: 'rgb(128,128,128)' } }}
//                                     style={styles.textInput}

//                                 />

//                             </View>

//                             <View style={{ marginTop: '12%' }}>
//                                 <TouchableOpacity
//                                   delayLongPress={500}
//                                   onPressOut={clearIntv}
//                                   onLongPressDown={() => {
//                                       fastDay = setInterval(() => {
//                                           changeEndDate(1,'Day')
//                                       }, 100)
//                                   }}
//                                   onPress={() => { changeEndDate(1, 'Day') }}
//                                 >



                            

//                                         <Icon name='caret-up' color='grey' size={24} />
                          
//                                 </TouchableOpacity>

//                                 <TouchableHighlight 
                                 
                                    
//                                     delayLongPress={500}
//                                     onPressOut={clearIntv}
//                                     onLongPressDown={() => {
//                                         fastDay = setInterval(() => {
//                                             changeEndDate(-1,'Day')
//                                         }, 100)
//                                     }}
//                                     onPress={() => { changeEndDate(-1, 'Day') }}
//                                     >

//                                         <Icon name='caret-down' color='grey' size={24} />
                                  

//                                 </TouchableHighlight>
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ marginTop: "11%" }}><Text style={{ color: 'white', fontSize: 22 }}>&#x3a;</Text></View>
//                     <View>
//                         <Text style={styles.heading}>Year</Text>
//                         <View style={{ flexDirection: 'row' }}>
//                             <View style={{ paddingHorizontal: '5%' }}>
//                                 <TextInput value={endDate.format('YYYY')}

//                                     theme={{ colors: { text: 'grey', primary: 'rgb(128,128,128)' } }}
//                                     style={{ backgroundColor: 'transparent', color: 'white', fontSize: 20, height: 30, marginTop: '12%', paddingTop: "16%" }}
//                                 />
//                             </View>
//                             <View style={{ marginTop: '8%' }}>
//                                 <TouchableOpacity 
//                                 //   delayLongPress={500}
//                                 //   onPressOut={clearIntv}
//                                 //   onLongPressDown={() => {
//                                 //       fastDay = setInterval(() => {
//                                 //           changeEndDate(1,'Year')
//                                 //       }, 100)
//                                 //   }}
                                
//                                 onPress={() => { changeEndDate(1, 'Year') }}>


//                                     <Icon name='caret-up' color='grey' size={24} />

//                                 </TouchableOpacity>




//                                 <TouchableHighlight

//                                     // delayLongPress={500}
//                                     // onPressOut={clearIntv}
//                                     // onLongPressDown={() => {
//                                     //     fastDay = setInterval(() => {
//                                     //         changeEndDate(-1,'Year')
//                                     //     }, 100)
//                                     // }}
//                                     onPress={() => { changeEndDate(-1, 'Year') }}
//                                 >


//                                     <Icon name='caret-down' color='grey' size={24} />


//                                 </TouchableHighlight>
//                             </View>
//                         </View>

//                     </View>








//                 </View>
//             </View>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     header: { padding: '3%', color: 'white', backgroundColor: '#3F6AED', maxWidth: '35%', marginTop: '-0.6%', marginLeft: '-0.3%', fontWeight: 'bold', borderTopLeftRadius: 10, textAlign: 'center', }
//     ,
//     conatiner: { flexDirection: "row", justifyContent: 'space-around', marginTop: '2%', marginBottom: '4%' },
//     textInput: { backgroundColor: 'transparent', color: 'white', fontSize: 20, height: 30, marginTop: '16%', paddingTop: "26%" },
//     heading: { color: 'white', fontSize: 16, textAlign: 'center' },
//     dateContainer: {
//         borderColor: 'white',
//         borderWidth: 1,
//         // padding:5,
//         marginHorizontal: '4%',
//         marginVertical: '4%',
//         borderRadius: 10

//     },
// })

// export default Calender
