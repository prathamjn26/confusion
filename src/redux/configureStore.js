import {intialState,Reducer} from './reducer'
import {createStore} from 'redux'

export const ConfigureStore=()=>{
    const store=createStore(Reducer,intialState);
    return store;
}