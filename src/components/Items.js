import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5'
import { saveAs } from 'file-saver';
import { Menu, Dropdown } from 'antd';
import RenameDialog from './RenameDialog';
import PropertiesDialog from './PropertiesDialog';
import icons from '../common/Icons';
import {  DELETE_ENTRY, MULTIPLE_DELETE, FOLDER, FILE, CHANGE_PATH} from '../common/Constants'


class Item extends Component {

    state={
        renameModalVisible:false,
        propertiesModal:false
    }

    onDoubleClick = () => {
        const { node, changeFolder, globalPath } = this.props;
        console.log(md5(`${globalPath}${node.name}${'/'}`));
        if (node.type === FOLDER)
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
    onMultipleDelete=()=>{
        const {selectedNodes, deleteMultipleEntry} = this.props;
        if(confirm("Do you want to delete selected items")){
            deleteMultipleEntry(selectedNodes);
        } 
    }
    render() {
        const { node, searchText } = this.props;
        const GetDisplayname=()=>{
            if(searchText === '')
                return node.name;
            else{
                let firstPart = node.name.substr(0,node.name.indexOf(searchText));
                let lastPart = node.name.substr(node.name.indexOf(searchText)+searchText.length)
                return(
                    <p>{firstPart}<span style={{background:'yellow'}}>{searchText}</span>{lastPart}</p>
                )
            }
        }
        const singleMenu = (
            <Menu>
                <Menu.Item key="1" onClick={this.onEdit}>{'Rename'}</Menu.Item>
                <Menu.Item key="2" onClick={this.onDelete}>{'Delete'}</Menu.Item>
                <Menu.Item key="3" onClick={this.showProperties}>{'Properties'}</Menu.Item>
            </Menu>
        );
        const multipleMenu = (
            <Menu>
                <Menu.Item key="1" onClick={this.onMultipleDelete}>{'Delete'}</Menu.Item>
            </Menu>
        )
        let nameParts = node.name.split('.');
        let ext = nameParts[nameParts.length-1];
        let iconSrc = (node.type === FOLDER)?icons[FOLDER]:icons[ext]?icons[ext]:icons[FILE];
        return (
            <Dropdown overlay={this.props.selectedNodes.length>1?multipleMenu:singleMenu} trigger={['contextMenu']}>
                <div onContextMenu={(e) => {this.props.onClick(md5(node.path),e)}} onClick={(e) => {this.props.onClick(md5(node.path),e);e.stopPropagation()}} onDoubleClick={this.onDoubleClick} style={{ height: 100, width: 100, background: this.props.isSelected ? '#d9eae6' : '' }} className='p-2 m-2 text-center'>
                    <img style={{ height: '60px' }} src={iconSrc}/>
                    <div className="w-100 text-center text-break" style={{fontSize:'small'}}>{GetDisplayname()}</div>
                    {this.state.renameModalVisible?<RenameDialog  node={node} visible={this.state.renameModalVisible} onCancel={()=>{this.setState({...this.state,renameModalVisible:false})}}></RenameDialog>:null}
                    {this.state.propertiesModalVisible?<PropertiesDialog  node={node} visible={this.state.propertiesModalVisible} onCancel={()=>{this.setState({...this.state,propertiesModalVisible:false})}}></PropertiesDialog>:null}
                </div>
            </Dropdown>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeFolder: (path) => { dispatch({ type: CHANGE_PATH, path }) },
        deleteEntry : (entry) => { dispatch({type:DELETE_ENTRY,entry})},
        deleteMultipleEntry: (entries) =>{dispatch({type:MULTIPLE_DELETE,entries})}
    }
}

const mapStateToProps = (state) => {
    return {
        globalPath: state.globalPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);