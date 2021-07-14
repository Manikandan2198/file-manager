import md5 from 'md5';

const AddEntry = (fileSystem,newEntry)=>{
    if(newEntry.type === 'folder'){
        if(fileSystem[newEntry.parentID].children.map(item=>fileSystem[item]).filter(item=>item.name.includes(newEntry.name)).length>0){
            newEntry.name = `${newEntry.name}_1`;
        }
        let newEntrykey = md5(newEntry.path);
        fileSystem[newEntrykey] = newEntry;
        fileSystem[newEntry.parentID].children.push(newEntrykey);
    }
    return fileSystem;
}

export {AddEntry};