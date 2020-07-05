import { observable } from 'mobx';
import { createContext } from 'react';

class ImageStore {
     @observable imageURI = '';
}

export const ImageStoreContext = createContext(new ImageStore());