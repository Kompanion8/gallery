import React, {useState, useEffect} from 'react';
import StackNavigator from './navigation/Navigator'
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { Camera } from 'expo-camera';

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 3000);


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



// export default class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isImageAvailable: false,
//             profilePic: null
//         }
//     }

//     componentDidMount = () => {
//         this.getImage();
//     }

//     getImage = async () => {
//         const profilePic = await AsyncStorage.getItem("profilePic");
//         if (profilePic) {
//             this.setState({
//                 isImageAvailable: true,
//                 profilePic: JSON.parse(profilePic)
//             });
//         }
//     }

//     selectProfilePic = async () => {
//         const options = {
//             title: 'Select Avatar',
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };

//       const result =  await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       });
//       console.log(result)

//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//                 AsyncStorage.setItem("profilePic", JSON.stringify(result.uri));
//                 this.setState({
//                     profilePic: result.uri,
//                     isImageAvailable: true
//                 });
            
        
//     }

//     render() {
//         return (
//             <View>
              

                
                    
//                         <TouchableOpacity onPress={this.selectProfilePic} style={{marginTop:200}}>
//                             <Text>Choose Profile Pic</Text>
//                         </TouchableOpacity>
                    
                
//             </View>
//         )
//     }
// } 