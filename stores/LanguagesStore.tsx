import { observable } from 'mobx';
import { createContext } from 'react';

class LanguagesStore {
     @observable languageFrom = 'english';
     @observable languageTo = 'spanish';
}

export const LanguagesStoreContext = createContext(new LanguagesStore());