import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { ImageStoreContext } from '../stores/ImageStore';
import { View } from '../components/Themed';
import jpeg from 'jpeg-js';
import { fetch } from '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

const Translation = observer(() => {
     const ImageStore = useContext(ImageStoreContext)
     const [prediction, setPrediction] = useState('')

     // useEffect(() => {
     //      detectObjects();
     // }, [])

     const detectObjects = async () => {
          // If an image has been selected, run detectObects();
          if (ImageStore.imageURI !== '') {
               try {
                    const response = await fetch(ImageStore.imageURI, {}, { isBinary: true })
                    const rawImageData = await response.arrayBuffer()

                    await tf.ready();

                    const imageTensor = imageToTensor(rawImageData)
                    console.log(imageTensor)

                    cocoSsd.load().then(async (model) => {
                         model.detect(imageTensor).then((prediction: any) => {
                              console.log(prediction)
                              setPrediction(prediction[0].class);
                         })
                    })

               } catch (error) {
                    console.log('Exception Error: ', error)
               }
          }
     }

     // Not sure about ArrayBuffer as argument. Something to do with ts
     const imageToTensor = (rawImageData: ArrayBuffer) => {
          const { width, height, data } = jpeg.decode(rawImageData)
          // Drop the alpha channel info for COCO-SSD
          const buffer = new Uint8Array(width * height * 3)
          let offset = 0 // offset into original data
          for (let i = 0; i < buffer.length; i += 3) {
               buffer[i] = data[offset]
               buffer[i + 1] = data[offset + 1]
               buffer[i + 2] = data[offset + 2]
               offset += 4
          }
          return tf.tensor3d(buffer, [height, width, 3])
     }


     // const renderPrediction = () => {
     //      const pclass = predictions.class;
     //      const score = predictions.score;
     //      const x = predictions.bbox[0];
     //      const y = predictions.bbox[1];
     //      const w = predictions.bbox[2];
     //      const h = predictions.bbox[3];
     //      return (
     //           <View style={styles.welcomeContainer}>
     //                <Text key={index} style={styles.text}>
     //                     Prediction: {pclass} {', '} Probability: {score} {', '} Bbox: {x} {', '} {y} {', '} {w} {', '} {h}
     //                </Text>
     //           </View>
     //      )
     // }

     return (
          <View style={styles.container}>
               <TouchableOpacity
                    style={styles.translateBtn}
                    onPress={() => detectObjects()}>
                    <Text style={styles.translateBtnTxt}>Go!</Text>
               </TouchableOpacity>
               <Text style={styles.predictionTxt}>{prediction}</Text>
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