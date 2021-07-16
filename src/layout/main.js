import React ,{Component} from 'react';
import {Button} from 'antd';
import {ArrowUpOutlined, UploadOutlined, PlusOutlined} from '@ant-design/icons'
import md5 from 'md5';
import {connect} from 'react-redux';
import FolderDialog from '../components/FolderDialog';
import FileDialog from '../components/FileDialog';
import Item from '../components/Items';
import Navigator from '../components/Navigator';

class Main extends Component{
    state={
        folderModalVisible:false,
        fileModalVisible : false,
        selectedNodes:[],
        fileSystem:{}
    };
    static getDerivedStateFromProps(nextprops,prevstate){
        if(prevstate.fileSystem !== nextprops.fileSystem)
            return {...prevstate, fileSystem: nextprops.fileSystem};
        return {prevstate};
    }
    componentDidUpdate(prevProps,prevsState){
        console.log(prevProps.fileSystem);
    }
    showPathEntries = (globalPath, fileSystem) => {
        return fileSystem[md5(globalPath)]
          ? fileSystem[md5(globalPath)].children.map(
              childrenID => fileSystem[childrenID]
            )
          : [];
      };
      onPathUp = ()=>{
        const {globalPath, changeFolder} = this.props;
        let newPath = globalPath.slice(0,globalPath.lastIndexOf('/'));
        changeFolder(newPath.slice(0,newPath.lastIndexOf('/')+1));
    }
    OnItemClick=(nodeId)=>{
        const {selectedNodes} = this.state;
        if(!selectedNodes.includes(nodeId)){
            this.setState({...this.state,selectedNodes:[nodeId]})
        }else if(selectedNodes.length > 1){
            let newSelectedNodes = selectedNodes.filter(item=>item !== nodeId)
            this.setState({...this.state,selectedNodes:newSelectedNodes})
        }
    }
    render(){
        const {fileSystem} = this.state;
        const { globalPath} = this.props;
        console.log(md5(globalPath));
        const nodes = this.showPathEntries(globalPath,fileSystem);
        console.log(nodes);
        return(
            <div className="w-75 bg-light p-2 ">
                <div className="w-100 bg-white d-flex flex-row p-2" >
                    <div style={{width:'70%'}} className="d-flex flex-row">
                        <Button disabled={globalPath === 'root/'} onClick={this.onPathUp} type="link" icon={<ArrowUpOutlined />}></Button>
                        <Navigator></Navigator>
                    </div>
                    <div style={{width:'30%'}}>
                        <Button className="mx-1" onClick={()=>{this.setState({...this.state,fileModalVisible:true})}} icon={<UploadOutlined />}>{"Upload File"}</Button>
                        <Button className="mx-1" onClick={()=>{this.setState({...this.state,folderModalVisible:true})}} icon={<PlusOutlined />}>{"New Folder"}</Button>
                    </div>
                </div>
                <div className="d-flex flex-row p-2 flex-wrap">
                    { nodes.map((item,index)=><Item key={index} node={item} onClick={this.OnItemClick} isSelected={this.state.selectedNodes.includes(md5(item.path))}/>)}
                </div>
                { this.state.folderModalVisible?<FolderDialog visible={this.state.folderModalVisible} onCancel={()=>{this.setState({...this.state,folderModalVisible:false})}}></FolderDialog>:null}
                { this.state.fileModalVisible?<FileDialog visible={this.state.fileModalVisible} onCancel={()=>{this.setState({...this.state,fileModalVisible:false})}}></FileDialog>:null}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        fileSystem : state.fileSystem,
        globalPath : state.globalPath
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        changeFolder:(path)=>{dispatch({type:"CHANGE_PATH",path})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);