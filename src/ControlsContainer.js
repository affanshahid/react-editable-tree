import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNode, removeNode } from './actions';
import { MainControls, ConfirmControls } from './Controls';
import './ControlsContainer.css';

class ControlsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            removeConfirmation: false
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleCancel(ev) {
        this.setState({
            removeConfirmation: false
        });
        ev.stopPropagation();
    }

    handleRemove(ev) {
        this.setState({
            removeConfirmation: true
        });
        ev.stopPropagation();

    }

    render() {
        const { handleAdd, handleConfirmRemove, handleEdit, visible } = this.props;
        const mainControls = <MainControls
            visible={visible}
            onAdd={handleAdd}
            onRemove={this.handleRemove}
            onEdit={handleEdit} />

        const confirmRemoveControls = <ConfirmControls
            ref={controls => {this.controls = controls; console.log(this.controls)}}
            onConfirm={handleConfirmRemove}
            onCancel={this.handleCancel} />

        return this.state.removeConfirmation ? confirmRemoveControls : mainControls;
    }
}

function handleAdd(ev, dispatch, id) {
    console.log('added to ' + id);
    ev.stopPropagation();
    dispatch(addNode("New Node Name", "Parameter", "string", "This is a value", id));
}

function handleConfirmRemove(ev, dispatch, id) {

    console.log('removed ' + id);
    ev.stopPropagation();
    dispatch(removeNode(id));
}


function handleEdit(ev, dispatch, id) {

    console.log('edited ' + id);
    ev.stopPropagation();
}

function mapDispatchToProps(dispatch, { visible, id }) {
    return {
        handleAdd: ev => handleAdd(ev, dispatch, id),
        handleConfirmRemove: ev => handleConfirmRemove(ev, dispatch, id),
        handleEdit: ev => handleEdit(ev, dispatch, id),
        visible
    };
}

ControlsContainer = connect(null, mapDispatchToProps)(ControlsContainer);

export default ControlsContainer;