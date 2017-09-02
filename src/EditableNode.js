import React, { Component } from 'react';
import { func } from 'prop-types';
import './EditableNode.css';

class EditableNode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            value: '',
            valueType: '0'
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
        return (
            <div className="editable-tree-node">
                <textarea onChange={this.handleNameChange} className="name" placeholder="Name" value={this.state.name} />
                <select className="valuetype" value={this.state.valueType} onChange={this.handleValueTypeChange}>
                    <option value="0" hidden>Value Type</option>
                    <option>string</option>
                    <option>integer</option>
                    <option>double</option>
                </select>
                <textarea onChange={this.handleTypeChange} className="type" placeholder="Type" value={this.state.type}/>
                <textarea onChange={this.handleValueChange} className="value" placeholder="Value" value={this.state.value}/>
            </div>
        );
    }
}

export default EditableNode;