import React, {useState, useEffect} from 'react';
import StackNavigator from './navigation/Navigator'
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { Camera } from 'expo-camera';



const fonts = () => Font.loadAsync({
  'FiraSans-Light': require('./styles/fonts/FiraSans-Light.ttf')
});

export default function App() {

  const [font, setFont] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
    })();
    }, []);

  if (font) {
    return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
  );
  } else {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFont(true)}
        onError={console.warn} />
    );
  }


  

};
