import { Text, View,SafeAreaView, ScrollView,TouchableOpacity,Image,Dimensions,Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { Style } from '../styles/style'
import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Swiper from 'react-native-swiper'
import { getImage, useCamera } from './PickImage'
import {setValue, getValue} from './Storage'


const Album = ({ route }) => {
  
  const { album } = route.params;

  const [images, setImages] = useState([])

  const [detailViewVisible, setDetailViewVisibility] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [deleteMode, setMode] = useState(false)
  const [deleteList, setList] = useState([])


  useEffect(()=>{
      getValue(album.name)
        .then(result =>
          {console.log('hello')
          setImages(result == null ? [] : result)}
        )
    },[])

  
  const handleAddFile = () => {
    getImage()
      .then(result => {
        let a = [
          ...images,
      {uri:result,id: uuidv4(), selected:false}
        ]
        setImages(a)
        setValue(a, album.name)
      })
  }

  const handleCamera = () => {
    useCamera()
      .then(result => {
        let a = [
          ...images,
      {uri:result,id: uuidv4(),selected:false}
        ]
        setImages(a)
        setValue(a, album.name)
      })
  }

  const handleDelete = () => {
    let s = new Set(deleteList);
    let a = images.filter(e => !s.has(e.id))
    setImages(a)
    setValue(a, album.name)
  }

  const handleChoice = () => {
    setMode(!deleteMode)
    if (!deleteMode) {
      let a = []
      images.forEach(
        image => {
          image.selected = false
          a.push(image)
        }
      )
      setImages(a)
    }
  }

  return (
          <View style={{flex:1}}>
            {
              detailViewVisible ? (
                <Swiper
                  loop={false}
                  index={selectedIndex}
                  showsPagination={false}
                >
                  {
                    images.map(
                      (image, index) => (
                        <View
                          key={index}
                          style={Style.imageContainer}
                        >
                          <Image
                            style={{
                              width: "100%",
                              flex: 1                              
                            }}
                            resizeMode="contain"
                            source={{
                              uri: image.uri
                            }}
                          />
                          <View
                            style={{                
                              bottom: 40,                            
                              position:'absolute'
                            }}
                          >
                            <Button
                              title="Закрыть"
                              color={'white'}
                              onPress={() => {
                                setDetailViewVisibility(false)                            
                              }}
                            />
                          </View>
                        </View>
                      )
                    )
                  }
                </Swiper>
              )
              : (
                <SafeAreaView style={Style.container}>
                <View style={Style.header}>
                  <Text 
                    style={Style.title}
                    numberOfLines={1}
                  >{album.name}
                  </Text>
                  <View style={Style.buttonContainer}>
                    <TouchableOpacity onPress={handleAddFile}>
                        <Icon name='addfile' size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCamera}>
                        <Icon name='camerao' size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleChoice}>
                        <Icon name='checkcircleo' size={30} color={deleteMode==false?'white':'#6FB98F'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Icon name='delete' size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>   
                <ScrollView
                  style={Style.albumList}
                  showsVerticalScrollIndicator={false}
                >
                  <View
                    style={Style.albumContainer}
                  >
                    {
                      images.map(
                        (image, index) => 
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              if (!deleteMode) {
                                setDetailViewVisibility(true)
                                setSelectedIndex(index)
                              } else {
                                image.selected=!image.selected
                                if(image.selected){
                                setList([
                                  ...deleteList,
                                  image.id
                                ])
                                } else {
                                  setList(deleteList.filter(item=>item.id==image.id))
                                }
                              }                        
                            }}
                          >
                            
                            <Image
                              style={{
                                width: Dimensions.get('window').width / 3,
                                height: Dimensions.get('window').width / 3,
                                opacity:(image.selected&&deleteMode)==false?1:0.2
                              }}
                                source={{uri:image.uri}}
                            />
                        </TouchableOpacity>
                        
                      )
                    }
                  </View>
                </ScrollView>  
                </SafeAreaView>
              )
      }
    </View>
  )
}

export default Album

