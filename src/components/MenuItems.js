import React, { Component } from "react";
import { connect } from 'react-redux';
import { CaretRightFilled, CaretDownFilled } from '@ant-design/icons';
import { CHANGE_PATH} from '../common/Constants';

class MenuItems extends Component {

    state = {
        childVisible: false
    }

    onmenuClick = () => {
        const { changeFolder, node } = this.props;
        changeFolder(node.path)
    }

    render() {
        const { node } = this.props;
        return (
            <div>
                {node.children.length === 0 ?
                    <div className="px-1 d-flex flex-row" key={node.path}>
                        <div style={{ width: '5%', alignItems: 'center' }}></div>
                        <div style={{ width: '90%', cursor: "pointer" }} onClick={this.onmenuClick}><h6 className="p-1">{node.name}</h6></div>
                    </div>
                    :
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <div style={{ display: 'flex', flexDirection: 'row' }} key={node.path} >
                            <div style={{ width: '5%', alignItems: 'center' }} onClick={() => { this.setState({ ...this.state, childVisible: !this.state.childVisible }) }}>
                                {this.state.childVisible ? <CaretDownFilled /> : <CaretRightFilled />}
                            </div>
                            <div style={{ width: '90%', cursor: "pointer" }} onClick={this.onmenuClick}><h6 className="p-1">{node.name}</h6></div>
                        </div>
                        {this.state.childVisible ?
                            <div style={{ marginLeft: 15 }}>
                                {node.children.map(element => {
                                    return <MenuItems key={element.path} node={element} childVisible={false} changeFolder={this.props.changeFolder}></MenuItems>
                                })}
                            </div> : null
                        }
                    </div>
                }
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeFolder: (path) => { dispatch({ type: CHANGE_PATH, path }) }
    }
}
export default connect(null, mapDispatchToProps)(MenuItems)
