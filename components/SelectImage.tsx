import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { View } from '../components/Themed';

const SelectImage = () => {
     const [image, setImage] = useState('');

     useEffect(() => {
          getPermissionsAsync();
     })

     const getPermissionsAsync = async () => {
          if (Constants.platform?.ios) {
               const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
               if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
               }
          }
     }

     const pickImage = async () => {
          try {
               let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
               });
               if (!result.cancelled) {
                    setImage(result.uri);
               }

               console.log(result);
          } catch (E) {
               console.log(E);
          }
     };

     return (
          <View style={styles.container}>
               {image !== '' && <Image source={{ uri: image }} style={styles.imageContainer} />}
               <TouchableOpacity
                    style={styles.imageSelect}
                    onPress={() => pickImage()}>
                    <Text style={styles.imageSelectText}>Camera Roll</Text>
               </TouchableOpacity>
          </View>
     );
}


const styles = StyleSheet.create({
     container: {
          flex: 2,
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderColor: 'green',
          borderWidth: 2
     },
     imageSelect: {
          marginRight: 40,
          marginLeft: 40,
          marginTop: 10,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#fff'
     },
     imageSelectText: {
          color: '#000000',
          textAlign: 'center',
          paddingLeft: 10,
          paddingRight: 10
     },
     imageContainer: {
          height: '80%',
          width: '100%'
     },
     title: {
          fontSize: 20,
          fontWeight: 'bold',
     }
});

export default SelectImage;