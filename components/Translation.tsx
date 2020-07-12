import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import TranslationTextBoxes from '../components/TranlationTextBoxes';
import { PredictionsStoreContext } from '../stores/PredictionsStore';
import translateText from '../helpers/Translate';



const Translation = observer(() => {
     const PredictionsStore = useContext(PredictionsStoreContext)

     const translate = async () => {
          await translateText();
     }

     return (
          <View style={styles.container}>
               <TouchableOpacity
                    style={styles.translateBtn}
                    onPress={() => translate()}>
                    <Text style={styles.translateBtnTxt}>Go!</Text>
               </TouchableOpacity>
               {PredictionsStore.predictions.map((item: any, key: number) => {
                    return < TranslationTextBoxes originalText={item.class} key={key} />
               })}
          </View>
     );
});


const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          borderColor: 'blue',
          borderWidth: 2
     },
     translateBtn: {
          borderRadius: 50,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF'
     },
     translateBtnTxt: {
          color: '#000000',
          fontSize: 20
     },
     predictionTxt: {
          color: '#FFFFFF',
          fontSize: 30
     }
});

export default Translation;