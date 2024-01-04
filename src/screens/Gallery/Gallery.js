import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  ToastAndroid,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import sideBadge from '../../../assets/images/sideBadge.png';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import AppHeader from '../../components/AppHeader';
let { width, height } = Dimensions.get('window');
import CameraRoll from '@react-native-community/cameraroll';
import Images from 'react-native-chat-images';
// import CameraRollGallery from "react-native-camera-roll-gallery";
import SmartGallery from 'react-native-smart-gallery';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Message, MessageAction } from '../../components/commonHelper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
function Gallery(props) {
  const [ImageSource, setImageSoure] = useState([]);
  const [Imageviewarray, setImageSourceviewarray] = useState([]);
  const [imageMerger, setImageMerege] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let list = [];
  const selectPic = () => {
    const data = {
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      // maxFiles:10,
      mediaType: 'any',
      includeBase64: true,
    };
    setLoader(true);
    ImagePicker.openPicker(data).then(response => {
      let tempArray = [];
      setImageSoure(response);
      response.forEach(item => {
        let image = {
          uri: item.path,
          // width: item.width,
          // height: item.height,
        };
        let dataImage = Imageviewarray.filter(vi => vi.uri != image.uri);
        if (dataImage) {
          tempArray.push(image);
          setImageSourceviewarray([...Imageviewarray, ...tempArray]);
        }
        setLoader(false);
      });
    });
  };

  const goHome = () => {
    props.navigation.navigate('HomeScreenStack');
    setOpenMode(false);
    setIndex(0);
  };
  const [dataimages, setData] = useState([{}]);
  const [listState, setListState] = useState(100);
  const [listImages, setListImages] = useState('');

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture(item) {
    console.log('ite', item);
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.deletePhotos(item).then(rep => console.log('rep', rep));
  }

  const getPhotos = () => {
    let arrayList = [];
    setLoader(true);
    CameraRoll.getPhotos({
      first: listState,
      assetType: 'Photos',
    })
      .then(res => {
        let datalist = res.edges;
        datalist = datalist.map(item => item.node.image);
        datalist = datalist.map(item => item.uri);

        datalist.forEach((items, i) => {
          arrayList.push({
            uri: items,
            dimensions: { width: '80%', height: '90%' },
            id: i,
          });
        });
        // alert(JSON.stringify(arrayList));
        setData(arrayList);
        setLoader(false);
        setListImages(arrayList);
        console.log('array');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const error = () => {
    console.log('err');
  };
  const askPermission = async () => {
    if (Platform.OS === 'android') {
      // alert('Heelp');
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,

        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        Message(
          'info',
          'You denied access for files , to use files please enable it from the settings',
          error,
        );
        // alert(
        //   'You denied access for files , to use files please enable it from the settings',
        // );
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };

  useEffect(() => {
    askPermission();
  }, []);
  // console.log('dataState', data);
  // let arrayList = [];
  const openModeFun = (item, i) => {
    console.log('items', [item.uri]);
    setOpenMode(true);
    setIndex(item.id);
    // CameraRoll.deletePhotos([item.uri]).then(rep => console.log('dele', rep));
    // savePicture([item.uri]);
  };

  const [index, setIndex] = useState(0);
  const [openMode, setOpenMode] = useState(false);
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => openModeFun(item)}>
          <Image
            source={{ uri: item.uri }}
            style={{
              marginHorizontal: '2%',
              marginVertical: '2%',
              borderRadius: 10,
              height: 150,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      CameraRoll.saveToCameraRoll(image.path, 'photo')
        .then(res => getPhotos())
        .catch(err => console.log(err))
    });
  }

  // alert('data');
  const goBack = () => {
    if (openMode) {
      setOpenMode(false);
      setIndex(0);
    } else {
      props.navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <AppHeader
          title={openMode ? 'Image ' + index : 'Images'}
          goBack={goBack}
          goHome={openCamera}
          showCamera={true}
        />
        {openMode ? (
          <SmartGallery
            images={dataimages}
            index={index}
            loadMinimal={true}
            loadMinimalSize={2}
            sensitiveScroll={false}
          />
        ) : (
          <ScrollView>
            <FlatList
              data={listImages}
              numColumns={3}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        )}
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
});

export default Gallery;
