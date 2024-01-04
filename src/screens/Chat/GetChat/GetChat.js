import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import profile from "../../../../assets/images/processed.jpeg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icone from "react-native-vector-icons/FontAwesome5";
import { usePubNub } from "pubnub-react";
import moment from "moment";
import ImagePicker from 'react-native-image-crop-picker';
import {createCon, getChat, sendChat} from '../../../API/listApisServices';
import {RNS3} from 'react-native-aws3';
import {getChatDeatils} from '../../../redux/actions/chat/getChat.action';
import Images from 'react-native-chat-images';
// import moment from 'moment';
import {createChat} from '../../../redux/actions/chat/initialChat.action';
import styles from "./GetChatStyles.js";
import axios from "axios";
import {event} from 'react-native-reanimated';
import {Message, MessageAction} from '../../../components/commonHelper';
import profileDummy from '../../../../assets/images/profileDummy.jpg';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {Thumbnail} from 'react-native-thumbnail-video';
import VideoPlayer from 'react-native-video-player';
const { width, height } = Dimensions.get("window");

function GetChat({ route, navigation }, context) {
  let data = route.params;
  let fromUserId = data?.data?.from;
  let fromUserNuber = data?.data?.roomId;

  // console.log('fromUserId', data);

  let user = useSelector((state) => state.userLogin.user);
  let token = user != null ? user.token : null;
  let toUserId = user != null ? user.user.id : null;
  const pubnub = usePubNub();
  const scrollViewRef = useRef();

  const state = useSelector(state => state.getChat.chatMessage);
  let userChat = state != null ? state.data : null;
  let arrayOFUserChat = [];
  arrayOFUserChat.push(userChat != null ? userChat : []);

  const conserId = useSelector(state =>
    state.initiateChat.getId != null ? state.initiateChat.getId.data : null,
  );
  let datConsevr = conserId != null ? conserId.data.id : null;

  const [messagesLoader, setMessageLoader] = useState(false);
  const [conId, setConId] = useState({});
  const scroolVi = useRef();
  const dispatch = useDispatch();
  const [reciverChat, setReciverChat] = useState([]);
  const [senderChat, setSenderChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [media, setMedia] = useState([]);
  const [imageMedia, setImageMedia] = useState([]);
  const [loader, setLoader] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
  const [enableAutoscrollToTop, setEnableAutoscrollToTop] = useState(false);
  const [messageLoad, setMessageLoad] = useState(false);
  const [valueChange, setValueChange] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(false);
  const [height, setheight] = useState(30);
  const inputValue = useRef();
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState, i) => {
    //Handler for Video Pause
    setCurrentTime(null);
    console.log('pal', playerState, i);
    setPaused(!paused);
    setPlayerState(playerState);
    console.log(videoPlayer.current);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    console.log(data, 'g', videoPlayer.current.props.id);
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = data => {
    console.log(data, 'p');
    setIsLoading(true);
  };

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);
  let today = moment();

  const onRefresh = () => {
    setRefreshing(true);
    setDate(true);

    if (pageNumber <= userChat.totalPages && pageSize <= userChat.totalCount) {
      setPageSize(pageSize + 20);
      chatReciver();
    } else {
      // alert('No Messages Found');
      MessageAction('info', 'No Messages Found');
      setRefreshing(false);
    }
  };
  const headers = {
    Accept: 'application/json, text/plain',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const error = () => {
    console.log('erre');
  };

  const onPressImages = async () => {
    // We need to ask permission for Android only
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted

        selectVideo();
      } else {
        // Permission Denied
        Message(
          'info',
          'You denied access for files , to use files please enable it from the settings',
        );
        // alert(
        //   'You denied access for files , to use files please enable it from the settings',
        // );
      }
    } else {
      selectVideo;
    }
  };

  const selectVideo = () => {
    // if ('') {
    const data = {
      // multiple: false,
      mediaType: 'any',
      // waitAnimationEnd: false,
      includeBase64: true,
      // cropping: true,

      duration: 10000,
    };
    setLoader(true);
    console.log(data);
    ImagePicker.openPicker(data)
      .then(repsone => {
        console.log('gee', repsone.duration);
        if (repsone.mime === 'video/mp4') {
          if (repsone.duration <= 10000) {
            uploadFile(repsone);
            // setLoader(false);
            setLoader(true);
          } else {
            // uploadFile(repsone);
            Message('info', 'Video length should be  maximum 10 secs');
            setLoader(false);
            // alert('Muneer');
          }
        } else {
          uploadFile(repsone);
          // setLoader(false);
          setLoader(true);
        }
      })
      .catch(err => {
        setLoader(false);
      });
    // } else {
    //   alert('Please go to settings give the access for files');
    // }
  };

  let MediaVideodata = [];
  let MediaImageData = [];

  const uploadFile = source => {
    // setLoader(true);
    if (Object.keys(source).length == 0) {
      // alert('Please select image first');
      Message('error', 'Please select image first');
      return;
    }

    const file = {
      uri: source.path,
      name:
        'uploads' +
        `${source.size}` +
        `${source.mime === 'video/mp4' ? '.mp4' : '.jpg'}`,
      type: source.mime,
    };

    const options = {
      keyPrefix: 'chatUploads/', // Ex. myuploads/
      bucket: 'confidate-stag', // Ex. aboutreact
      region: 'eu-central-1', // Ex. ap-south-1
      accessKey: 'AKIAWPAEQDETDBCAO53N',
      // Ex. AKIH73GS7S7C53M46OQ
      secretKey: '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',
      // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
      successActionStatus: 201,
    };
    RNS3.put(file, options)
      .progress(progress => {
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`,
        );
      })
      .then(response => {
        console.log(response);
        if (response.status === 201 && source.mime === 'video/mp4') {
          MediaVideodata.push(response.body.postResponse.location);
          setMedia(response.body.postResponse.location);
          chatSender();

          // setLoader(false);
        } else if (response.status == 201 && source.mime === 'image/jpeg') {
          // setLoader(false);
          MediaImageData.push(response.body.postResponse.location);
          setImageMedia(response.body.postResponse.location);
          chatSender();
        } else {
          setLoader(false);
        }
      })
      .catch(err => {
        setLoader(false);
        console.log('err', err);
      });
  };

  const intiaileChat = () => {
    const intiailChatDeatils = {
      toPhoneNumber: data,
    };

    dispatch(createChat(intiailChatDeatils, headers)).then(rep => {
      setConId(data.data.id);
    });
  };

  const chatReciver = () => {
    setMessageLoader(true);
    if (loader) {
    } else {
      const chatDetails = {
        conversationId: datConsevr,
        pageNumber: pageNumber,
        pageSize: pageSize,
      };
      if (valueChange) {
      } else {
        dispatch(getChatDeatils(chatDetails, headers))
          .then(rep => {
            setMessageLoader(false);

            if (refreshing) {
              setRefreshing(false);
            }
          })
          .catch(err => {});
      }
    }
  };

  const chatSender = () => {
    setLoader(true);
    setValueChange(false);
    // console.log(Mediadata);
    console.log(MediaVideodata);
    // let messageValid = /^(?![\s-])[\w\s-]+$/.test(message);
    if (
      message.trimLeft() ||
      MediaImageData.length > 0 ||
      MediaVideodata.length > 0
    ) {
      const sendDaetail = {
        conversationId: datConsevr,
        message: message,
        photos: MediaImageData,
        videos: MediaVideodata,
      };
      console.log('send', sendDaetail);
      sendChat(sendDaetail, headers)
        .then(rep => {
          if (rep.data.succeeded) {
            console.log('res');
            setMessage('');
            setLoader(false);
            chatReciver();
            setheight(0);
          } else {
            Message('error', rep.data.errors.toString());
            // alert(rep.data.errors.toString());
          }
        })
        .catch(err => {
          console.log('alert', err);
          alert(err);
          setLoader(false);
        });
    } else {
      setLoader(false);
      Message('info', 'Please Enter the Message');
      // alert('Please Enter the Message');
    }
  };

  useEffect(() => {
    intiaileChat();
  }, [data]);

  const handleChangeText = (text) => {
    setMessage(text);
  };
  useEffect(() => {
    chatReciver();
  });

  const renderMessage = ({item}) => {
    let datas = item.items != null ? item.items : null;
    // alert(JSON.stringify(datas));
    // console.log('dta', datas);
    return (
      (datas &&
        datas.map((items, i) =>
          items.from.userEmail ===
          (data.email != null ? data.email : data.userEmail) ? (
            <View key={items.id}>
              {items.message ? (
                <Text
                  style={[
                    styles.senderMessage,
                    {
                      shadowOffset: {
                        width: 1,
                        height: 5,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 10,
                    },
                  ]}>
                  {items.message}
                </Text>
              ) : items.photos.length > 0 ? (
                <Images
                  images={items.photos}
                  saveOnLongPress={true}
                  backgroundColor={'transparent'}
                  width={'30%'}
                  style={styles.reciverImage}
                />
              ) : (
                <View
                  style={{
                    width: '50%',
                    height: 200,
                  }}
                  key={i}>
                  <VideoPlayer
                    video={{uri: items.videos.toString()}}
                    autoplay={false}
                    defaultMuted={true}
                    videoWidth={1100}
                    videoHeight={1000}
                    fullScreenOnLongPress={true}
                    thumbnail={require('../../../../assets/images/Profile.png')}
                    customStyles={{}}
                  />
                </View>
              )}
              {today.format('YYYY-MM-DD') ===
              moment(items.created).format('YYYY-MM-DD') ? (
                <Text style={styles.reciverTime}>
                  {moment(items.created).format('HH:mm')}
                </Text>
              ) : (
                <Text style={styles.reciverTime}>
                  {moment(items.created).format('YYYY-MM-DD HH:mm')}
                </Text>
              )}
            </View>
          ) : (
            <View key={items.id}>
              {items.message ? (
                <Text
                  style={[
                    styles.reciverMessage,
                    {
                      shadowOffset: {
                        width: 1,
                        height: 5,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 10,
                    },
                  ]}>
                  {items.message != null ? items.message : null}
                </Text>
              ) : items.photos.length > 0 ? (
                <Images
                  images={items.photos}
                  saveOnLongPress={true}
                  // backgroundColor={'transparent'}
                  backgroundColor={'transparent'}
                  width={'30%'}
                  style={styles.senderImage}
                />
              ) : (
                <View
                  key={i}
                  style={{
                    alignSelf: 'flex-end',
                    width: '50%',
                    height: 200,
                  }}>
                  <VideoPlayer
                    video={{uri: items.videos.toString()}}
                    autoplay={false}
                    defaultMuted={true}
                    videoWidth={1100}
                    videoHeight={1000}
                    fullScreenOnLongPress={true}
                    thumbnail={require('../../../../assets/images/Profile.png')}
                    customStyles={{}}
                  />
                </View>
              )}
              {today.format('YYYY-MM-DD') ===
              moment(items.created).format('YYYY-MM-DD') ? (
                <Text style={styles.senderTime}>
                  {moment(items.created).format('HH:mm')}
                </Text>
              ) : (
                <Text style={styles.senderTime}>
                  {moment(items.created).format('YYYY-MM-DD HH:mm')}
                </Text>
              )}
            </View>
          ),
        )) || (
        <Text style={{color: 'grey', textAlign: 'center'}}>
          No Message Found
        </Text>
      )
    );
  };

  console.log(messagesList, "messagesList");

  useEffect(async () => {
    if ((pubnub, fromUserId)) {
      pubnub.setUUID(fromUserNuber);
      pubnub.fetchMessages(
        {
          includeMessageActions: true,
          channels: [fromUserNuber],
          count: 100,
        },
        (status, response) => {
          let newMessages = response.channels;
          newMessages[fromUserNuber]?.map((envelope) => {
            setMessagesList((msgs) => [
              ...msgs,
              {
                id: envelope.message.id,
                content: envelope.message.content,
                timetoken: envelope.timetoken,
              },
            ]);
          });

          const listener = {
            message: (envelope) => {
              setMessagesList((msgs) => [
                ...msgs,
                {
                  id: envelope.message.id,
                  content: envelope.message.content,
                  timetoken: envelope.timetoken,
                },
              ]);
            },
          };

          pubnub.addListener(listener);
          pubnub.subscribe({ channels: [fromUserNuber] });
          return () => {
            pubnub.removeListener(listener);
            pubnub.unsubscribeAll();
          };
        }
      );
    }
  }, [pubnub, fromUserNuber]);

  const goBackNav = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    setMessage("");
    const message1 = {
      content: message,
      from: fromUserId,
      to: toUserId,

      // userName: user.user.name,
      id: Math.random().toString(16).substr(2),
    };
    pubnub.publish({
      channel: fromUserNuber,
      message: message1,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.conatinerChild}>
        <TouchableOpacity
          style={{ marginVertical: "4%", marginHorizontal: "4%" }}
          onPress={goBackNav}
        >
          <Icone name="angle-left" size={22} color="#ffff" />
        </TouchableOpacity>
        <View style={{ marginVertical: "4%", marginHorizontal: "4%" }}>
          {data.profileImage != null ? (
            <Image
              source={{ uri: data.profileImage }}
              style={styles.headerImage}
            />
          ) : (
            <Image source={profile} style={styles.headerImage} />
          )}
        </View>

        <View style={styles.header}>
          {/* <Text style={styles.title}>
            {data.name != null ? data.name : <Text>XXXX</Text>}
          </Text> */}
          <Text style={styles.title}>
            {data != null ? data.data.title : <Text>XXXX</Text>}
          </Text>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ y: 0, animated: true })
        }
        showsVerticalScrollIndicator={false}
      >
        {messagesList.length > 0 ? (
          messagesList.map((item) => {
            let currentMessageTime = moment.utc(item.timetoken / 10000).local();
            currentMessageTime = moment(currentMessageTime).format("hh:mm A");
            return (
              <View
                key={item.timetoken}
                style={
                  item?.to !== toUserId
                    ? styles.currentUserMessage
                    : styles.otherUserMessage
                }
              >
                <View
                  style={
                    item?.to !== toUserId
                      ? styles.currentMessage
                      : styles.otherMessage
                  }
                >
                  <Text style={{ color: "white" }}>{item.content}</Text>
                  <Text style={{ color: "white", fontSize: 9 }}>
                    {currentMessageTime}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View style={{ alignItems: "center", marginTop: "50%" }}>
            <Text style={{ color: "grey" }}>No Message Found</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.inputContainer, { height: Math.max(35, height) }]}>
        <TextInput
          ref={inputValue}
          style={[styles.input, { height: Math.max(35, height) }]}
          placeholder="Enter your Message"
          value={message}
          onChangeText={handleChangeText}
          onContentSizeChange={(event) => {
            console.log("", event.nativeEvent.contentSize.height);
            setheight(event.nativeEvent.contentSize.height);
          }}
          multiline={true}
          selectionColor="black"
          maxLength={100}
        />

        <View style={styles.messageContainer}>
          {loader ? (
            <ActivityIndicator size={"small"} color="pink" />
          ) : (
            <TouchableOpacity
              disabled={loader}
              style={{ marginHorizontal: "2%" }}
            >
              <Text>
                <Icon name="attachment" size={26} color="grey" />
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={message ? handleSubmit : null}>
            <Text>
              <Icon name="send-circle-outline" size={26} color="#EA1B91" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default GetChat;
