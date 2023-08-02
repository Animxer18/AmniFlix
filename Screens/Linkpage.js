import { View, Text, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchwatch } from "../API/api";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { gogostreming } from "../API/gogo";



const Linkpage = ({ navigation, route }) => {
  // getting a height and width of the screen
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  // var decalration this area is for stat and var \
  const [data, setdata] = useState([]);
  const [loding ,setloding] =useState(true);
  // getting a item from a detail scrennn moreless geting a ep id from detail
  const selected = route.params.item;
  const pre = route.params.data.image;

  // console.log("Console is fire")

  const geteplinks = async (kk) => {
    const ff = await gogostreming(kk);
    const ll = await ff;
    setdata(ll.sources);
    setloding(false)
    // console.log(ll);
  };

  
  useEffect(() => {
    geteplinks(selected.id);
  }, [selected.id]);

  return (
    
    <View
      style={{
        flex: 1,
        height: height,
        backgroundColor: "white",
        // justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      { loding ? (
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
source={{ uri: 'https://media.tenor.com/3i--UTlTQvIAAAAi/hasher-happy-sticker.gif' }}
style={{
  height: height*0.3,
  width: width*0.6,
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
): (
  <View>
      <Image
        source={{ uri: pre }}
        style={{
          height: height,
          width: width,
          resizeMode: "cover",
          opacity: 0.8,
          position: "absolute",
        }}
      />



      <View
        style={{
          width: width * 0.8,
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 13,
          borderWidth: 2,
          borderColor: "white",
          marginTop: height*0.1
        }}
      >
  

 
 
        <View>
        {
  data === null ? (
    <View style={{alignSelf: 'center',justifyContent: 'center'}}>
      <Text style={{fontSize: 20,color: 'white'}}>
        Not Available Contect dev
      </Text>
    </View>
    ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (

         

              <TouchableOpacity onPress={()=> navigation.navigate("Stream",{item})}>
                <View
                  style={{
                    flex: 1,
                    height: height * 0.1,
                    alignSelf: "center",
                    margin: 10,
                    backgroundColor: "#b3b3ff",
                    width: width * 0.7,
                    borderRadius: 20,
                    
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      alignSelf: "center",
                      fontSize: 20,
                      fontWeight: '700'
                    }}
                  >
                    {item.quality}
                  </Text>
                </View>
              </TouchableOpacity>
          
            );
          }}
        />
      )}
        </View>

      </View>
      
   
     <View>
     <Text style={{color: 'white',fontSize: 15,fontWeight: '700',textAlign: 'center',marginTop: 20}}>
     Currently Under Development - In Progress
    </Text>
    </View>
    </View>
)}
       </View>
       

  );
};

export default Linkpage;
