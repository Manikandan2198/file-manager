import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal,message as AntdMessage } from 'antd';
import md5 from 'md5';
import { ADD_ENTRY} from '../common/Constants';

const getDate = () => {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${[year, month, day].join('-')}${' '}${d.getHours()}${':'}${d.getMinutes()}`;
  };

class FolderDialog extends Component {

    state = {
        folderName: "New Folder"
    }

    onOk = () => {
        const {globalPath, addEntry} = this.props;
        if(this.state.folderName === ''){
            AntdMessage.error("Folder name cannot be empty");
        }else{
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
    }
    render() {

        return (
            <Modal title={<h5 className='text-primary'>{'Folder Name'}</h5>} width='20%' visible={this.props.visible} onCancel={this.props.onCancel} onOk={this.onOk}>
                <input type='text' className='w-100' value={this.state.folderName} onChange={(e) => { this.setState({...this.state,folderName:e.target.value}) }}></input>
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
        addEntry:(entry)=>{dispatch({type:ADD_ENTRY,entry})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FolderDialog);