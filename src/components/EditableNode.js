import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { ControlsContainer,  confirmationModes } from '../containers';
import './EditableNode.css';

class EditableNode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            type: this.props.type,
            value: this.props.value,
            valueType: this.props.valueType
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueTypeChange = this.handleValueTypeChange.bind(this);
    }

    handleNameChange(ev) {
        this.setState({
            name: ev.target.value
        });

        ev.stopPropagation();
    }

    handleTypeChange(ev) {
        this.setState({
            type: ev.target.value
        });

        ev.stopPropagation();
    }

    handleValueChange(ev) {
        this.setState({
            value: ev.target.value
        });

        ev.stopPropagation();
    }

    handleValueTypeChange(ev) {
        this.setState({
            valueType: ev.target.value
        });

        ev.stopPropagation();
    }

    render() {
        const { onEndEdit, id } = this.props;
        return (
            <div className="editable-tree-node">
                <textarea onChange={this.handleNameChange} className="name" placeholder="Name" value={this.state.name} />
                <textarea onChange={this.handleTypeChange} className="type" placeholder="Type" value={this.state.type} />
                <select className="valuetype" value={this.state.valueType} onChange={this.handleValueTypeChange}>
                    <option value="0" hidden>Value Type</option>
                    <option>string</option>
                    <option>integer</option>
                    <option>double</option>
                </select>
                <textarea onChange={this.handleValueChange} className="value" placeholder="Value" value={this.state.value} />
                <ControlsContainer 
                    disableOnClickOutside={true}
                    onEndEdit={onEndEdit} visible={true} 
                    id={id} 
                    defaultConfirmationMode={confirmationModes.edit} 
                    {...this.state} />
            </div>
        );
    }
}

EditableNode.propTypes = {
    onEndEdit: func.isRequired,
    id: string,
    name: string,
    type: string,
    typeValue: string
};

EditableNode.defaultProps = {
    id: '',
    name: '',
    type: '',
    typeValue: '0'
}

export default EditableNode;