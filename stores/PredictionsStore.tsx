import { observable } from 'mobx';
import { createContext } from 'react';

class PredictionsStore {
     @observable predictions = [{}];
}

export const PredictionsStoreContext = createContext(new PredictionsStore());