import { combineReducers } from 'redux';
import authData from './auth';
import appData from './app';
import sysData from './system';

export default function createReducer(){
return combineReducers({
    authData,appData , sysData
    });
}