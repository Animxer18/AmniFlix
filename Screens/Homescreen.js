import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  Modal,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";

// for all apis
import {
  fetchpopular,
  fetchrecent,
  fetchtrending,
  fetchwatch,
} from "../API/api";
import { idfetch } from "../API/api";
// import { fetchgogorecent } from "../API/gogo";

// for all icons in code
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// other outside library
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";

// import all loding from
import { Skeletant } from "../Loidngfile/loding";
import { Recentanime } from "../Loidngfile/loding";
import { Trendinglo } from "../Loidngfile/loding";
import { Trendingposter } from "../Loidngfile/loding";

// import fonts from out sides
import { useFonts } from "expo-font";

// get device all width and height
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// import gogo anime apis
import {
   gogoinfo,
   gogotopair,
  fetchgogorecent
  } from "../API/gogo";

// starting of the code execution

const Homescreen = ({ navigation }) => {
  //TODO:  main use effect
  useEffect(() => {
    gettranding(), getpopular(), getrecentep(),getgogorecent(),getgogotrending()
  }, []);

  const [result, setresults] = useState([]);
  const [tranding, settranding] = useState([]);
  const [recentep, setrecentep] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const indexpages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //TODO: loding check
  const [loadrecent, setloadrecent] = useState(true);
  const [loadforyou, setforyou] = useState(true);
  const [loding, setloding] = useState(true);
  const [selectsource, setselectedsource] = useState();

  // FIXME: get tranding anime from api
  const gettranding = async () => {
    // setloding(true)
    let data = await fetchtrending();
    const newdata = await data.results;
    setresults(newdata);
    setloding(false);
  };

  // FIXME: get popular anime from api
  const getpopular = async (item) => {
    // setforyou(true);
    // let gg = await fetchpopular(item);
    // let newgg = await gg.results;
    // settranding(newgg);
    setforyou(false);
    // setCurrentPage(item);
    // importtant topic
    //  const gptid = tranding.map(data => data.trailer);
  };

  // FIXME: get recent anime from api
  const getrecentep = async () => {
    let rr = await fetchrecent();
    let vv = await rr.results;
    setrecentep(vv);
    setloadrecent(false);
  };

  const buttons = ["zoro", "gogo", "maile"];

  const handlepress = async (item, id) => {
    setselectedsource(id);
    console.warn(id);

    // id = id + 1;
    // let mm = await fetchgogorecent(id);
    // let hh = await mm;
    // console.log(hh);
  };





  const [gogorecent,setgogorecent] =useState([]);
  const[gogotrending,setgogotrending ] =useState([]);

  // for gogo anime only

  const getgogorecent = async() => {
    let oo = await fetchgogorecent();
    let ll = await oo.results;
    setgogorecent(ll);
    console.log(gogorecent);
    console.log("from gogo anime ")
  }

  const getgogotrending = async() => {
    let rr = await gogotopair()
    let nn = await rr.results;
    setgogotrending(nn);
    console.log(nn);
    console.log("from gogog trening") 
  }














  //FIXME:  array of the 10 for bottom page button
  const paginationArray = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar showHideTransition={false} />
      <View style={{ flex: 1, backgroundColor: "#181a20" }}>
        <View
          style={{
            backgroundColor: "#181a20",
            // marginTop: height * 0.03,
            height: height * 0.07,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {/*TODO: main AmnFlix header at the top  */}
          <Text
            style={{
              fontSize: 30,
              color: "white",
              textAlign: "center",
              alignSelf: "center",
              //   fontFamily: "gg",
              fontWeight: "400",
            }}
          >
            Amni
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: "red",
              textAlign: "center",
              alignSelf: "center",
              //   fontFamily: "gg",
              fontWeight: "400",
            }}
          >
            Flix
          </Text>

          {/* TODO: hamberger menu icon at the top  */}
          <TouchableOpacity
            onPress={() => console.warn("Under Devlopment ")}
            style={{
              left: width * 0.06,
              top: height * 0.026,
              width: 30,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <Octicons name="three-bars" size={25} color="white" />
          </TouchableOpacity>

          {/* TODO: serach icon at the top  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
            style={{
              left: width * 0.85,
              width: 30,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <Octicons name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View>
              {loding ? (
                <View>
                  <Trendingposter />
                </View>
              ) : (
                <View>
                  <FlatList
                    data={result}
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <Animatable.View
                          key={item}
                          animation="fadeInDown"
                          delay={0.2}
                          useNativeDriver
                        >
                          <View>
                            <Image
                              source={{ uri: item.cover }}
                              style={{
                                height: height * 0.156,
                                width: width * 0.9,
                                margin: width * 0.05,
                                borderRadius: 20,
                                resizeMode: "cover",
                              }}
                            />
                          </View>
                        </Animatable.View>
                      );
                    }}
                  />
                </View>
              )}

              <View style={{ flexDirection: "row" }}>
                {buttons.map((item, index) => (
                  <TouchableOpacity
                    onPress={(item) => {
                      handlepress(item, index);
                    }}
                    key={index}
                  >
                    <View
                      style={[
                        index === selectsource
                          ? {
                              backgroundColor: "red",
                              flexDirection: "row",
                              margin: width * 0.04,
                              height: height * 0.06,
                              width: width * 0.2,
                              justifyContent: "center",
                              alignItem: "center",
                              alignSelf: "center",
                              borderRadius: 14,
                            }
                          : {
                              backgroundColor: "black",
                              flexDirection: "row",
                              margin: width * 0.04,
                              height: height * 0.06,
                              width: width * 0.2,
                              justifyContent: "center",
                              alignItem: "center",
                              alignSelf: "center",
                              borderRadius: 14,
                            },
                      ]}
                    >
                      <Text
                        key={index}
                        style={{
                          color: "white",
                          fontSize: 20,
                          textAlign: "center",
                          alignSelf: "center",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {/* // </View> */}

              {/* recent anime list  */}
              <View>
                <Text
                  style={{
                    color: "white",
                    marginTop: height * 0.02,
                    fontSize: width * 0.065,
                    margin: width * 0.04,
                    // fontFamily: "Inter-Black",
                    // fontFamily: "gg",
                    // fontWeight: '00'
                  }}
                >
                  Trending Anime
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SeeAll", {
                      source: "result",
                      data: result,
                    })
                  }
                  style={{
                    width: width * 0.3,
                    height: 25,
                    position: "absolute",
                    left: width * 0.84,
                    top: height * 0.07,
                    // backgroundColor: 'red'
                  }}
                >
                  <Text
                    style={{
                      color: "#b3b3ff",
                      //  fontFamily: "Inter-Black"
                    }}
                  >
                    see all
                  </Text>
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={18}
                    color="#b3b3ff"
                    style={{
                      position: "absolute",
                      left: width * 0.1,
                    }}
                  />
                </TouchableOpacity>
              </View>

              {loding ? (
                <View>
                  <Trendinglo />
                </View>
              ) : (
                <View>
                  <FlatList
                    // data={gogorecent}
                    data={result}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <Animatable.View
                          key={item}
                          animation="fadeInRight"
                          useNativeDriver
                          delay={0.4}
                        >
                          <View>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Details", { item })
                              }
                            >
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  height: height * 0.26,
                                  width: width * 0.34,
                                  margin: 10,
                                  borderRadius: 14,
                                  resizeMode: "cover",
                                }}
                              />
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: "white",
                                  fontSize: width * 0.031,
                                  width: width * 0.3,
                                  height: height * 0.025,
                                  marginStart: 15,
                                  textAlign: "center",
                                }}
                              >
                                {item.title.english || item.title.romaji}
                              </Text>
                              <Text style={{ color: "grey", marginStart: 30 }}>
                                {item.releaseDate + " " || "?"}- rating
                                {" " + item.rating || "NA"}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Animatable.View>
                      );
                    }}
                  />
                </View>
              )}
            </View>

            {/* loding recent ep is true r not  */}
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  marginTop: height * 0.04,
                  fontSize: width * 0.065,
                  margin: width * 0.04,
                  // fontFamily: "Inter-Black",
                }}
              >
                Recent Anime
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SeeAll", {
                    source: "recentep",
                    data: recentep,
                  })
                }
                style={{
                  width: width * 0.3,
                  height: 25,
                  position: "absolute",
                  left: width * 0.84,
                  top: height * 0.07,
                }}
              >
                <Text
                  style={{
                    color: "#b3b3ff",
                    //  fontFamily: "Inter-Black"
                  }}
                >
                  see all
                </Text>
                <Ionicons
                  name="arrow-forward-sharp"
                  size={18}
                  color="#b3b3ff"
                  style={{
                    position: "absolute",
                    left: width * 0.1,
                  }}
                />
              </TouchableOpacity>
            </View>

            {loadrecent ? (
              <View>
                <Recentanime />
              </View>
            ) : (
              <View>
                <FlatList
                  data={recentep}
                  // data={gogotrending}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <Animatable.View
                        key={item}
                        animation="fadeInRight"
                        useNativeDriver
                        delay={0.5}
                      >
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Details", { item })
                            }
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={{
                                height: height * 0.26,
                                width: width * 0.34,
                                margin: 10,
                                borderRadius: 14,
                                resizeMode: "cover",
                              }}
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: "white",
                                fontSize: width * 0.031,
                                width: width * 0.3,
                                height: height * 0.025,
                                marginStart: 15,
                                textAlign: "center",
                              }}
                            >
                              {item.title.english || item.title.romaji}
                            </Text>
                            <Text
                              style={{
                                color: "grey",
                                marginStart: 20,
                                textAlign: "center",
                                marginEnd: width * 0.08,
                              }}
                            >
                              rating
                              {" " + item.rating || "NA"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Animatable.View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}

            {/* for you  */}
            <View>
              <Text
                style={{
                  color: "white",
                  marginTop: height * 0.05,
                  fontSize: width * 0.065,
                  margin: width * 0.04,
                  // fontFamily: "Inter-Black",
                }}
              >
                For You
              </Text>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Details')}
                style={{
                  width: 200,
                  height: 25,
                  position: "absolute",
                  left: width * 0.84,

                  top: height * 0.068,
                }}
              >
                <Text
                  style={{
                    color: "#b3b3ff",
                    //  fontFamily: "Inter-Black"
                  }}
                >
                  see all
                </Text>
                <Ionicons
                  name="arrow-forward-sharp"
                  size={18}
                  color="#b3b3ff"
                  style={{
                    position: "absolute",
                    left: width * 0.1,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View>
              {loadforyou ? (
                <View>
                  <Skeletant />
                </View>
              ) : (
                <View>
                  <FlatList
                    // data={tranding}
                    data={gogotrending}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <Animatable.View
                          key={item}
                          animation="fadeInUp"
                          delay={0.2}
                          useNativeDriver
                        >
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Details", { item })
                            }
                          >
                            <View
                              style={{
                                backgroundColor: "#12181c",
                                margin: 13,
                                height: height * 0.3,
                                width: width * 0.9,
                                alignSelf: "center",
                                borderRadius: 10,
                                flexDirection: "row",
                                // justifyContent: 'center'
                              }}
                            >
                              <Image
                                source={{ uri: item.image }}
                                resizeMode="cover"
                                style={{
                                  height: height * 0.27,
                                  width: width * 0.38,
                                  start: 13,
                                  borderRadius: 13,
                                  backgroundColor: "blue",
                                  top: 12,
                                  // justifyContent: "center",
                                  // alignItems: 'center'
                                }}
                              ></Image>
                              <View
                                style={{
                                  // backgroundColor: "blue",
                                  height: height * 0.07,
                                  width: width * 0.4,
                                  start: width * 0.1,
                                  top: height * 0.02,
                                }}
                              >
                                <Text
                                  numberOfLines={2}
                                  style={{ color: "white", fontSize: 18 }}
                                >
                                  {item.title|| item.title.english || item.title.romaji}
                                </Text>
                                <Text style={{ color: "grey", marginTop: 10 }}>
                                  {item.releaseDate + " " || "?"} rating -{" "}
                                  {item.rating ? item.rating : "NA"}
                                </Text>
                                <View
                                  style={{
                                    borderBottomWidth: 1,
                                    backgroundColor: "grey",
                                    marginTop: height * 0.01,
                                    borderColor: "grey",
                                    width: width * 0.4,
                                  }}
                                />
                                <View
                                  style={{
                                    height: height * 0.13,
                                    width: width * 0.4,
                                    top: 13,
                                  }}
                                >
                                  <Text
                                    numberOfLines={4}
                                    style={{ color: "grey", fontSize: 14 }}
                                  >
                                    {item.description}{" "}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </Animatable.View>
                      );
                    }}
                  />
                </View>
              )}
            </View>

            <View style={{ height: height * 0.4 }}>
              <View
                style={{
                  marginTop: height * 0.03,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <LottieView
                  autoPlay
                  style={{
                    width: 100,
                    height: 100,
                    //   position: 'absolute',
                  }}
                  source={require("../animegirl.json")}
                />
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  numColumns={5}
                  data={paginationArray}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            borderRadius: 14,
                            justifyContent: "center",
                            backgroundColor:
                              currentPage === item ? "white" : "#b3b3ff",
                            width: width * 0.12,
                            height: height * 0.06,
                            margin: 10,
                            borderRadius: 14,
                            justifyContent: "center",
                            alignSelf: "center",
                            borderColor: "white",
                            borderWidth: 2,
                          }}
                          onPress={() => getpopular(item) & console.log()}
                        >
                          <View>
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: "700",
                              }}
                            >
                              {item}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  App is currently under development
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Homescreen;
