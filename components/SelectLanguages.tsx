import * as React from 'react';
// import { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';

const SelectLanguages = () => {

     return (
          <View style={styles.container}>
               <Text style={styles.text}>Select Languages</Text>
          </View>
     );
}


const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'purple',
          borderWidth: 2
     },
     text: {
          color: 'purple',
          fontSize: 20
     }
});

export default SelectLanguages;