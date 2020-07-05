import * as React from 'react';
// import { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';

const Translation = () => {

     return (
          <View style={styles.container}>
               <Text style={styles.text}>Translation</Text>
          </View>
     );
}


const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'blue',
          borderWidth: 2
     },
     text: {
          color: 'blue',
          fontSize: 20
     }
});

export default Translation;