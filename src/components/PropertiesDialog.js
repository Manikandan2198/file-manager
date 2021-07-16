import React, { Component } from 'react';
import { Modal } from 'antd';




class PropertiesDialog extends Component {

    
    render() {
        const {node} = this.props;
        console.log(this.props.node)
        return (
            <Modal title='Properties' width='400px' visible={this.props.visible} onCancel={this.props.onCancel} footer={null}>
                <div className='row'>
                    <div className='col-4'>
                        <div className='font-weight-bold text-right px-1'>{'Name'}</div>
                    </div>
                    <div className='col-8'>
                        <div className='font-weight-normal px-1'>{node.name}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className='font-weight-bold text-right px-1'>{'Location'}</div>
                    </div>
                    <div className='col-8'>
                        <div className='font-weight-normal px-1'>{node.path}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className='font-weight-bold text-right px-1'>{'Size'}</div>
                    </div>
                    <div className='col-8'>
                        <div className='font-weight-normal px-1'>{`${node.size}${'B'}`}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className='font-weight-bold text-right px-1'>{'LastModified'}</div>
                    </div>
                    <div className='col-8'>
                        <div className='font-weight-normal px-1'>{node.date}</div>
                    </div>
                </div>
            </Modal>
        )

    }
}



export default PropertiesDialog;