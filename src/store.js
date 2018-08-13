import {createStore} from 'redux';
import reducer from './ducks/counter'

let store = createStore(reducer);

export default store;
