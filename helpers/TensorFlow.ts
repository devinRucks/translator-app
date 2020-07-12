import jpeg from 'jpeg-js';
import { fetch } from '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

const detectObjects = async (imageLink: string): Promise<Array<Object>> => {
     return new Promise<Array<Object>>(async (resolve) => {
          // If an image has been selected, run detectObects();
          if (imageLink !== '') {
               try {
                    const response = await fetch(imageLink, {}, { isBinary: true })
                    const rawImageData = await response.arrayBuffer()

                    await tf.ready();

                    const imageTensor = imageToTensor(rawImageData)
                    console.log(imageTensor)

                    cocoSsd.load().then(async (model) => {
                         model.detect(imageTensor).then((predictions: any) => {
                              resolve(predictions);
                         })
                    })

               } catch (error) {
                    console.log('Exception Error: ', error)
               }
          }
     })
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

export default detectObjects;