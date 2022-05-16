import * as ImagePicker from 'expo-image-picker';


  const pickAlbumProfile = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    

    if (!result.cancelled) {
      return result.uri
    }
  };

  const useCamera = async () => {
    
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    

    if (!result.cancelled) {
      return result.uri
    }
  };

  const getImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    

    if (!result.cancelled) {
      return result.uri
    }
  };

export {pickAlbumProfile, getImage, useCamera}