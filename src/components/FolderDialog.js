import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import md5 from 'md5';

const getDate = () => {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };

class FolderDialog extends Component {

    state = {
        folderName: "New Folder"
    }

    onOk = () => {
        const {globalPath, addEntry} = this.props;
        let newEntry = {
            type:'folder',
            name:this.state.folderName,
            size:0,
            date:getDate(),
            path:`${globalPath}${this.state.folderName}${'/'}`,
            parentID:md5(globalPath),
            parentPath:globalPath,
            children:[]
        }
        addEntry(newEntry);
        this.props.onCancel();
    }
    render() {

        return (
            <Modal title='Folder Name' width='200px' visible={this.props.visible} onCancel={this.props.onCancel} onOk={this.onOk}>
                <input type='text' value={this.state.folderName} onChange={(e) => { this.setState({...this.state,folderName:e.target.value}) }}></input>
            </Modal>
        )

    }
}

const mapStateToProps=(state)=>{
    return {
        globalPath : state.globalPath
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        addEntry:(entry)=>{dispatch({type:"ADD_ENTRY",entry})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FolderDialog);