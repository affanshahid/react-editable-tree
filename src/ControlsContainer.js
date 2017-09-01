import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { addNode, removeNode } from './actions';
import { MainControls, ConfirmControls } from './Controls';
import './ControlsContainer.css';

const confirmationModes = {
    remove: "REMOVE_MODE",
    edit: 'EDIT_MODE',
    none: 'NONE'
};

class ControlsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmationMode: confirmationModes.none
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleCancelRemove = this.handleCancelRemove.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleClickOutside(ev) {
        this.handleCancel(ev);
    }

    handleCancelEdit(ev) {
        this.setState({
            confirmationMode: confirmationModes.none
        });
        this.props.onCancelEdit();
        ev.stopPropagation();
    }

    handleEdit(ev) {
        this.setState({
            confirmationMode: confirmationModes.edit
        });
        this.props.onBeginEdit();
        ev.stopPropagation();
    }

    handleCancelRemove(ev) {
        this.setState({
            confirmationMode: confirmationModes.none
        });
        ev.stopPropagation();
    }

    handleRemove(ev) {
        this.setState({
            confirmationMode: confirmationModes.remove
        });
        ev.stopPropagation();
    }

    handleConfirm(ev) {
        switch (this.state.confirmationMode) {
            case confirmationModes.remove:
                this.props.handleConfirmRemove(ev);
                break;
            case confirmationModes.edit:
                this.props.handleConfirmEdit(ev);
                this.setState({
                    confirmationMode: confirmationModes.none
                });
                break;
            default:
                throw new Error("Unexpected state for ControlsContainer");
                
        }
    }
    
    handleCancel(ev) {
        switch (this.state.confirmationMode) {
            case confirmationModes.remove:
                this.handleCancelRemove(ev);
                break;
            case confirmationModes.edit:
                this.handleCancelEdit(ev);
                break;
            default:
                throw new Error("Unexpected state for ControlsContainer");
        }
    }

    render() {
        const { handleAdd, visible } = this.props;
        const mainControls = <MainControls
            visible={visible}
            onAdd={handleAdd}
            onRemove={this.handleRemove}
            onEdit={this.handleEdit} />

        const confirmRemoveControls = <ConfirmControls
            disableOnClickOutside={this.state.confirmationMode === confirmationModes.none}
            handleClickOutside={this.handleClickOutside}
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel} />

        return this.state.confirmationMode !== confirmationModes.none ? confirmRemoveControls : mainControls;
    }
}

ControlsContainer.propTypes = {
    handleAdd: func.isRequired,
    handleConfirmRemove: func.isRequired,
    handleConfirmEdit: func.isRequired,
    onCancelEdit: func,
    onBeginEdit: func
}

ControlsContainer.defaultProps = {
    onBeginEdit: () => {},
    onCancelEdit: () => {}
}

function mapDispatchToProps(dispatch, { visible, id, onCancelEdit, onBeginEdit }) {
    return {
        handleAdd: ev => {
            console.log('added to ' + id);
            ev.stopPropagation();
            dispatch(addNode("New Node Name", "Parameter", "string", "This is a value", id));
        },
        handleConfirmRemove: ev => {
            console.log('removed ' + id);
            ev.stopPropagation();
            dispatch(removeNode(id));
        },
        handleConfirmEdit: ev => {
            console.log('edited ' + id);
            ev.stopPropagation();
        },
        visible,
        onCancelEdit,
        onBeginEdit
    };
}

ControlsContainer = connect(null, mapDispatchToProps)(ControlsContainer);

export default ControlsContainer;