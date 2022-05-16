import { Text, View, TouchableOpacity, Image,Keyboard } from 'react-native'
import React, {useState} from 'react'
import { Style } from '../styles/style'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import {ScaleDecorator} from "react-native-draggable-flatlist";
import { SwipeRow } from 'react-native-swipe-list-view';
import Dialog from "react-native-dialog";
import { pickAlbumProfile } from './PickImage';
import {setValue, removeValue} from './Storage'



const AlbumView = ({ el, drag, isActive, setAlbums, albums}) => {

  const navigation = useNavigation()

  const [visibleEdit, setVisibleEdit] = useState(false);

  const [name, setName] = useState('');

  const [image, setImage] = useState(el.profileImage)


  const onChange = (text) => {
        setName(text)
    }

  const handleConfirmEdit = () => {
      Keyboard.dismiss()
      setVisibleEdit(false);
      el.name=name  
      setValue(albums, 'albums')
    };

  const handleCancelEdit = () => {
    Keyboard.dismiss()
    setVisibleEdit(false);
    };

  const openAlbum = () => {
    navigation.navigate('Album', {album: el})
    
  }

  const handleDelete = () => {
    let a = albums.filter(album => album.id != el.id)
    setAlbums(a)
    removeValue(el.name)
    setValue(a, 'albums')
  }

  const handlePicture = () => {
    pickAlbumProfile()
      .then(result => {
        el.profileImage = {uri:result} 
        setImage(el.profileImage)
        setValue(albums, 'albums')
      })
    
    
    
  }
  
  return (
    
  <ScaleDecorator>
    <SwipeRow
      rightOpenValue={-130}
      friction={7}
      tension={90}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      disableRightSwipe={true}
    >
    <View style={Style.hidden}>
      <TouchableOpacity onPress={()=>setVisibleEdit(true)}>
        <Icon name='edit' size={25} color="white" style={{marginRight:15, marginBottom:10}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePicture}>
        <Icon name='picture' size={25} color="white" style={{marginRight:15, marginBottom:10}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
        <Icon name='delete' size={25} color="white" style={{marginRight:15, marginBottom:10}}/>
      </TouchableOpacity>
    </View>
    <TouchableOpacity activeOpacity={1} onPress={openAlbum} onLongPress={drag} disabled={isActive} >
      <View style={Style.album}> 
            <Image source={image==null?require('../assets/icon.png'):image} style={{width:100, height:100,alignSelf:'center', borderRadius:5}}/>
        <View style={Style.name}>
          <Text style={Style.text} numberOfLines={1} >{el.name}</Text>
        </View>
        <Icon name='right' size={20} color="white" style={{alignSelf:'center', marginRight:15}}/>
      </View>
    </TouchableOpacity>
  </SwipeRow>
      <Dialog.Container visible={visibleEdit}>
        <Dialog.Title>Новое название</Dialog.Title>
        <Dialog.Description>
          Введите название альбома
        </Dialog.Description>
        <Dialog.Input placeholder='название' onChangeText={onChange} />
        <Dialog.Button label="Подтвердить" onPress={handleConfirmEdit} />
        <Dialog.Button label="Отмена" onPress={handleCancelEdit} />
      </Dialog.Container>
</ScaleDecorator>
    
  )
}

export default AlbumView

