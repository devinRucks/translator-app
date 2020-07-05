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
     const [model, setModel] = useState({})
     const [predictions, setPredictions] = useState({})

     useEffect(() => {
          setModel(cocoSsd.load()); // preparing COCO-SSD model
     }, [])

     const detectObjects = async () => {
          try {
               const imageAssetPath = Image.resolveAssetSource(ImageStore.imageURI)
               const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
               const rawImageData = await response.arrayBuffer()
               const imageTensor = imageToTensor(rawImageData)
               setPredictions(await model.detect(imageTensor))
          } catch (error) {
               console.log('Exception Error: ', error)
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

     // If an image has been selected, run detectObects();
     if (Object.keys(ImageStore.imageURI).length !== 0) {
          detectObjects();
     }

     // const renderPrediction = (prediction, index) => {
     //      const pclass = prediction.class;
     //      const score = prediction.score;
     //      const x = prediction.bbox[0];
     //      const y = prediction.bbox[1];
     //      const w = prediction.bbox[2];
     //      const h = prediction.bbox[3];
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
                    onPress={() => objectDetection()}>
                    <Text style={styles.translateBtnTxt}>Go!</Text>
               </TouchableOpacity>
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
     }
});

export default Translation;