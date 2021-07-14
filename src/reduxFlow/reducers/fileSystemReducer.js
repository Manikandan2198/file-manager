import generatedDummyFileSystem from '../../common/initialFileSystem';
import {AddEntry} from '../../common/fileSystemOperations';

const fileSystem =  (data = generatedDummyFileSystem(), action) => {
    if (action.type === 'ADD_ENTRY'){
        let newEntry = action.entry;
        return AddEntry(data,newEntry);
    }
    return data;
};

const globalPath =(data = "root/",action) =>{
    if(action.type === 'CHANGE_PATH'){
        return action.path;
    }
    return data;
}
export {fileSystem,globalPath};