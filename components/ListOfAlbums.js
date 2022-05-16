import { Text, View, SafeAreaView, TouchableOpacity, Keyboard} from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { v4 as uuidv4 } from 'uuid';
import AlbumView from './AlbumView'
import { Style } from '../styles/style'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Dialog from "react-native-dialog";
import {getValue, setValue} from './Storage'


const ListOfAlbums = () => {
    
    const [visibleNew, setVisibleNew] = useState(false);
  
    const [name, setName] = useState('');
  
    const [albums, setAlbums] = useState([])
  
    useEffect(()=>{
      getValue('albums')
        .then(result =>
          setAlbums(result == null ? [] : result)
        )
    },[])
    
    const showDialog = () => {
      setVisibleNew(true);
    };

    const onChange = (text) => {
        setName(text)
    }

    
    const handleConfirmNew = () => {
       Keyboard.dismiss()
        setVisibleNew(false);
        albums.push({ id:uuidv4(), name: name, profileImage:null})
        setValue(albums, 'albums')
    };

    const handleCancelNew = () => {
    Keyboard.dismiss()
    setVisibleNew(false);
    };

    
    
    const onDragEnd = ({ data }) => {
        setAlbums(data)
        setValue(data, 'albums')
    }
    
    const renderItem = ({ item,  drag, isActive }) => {
    return (
      <AlbumView
        el={item}
        drag={drag}
        isActive={isActive}
        setAlbums={setAlbums}
        albums={albums}
      />
    )
  }

  return (
    <SafeAreaView style={Style.container}>
          <View style={Style.header}>
              <Text style={Style.title}>Мои Альбомы</Text>
              <TouchableOpacity onPress={showDialog}>
                  <Icon name='pluscircleo' size={30} color="white" />
              </TouchableOpacity>
          </View>   
          <DraggableFlatList
              style={Style.albumList}
              data={albums}
              keyExtractor={(item) => item.id}
              onDragEnd={onDragEnd}

              renderItem={renderItem}
          />
      <Dialog.Container visible={visibleNew}>
            <Dialog.Title>Новый альбом</Dialog.Title>
        <Dialog.Description>
          Введите название альбома
        </Dialog.Description>
              <Dialog.Input placeholder='название' onChangeText={onChange} />
        <Dialog.Button label="Подтвердить" onPress={handleConfirmNew} />
        <Dialog.Button label="Отмена" onPress={handleCancelNew} />
      </Dialog.Container>
    </SafeAreaView>
  )
}

export default ListOfAlbums

