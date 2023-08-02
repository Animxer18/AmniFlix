import {
  View,
  Text,
  Dimensions,
  Button,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import debounce from "lodash.debounce";
import * as Animatable from "react-native-animatable";

export default function Searchscreen({ navigation }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [result, setresults] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [gaga, setgaga] = useState(true);

  const handletext = async (value) => {
    setgaga(true);
    setsearchquery(value);
    if (searchquery.length > 2) {
      const url = `https://api.consumet.org/anime/gogoanime/${searchquery}`;
      const response = await fetch(url);
      const data = await response.json();

      setresults(data.results);
      setgaga(false);

      // console.log(data);
    } else {
      setgaga(true);

      console.log("search query is not enofe");
    }
  };

  // const searchanime = async () => {
  //   const url = `https://api.consumet.org/anime/gogoanime/${searchquery}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setresults(data.results);
  //   // console.log(data);
  // };

  // const handledeboundce = useCallback(debounce(handletext, 400), []);
  // const handleSearchsubmit = async () => {
  //   const data = await searchanime();
  //   setresults(data || []);
  // };

  // const handletext = useCallback(debounce(handleSearch, 400), []);

  return (
    <View
      style={{
        backgroundColor: "#181a20",
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            height: height * 0.076,
            marginTop: height * 0.04,
          }}
        >
          <TextInput
            value={searchquery}
            onChangeText={handletext}
            placeholder=" Search"
            placeholderTextColor={"lightgray"}
            style={{
              backgroundColor: "grey",
              height: "90%",
              width: width * 0.9,
              alignSelf: "center",
              borderRadius: width * 0.1,
              paddingStart: width * 0.08,
              fontSize: 18,
              color: "white",
            }}
          />

          {/* <View
            style={{
              backgroundColor: "#b3b3ff",
              position: "absolute",
              top: 2,
              height: "85%",
              width: width * 0.129,
              right: width*0.06,
              borderRadius: height*0.07,
              justifyContent: 'center',
              
            }}
          ></View> */}
        </View>
        <Text
          style={{
            marginStart: width * 0.09,
            marginTop: height * 0.01,
            color: "#b3b3ff",
            fontSize: 17,
          }}
        >
          results ({result.length})
        </Text>
        {/* <Button title="Search" onPress={handleSearchsubmit} /> */}

        <View>
          {gaga ? (
            <View style={{ height: height * 0.5 }}>
              <Image
                source={{
                  uri: "https://media.tenor.com/jcJez4GsTGsAAAAi/ore-no-imouto-ga-konna-ni-kawaii-wake-ga-nai-ruri-gokou.gif",
                }}
                style={{
                  height: height * 0.2,
                  width: width * 0.4,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            </View>
          ) : (
            <View>
              {result.map((item, index) => {
                return (
                  <Animatable.View
                    animation="fadeInUp"
                    useNativeDriver
                    key={item}
                    delay={2}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Details", { item })}
                      >
                        <View
                          style={{
                            backgroundColor: "#12181c",
                            marginBottom: 20,
                            width: width * 0.96,
                            alignSelf: "center",
                            marginTop: 10,
                            borderRadius: 13,
                            height: height * 0.32,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              height: height * 0.27,
                              width: width * 0.36,
                              marginStart: width * 0.07,
                              borderRadius: height * 0.02,
                            }}
                          />
                          <View
                            style={{
                              position: "absolute",
                              top: height * 0.04,
                              // backgroundColor: "red",
                              left: width * 0.49,
                              height: height * 0.1,
                              width: width * 0.45,
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 18,
                              }}
                            >
                              {item.title}
                            </Text>
                            <View
                              style={{
                                backgroundColor: "grey",
                                height: 1,
                                marginTop: height * 0.02,
                              }}
                            />
                            <Text
                              style={{
                                color: "white",
                                fontSize: 17,
                                marginTop: height * 0.02,
                              }}
                            >
                              {item.releaseDate}
                            </Text>
                            <Text
                              style={{
                                color: "white",
                                fontSize: 17,
                                marginTop: height * 0.02,
                              }}
                            >
                              SubOrDub - {item.subOrDub}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </Animatable.View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
