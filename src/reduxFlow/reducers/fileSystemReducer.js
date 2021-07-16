import generatedDummyFileSystem from '../../common/initialFileSystem';
import {AddEntry, DeletEntry, EditEntry} from '../../common/fileSystemOperations';

const fileSystem =  (data = generatedDummyFileSystem(), action) => {
    if (action.type === 'ADD_ENTRY'){
        let newEntry = action.entry;
        return AddEntry(data,newEntry);
    }else if(action.type === 'DELETE_ENTRY'){
        return {...DeletEntry(data,action.entry)};
    }else if(action.type === 'RENAME_ENTRY'){
        return {...EditEntry(data,action.oldEntry,action.newEntry)};
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