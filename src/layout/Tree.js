import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from 'antd';
import { UploadOutlined, PlusOutlined} from '@ant-design/icons'
import {  CreateFileStructure } from '../common/fileSystemOperations';
import SideMenu from "../components/SideMenu";
import FolderDialog from '../components/FolderDialog';
import FileDialog from '../components/FileDialog';

class Tree extends Component {

    state =
        {
            folderModalVisible:false,
            fileModalVisible : false,
        }

    render() {
        const { files } = this.props;
        let root = CreateFileStructure(files)[0];
        return (
            <div className="w-25 bg-white p-2">
                <div style={{ width: '100%', height: '7%', background: '#f2f3f9' }} className='m-2 p-2'>
                    <div className="col-4 d-flex flex-row">
                        <Button className="mx-1" onClick={() => { this.setState({ ...this.state, fileModalVisible: true }) }} icon={<UploadOutlined />}>{"Upload File"}</Button>
                        <Button className="mx-1" onClick={() => { this.setState({ ...this.state, folderModalVisible: true }) }} icon={<PlusOutlined />}>{"New Folder"}</Button>
                    </div>
                </div>
                <SideMenu fileStructure={root} />
                { this.state.folderModalVisible?<FolderDialog visible={this.state.folderModalVisible} onCancel={()=>{this.setState({...this.state,folderModalVisible:false})}}></FolderDialog>:null}
                { this.state.fileModalVisible?<FileDialog visible={this.state.fileModalVisible} onCancel={()=>{this.setState({...this.state,fileModalVisible:false})}}></FileDialog>:null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.fileSystem,
    };

}

export default connect(mapStateToProps)(Tree);