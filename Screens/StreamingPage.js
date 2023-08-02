import { View, Text ,StyleSheet,Dimensions,StatusBar} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { hide } from 'expo-splash-screen';
import { setStatusBarHidden } from 'expo-status-bar';

export default function StreamingPage  ({route})  {
  
const isfocus = useIsFocused();


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const [textshow,settextshow] = useState(true);

const selected = route.params.item;
// console.log(selected.url)


useEffect(()=> {

if(isfocus) {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  StatusBar.setHidden(true);
  
}
else{
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  StatusBar.setHidden(false);
}
setTimeout(() => {
  settextshow(false); // Hide the text after 3 seconds
}, 8000);

return () => {
  // ScreenOrientation.unlockAsync();
 
};

},[isfocus])
  return (

    <View style={{flex: 1,  backgroundColor: "black",}}>
      
      <View style={{ justifyContent: "center", alignSelf: 'center', backgroundColor: "black",}}>
      <Video
        // source={require('./path_to_your_local_video.mp4')} // Local video file
        // OR
        source={{ uri: selected.url }}
        
        useNativeControls // Remote video URL
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        isLooping
        style={{
          height:300,
          width: 400,
          
        }}
        
        // fullscreen={{
        //   enterFullscreen: () => {
           
        //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        //   },
        //   exitFullscreen: () => {
           
        //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        //   },
          
        // }}
      />
      {
        textshow && (
          <Text style={{color: 'white',alignSelf: 'center',fontSize: 17,marginTop: 16}}> Maximize the experience – tap on full-screen!</Text>

        )
      }
      </View>
    </View>
    
  )
}

