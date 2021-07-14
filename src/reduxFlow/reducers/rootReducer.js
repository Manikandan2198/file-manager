import { combineReducers } from 'redux';
import {fileSystem, globalPath} from './fileSystemReducer';


export default combineReducers({ 
    fileSystem,
    globalPath
});