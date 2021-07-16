import md5 from 'md5';

const recalculateSize=(fileSystem,parentId,size)=>{
    while(parentId !== null){
        fileSystem[parentId].size += size;
        parentId = fileSystem[parentId].parentID;
    }
}
const AddEntry = (fileSystem,newEntry)=>{
    if(newEntry.type === 'folder'){
        let duplicates = fileSystem[newEntry.parentID].children.map(item=>fileSystem[item]).filter(item=>item.name.includes(newEntry.name)).length;
        if(duplicates>0){
            newEntry.name = `${newEntry.name}_${duplicates}`;
            newEntry.path = `${newEntry.parentPath}${newEntry.name}${'/'}`
        }
        let newEntrykey = md5(newEntry.path);
        fileSystem[newEntrykey] = newEntry;
        fileSystem[newEntry.parentID].children.push(newEntrykey);
        recalculateSize(fileSystem,newEntry.parentID,newEntry.size);
    }else{
        let duplicates = fileSystem[newEntry.parentID].children.map(item=>fileSystem[item]).filter(item=>item.name.includes(newEntry.name)).length;
        if(duplicates>0){
            let temp = newEntry.name.split('.');
            if (temp.length > 1) {
                temp[temp.length - 2] = `${temp[temp.length - 2]}_${duplicates}`;
                newEntry.name = temp.join('.');
            } else {
                newEntry.name = `${newEntry.name}_${duplicates}`;
            }
            newEntry.path = `${newEntry.parentPath}${newEntry.name}`
        }
        let newEntrykey = md5(newEntry.path);
        fileSystem[newEntrykey] = newEntry;
        fileSystem[newEntry.parentID].children.push(newEntrykey);
        recalculateSize(fileSystem,newEntry.parentID,newEntry.size);
    }
    return fileSystem;
}


const DeletEntry=(fileSystem,entryId)=>{
    let data = fileSystem[entryId]
    if(data.type === 'folder'){
        data.children.forEach(element => {
            DeletEntry(fileSystem,element);
        });
    }
    let parentId = data.parentID;
    let index = fileSystem[parentId].children.indexOf(entryId);
    if(index !== -1){
        fileSystem[parentId].children.splice(index,1);
    }
    recalculateSize(fileSystem,fileSystem[entryId].parentID,-fileSystem[entryId].size);
    delete fileSystem[entryId];
    return fileSystem;
}

const EditEntry = (fileSystem, oldEntry, newEntry)=>{
    let parent = fileSystem[oldEntry.parentID];
    let duplicates = fileSystem[newEntry.parentID].children.map(item=>fileSystem[item]).filter(item=>item.name.includes(newEntry.name)).length;
    if(duplicates>0){
        newEntry.name = `${newEntry.name}_${duplicates}`;
        newEntry.path = `${newEntry.parentPath}${newEntry.name}${'/'}`
    }
    let index = parent.children.indexOf(md5(oldEntry.path));
    if(index !== -1)
        parent.children[index] = md5(newEntry.path);
    delete fileSystem[md5(oldEntry.path)];
    fileSystem[md5(newEntry.path)] = newEntry;
    newEntry.children.map(elementId=>fileSystem[elementId]).forEach(element=>{
        let newElement = {...element};
        newElement.parentPath = newEntry.path;
        newElement.path = `${newElement.parentPath}${newElement.name}${'/'}`;
        newElement.parentID = md5(newEntry.path);
        element.parentID = newElement.parentID;
        EditEntry(fileSystem,element,newElement);
    });
    return fileSystem;
}
export {AddEntry,DeletEntry,EditEntry};