import generatedDummyFileSystem from '../../common/initialFileSystem';
import {AddEntry, DeletEntry, EditEntry, MultipleDelete} from '../../common/fileSystemOperations';

const fileSystem =  (data = generatedDummyFileSystem(), action) => {
    if (action.type === 'ADD_ENTRY'){
        let newEntry = action.entry;
        return {...AddEntry(data,newEntry)};
    }else if(action.type === 'DELETE_ENTRY'){
        return {...DeletEntry(data,action.entry)};
    }else if(action.type === 'RENAME_ENTRY'){
        return {...EditEntry(data,action.oldEntry,action.newEntry)};
    }else if(action.type === 'DELETE_MULTIPLE'){
        return {...MultipleDelete(data,action.entries)};
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