import React ,{Component} from 'react';
import {Button} from 'antd';
import {ArrowUpOutlined, UploadOutlined, PlusOutlined} from '@ant-design/icons'
import md5 from 'md5';
import {connect} from 'react-redux';
import FolderDialog from '../components/FolderDialog';

import Item from '../components/Items';

class Main extends Component{
    state={
        modalVisible:false
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
    render(){
        const {fileSystem, globalPath} = this.props;
        console.log(md5(globalPath));
        const nodes = this.showPathEntries(globalPath,fileSystem);
        console.log(nodes);
        return(
            <div className="w-75 bg-light p-2 ">
                <div className="w-100 bg-white d-flex flex-row p-2" >
                    <div style={{width:'70%'}}>
                        <Button disabled={globalPath === 'root/'} onClick={this.onPathUp} type="link" icon={<ArrowUpOutlined />}></Button>
                    </div>
                    <div style={{width:'30%'}}>
                        <Button className="mx-1" icon={<UploadOutlined />}>{"Upload File"}</Button>
                        <Button className="mx-1" onClick={()=>{this.setState({...this.state,modalVisible:true})}} icon={<PlusOutlined />}>{"New Folder"}</Button>
                    </div>
                </div>
                <div className="d-flex flex-row p-2">
                    { nodes.map((item,index)=><Item key={index} node={item} />)}
                </div>
                { this.state.modalVisible?<FolderDialog visible={this.state.modalVisible} onCancel={()=>{this.setState({...this.state,modalVisible:false})}}></FolderDialog>:null}
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