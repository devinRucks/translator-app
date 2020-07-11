import * as React from 'react';
// import { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';

const TranslationTextBoxes = (props: any) => {
     // props: originalText and translatedText

     return (
          <View style={styles.container}>
               <View style={styles.textBox}>
                    <Text style={styles.arrow}>{props.originalText}</Text>
               </View>
               <Text style={styles.arrow}>Arrow</Text>
               <View style={styles.textBox}>
                    <Text style={styles.arrow}>Pescado</Text>
               </View>
          </View>
     );
}


const styles = StyleSheet.create({
     container: {
          height: 60,
          width: '80%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          fontSize: 15,
          color: 'white',
          borderColor: 'green',
          borderWidth: 2
     },
     textBox: {
          height: 30,
          width: '40%',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          color: 'white',
          borderColor: 'green',
          borderWidth: 2
     },
     arrow: {
          fontSize: 15,
          color: 'white'
     }
});

export default TranslationTextBoxes;