import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5'
import { saveAs } from 'file-saver';
import { Menu, Dropdown } from 'antd';
import RenameDialog from './RenameDialog';
import PropertiesDialog from './PropertiesDialog';



class Item extends Component {

    state={
        renameModalVisible:false,
        propertiesModal:false
    }

    onDoubleClick = () => {
        const { node, changeFolder, globalPath } = this.props;
        console.log(`${globalPath}${node.name}${'/'}`)
        console.log(md5(`${globalPath}${node.name}${'/'}`));
        if (node.type === 'folder')
            changeFolder(`${globalPath}${node.name}${'/'}`)
        else
            saveAs(node.file,node.name);
    }
    onEdit=()=>{
        this.setState({...this.state,renameModalVisible:true});
    }
    showProperties=()=>{
        this.setState({...this.state,propertiesModalVisible:true});
    }
    onDelete=()=>{
        const {deleteEntry, node} = this.props;
        if(confirm("Do you want to delete this item")){
            deleteEntry(md5(node.path));
            
        }
    }

    render() {
        const { node } = this.props;
        console.log(node)

        const menu = (
            <Menu>
                <Menu.Item key="1" onClick={this.onEdit}>{'Rename'}</Menu.Item>
                <Menu.Item key="2" onClick={this.onDelete}>{'Delete'}</Menu.Item>
                <Menu.Item key="3" onClick={this.showProperties}>{'Properties'}</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} trigger={['contextMenu']}>
                <div onContextMenu={() => this.props.onClick(md5(node.path))} onClick={() => this.props.onClick(md5(node.path))} onDoubleClick={this.onDoubleClick} style={{ height: 100, width: 100, background: this.props.isSelected ? 'antiquewhite' : '' }} className='p-2 m-2 text-center'>
                    {node.type === 'folder' ? <img src="./src/styles/images/folder.png" /> : <img style={{ height: '60px' }} src="./src/styles/images/file.png" />}
                    <div className="w-100 text-center text-break" style={{fontSize:'small'}}>{node.name}</div>
                    {this.state.renameModalVisible?<RenameDialog  node={node} visible={this.state.renameModalVisible} onCancel={()=>{this.setState({...this.state,renameModalVisible:false})}}></RenameDialog>:null}
                    {this.state.propertiesModalVisible?<PropertiesDialog  node={node} visible={this.state.propertiesModalVisible} onCancel={()=>{this.setState({...this.state,propertiesModalVisible:false})}}></PropertiesDialog>:null}
                </div>
            </Dropdown>



        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeFolder: (path) => { dispatch({ type: "CHANGE_PATH", path }) },
        deleteEntry : (entry) => { dispatch({type:"DELETE_ENTRY",entry})}
    }
}

const mapStateToProps = (state) => {
    return {
        globalPath: state.globalPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);