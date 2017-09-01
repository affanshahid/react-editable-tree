import React from 'react';
import { func } from 'prop-types';
import './EditableNode.css';

function EditableNode() {
    return (
        <div className="editable-tree-node">
            <textarea className="name" placeholder="Name"></textarea>
            <textarea className="type" placeholder="Type"></textarea>
            <textarea className="value"placeholder="Value"></textarea>
            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>
    );
}

export default EditableNode;