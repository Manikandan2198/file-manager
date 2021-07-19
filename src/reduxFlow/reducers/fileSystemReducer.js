import InitialFileSystem from '../../common/initialFileSystem';
import {AddEntry, DeletEntry, EditEntry, MultipleDelete} from '../../common/fileSystemOperations';
import { ADD_ENTRY, DELETE_ENTRY, RENAME_ENTRY, MULTIPLE_DELETE, CHANGE_PATH, ROOT} from '../../common/Constants';

const fileSystem =  (data = InitialFileSystem, action) => {
    if (action.type === ADD_ENTRY){
        let newEntry = action.entry;
        return {...AddEntry(data,newEntry)};
    }else if(action.type === DELETE_ENTRY){
        return {...DeletEntry(data,action.entry)};
    }else if(action.type === RENAME_ENTRY){
        return {...EditEntry(data,action.oldEntry,action.newEntry)};
    }else if(action.type === MULTIPLE_DELETE){
        return {...MultipleDelete(data,action.entries)};
    }
    return data;
};

const globalPath =(data = ROOT,action) =>{
    if(action.type === CHANGE_PATH){
        return action.path;
    }
    return data;
}
export {fileSystem,globalPath};