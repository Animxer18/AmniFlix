import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";

// icons for project
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// api calls
import { info } from "../API/api";
import { fetchwatch } from "../API/api";

import { gogoinfo } from "../API/gogo";

const Detailscreen = ({ route, navigation }) => {
  const selected = route.params.item;
  const ani = selected.id;

  useEffect(() => {
    getanimeinfo(ani);
  }, [ani]);

  const [loding, setloding] = useState(true);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [data, setdata] = useState();
  const [watch, setwatch] = useState([]);

  const getanimeinfo = async (gg) => {
    let hh = await gogoinfo(gg);
    const kk = await hh;
    setdata(kk);
    setloding(false);
    // data.episodes.length === 0 ? console.log("non") : console.log("gagag")
    // const gptid = data.map((gogo) => gogo.title);
  };

  const nulldata = () => {
    // console.log("data is null ");
  };

  //   handle press to go another screen
  const handlepress = (item) => {
    setloding(true);
    navigation.navigate("Details", { item });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {loding ? (
          <View
            style={{
              height: height,
              width: width,
              flex: 1,
              justifyContent: "center",
              backgroundColor: "#181a20",
            }}
          >
            <Image
              source={{
                uri: "https://media.tenor.com/3i--UTlTQvIAAAAi/hasher-happy-sticker.gif",
              }}
              style={{
                height: height * 0.3,
                width: width * 0.6,
                alignSelf: "center",
                resizeMode: "cover",
                marginBottom: height * 0.15,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                bottom: height * 0.1,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                }}
              >
                Loding .....
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ backgroundColor: "rgba(24, 26, 32, 1)" }}>
            {/* horizontal bar for back and search */}
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: data.image }}
                style={{
                  height: height * 0.6,
                  width: width * 1,
                  opacity: 0.3,
                  marginTop: 0,
                }}
              />

              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(24, 26, 32, 0.4)",
                  "rgba(24, 26, 32, 1)",
                ]}
                style={{
                  width,
                  height: height * 0.5,
                  position: "absolute",
                  bottom: 0,
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <Animatable.View
                key={data.image}
                animation="fadeInDown"
                useNativeDriver
                delay={1}
                style={{
                  position: "absolute",
                  alignSelf: "center",
                }}
              >
                <Image
                  source={{ uri: data.image }}
                  style={{
                    width: width * 0.5,
                    height: height * 0.4,
                    position: "absolute",
                    alignSelf: "center",
                    borderRadius: 15,
                    marginTop: 40,
                    borderColor: "black",
                    borderWidth: 0,
                  }}
                />
              </Animatable.View>
              <View
                style={{
                  backgroundColor: "#b3b3ff",
                  height: height * 0.05,
                  width: width * 0.1,
                  borderRadius: 13,
                  marginStart: width * 0.03,
                  justifyContent: "center",
                  position: "absolute",
                  marginTop: height * 0.02,
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                  <Ionicons
                    name="ios-chevron-back"
                    size={27}
                    color="white"
                    style={{ alignSelf: "center", end: 1 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ backgroundColor: "rgba(24, 26, 32, 1)" }}>
              <View style={{ height: height * 0.09, width: width * 0.86 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: "white",
                    // fontFamily: "Inter-Black",
                    fontSize: 28,
                    marginStart: width * 0.06,
                    bottom: height * 0.1,
                  }}
                >
                  {data.title || data.title?.english || data.title?.romaji}
                </Text>
                
                <Text
                  style={{
                    color: "grey",
                    marginStart: width * 0.07,
                    bottom: height * 0.09,
                  }}
                >
                  Releasedate - {data.releaseDate + " " || "NA"} {data.subOrDub}
                </Text>
              </View>


              {/* <Animatable.View
          
          animation="fadeInRight"
          useNativeDriver
          delay={1}
        > */}
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  // fontFamily: "Inter-Black",
                  marginStart: width * 0.07,
                  bottom: height * 0.07,
                  marginTop: height * 0.015,
                }}
              >
                Description
              </Text>
              <Text
                numberOfLines={6}
                style={{
                  color: "white",
                  fontSize: 15,
                  // fontFamily: "Inter-Black",
                  marginStart: width * 0.07,
                  bottom: height * 0.05,
                  width: width * 0.88,
                }}
              >
                {data.description}
              </Text>
              {/* </Animatable.View> */}
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  // fontFamily: "Inter-Black",
                  marginStart: width * 0.07,
                  marginTop: height * 0.03,
                  marginBottom: height * 0.04,
                  width: width * 0.88,
                }}
              >
                Watch Episodes
              </Text>
              <View>
                {data && data.episodes && data.episodes.length > 0 ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={
                      data && data.episodes
                      // ? data.episodes.reverse()
                      // : nulldata()
                    }
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <Animatable.View
                            animation="fadeInUp"
                            useNativeDriver
                            delay={2}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Link", { item, data})
                              }
                            >
                              <View
                                style={{
                                  height: height * 0.13,
                                  alignSelf: "center",
                                  flexDirection: "row",
                                  borderRadius: 14,
                                  backgroundColor: "#12181c",
                                  marginBottom: 20,
                                  width: width * 0.9,
                                }}
                              >
                                <Image
                                  source={{ uri: data.image }}
                                  style={{
                                    height: height * 0.13,
                                    resizeMode: "cover",
                                    borderRadius: 14,
                                    width: width * 0.42,
                                    opacity: 0.6,
                                  }}
                                />
                                <Ionicons
                                  name="play-sharp"
                                  size={40}
                                  color="white"
                                  style={{
                                    position: "absolute",
                                    alignSelf: "center",
                                    marginStart: "20%",
                                  }}
                                />

                                <View
                                  style={{
                                    width: width * 0.4,
                                    marginStart: width * 0.04,
                                    marginTop: height * 0.02,

                                    height: height * 0.065,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "white",
                                      fontSize: 17,
                                      marginTop: height * 0.0,
                                    }}
                                  >
                                    Episodes {item.number}
                                  </Text>

                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      color: "white",
                                      fontSize: 13,
                                      color: "grey",
                                      marginTop: height * 0.01,
                                    }}
                                  >
                                    {item.title === null ? (
                                      <Text>NotAvailable</Text>
                                    ) : (
                                      item.title
                                    )}
                                  </Text>
                                  <FlatList />
                                </View>
                              </View>
                            </TouchableOpacity>
                          </Animatable.View>
                        </View>
                      );
                    }}
                  />
                ) : (
                  // print data is not availbale print ohk a
                  <View>
                    <Image
                      source={require("../assets/piga.png")}
                      style={{
                        height: height * 0.3,
                        width: width * 0.94,
                        alignSelf: "center",
                        marginTop: height * 0.06,
                      }}
                    />
                  </View>
                )}
              </View>

              <View style={{ height: 70, marginTop: 20 }}>
                <Text style={{ color: "white", textAlign: "center" }}>
                Currently Under Development - In Progress
                </Text>
              </View>
              
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detailscreen;
