import React from 'react';
import { string, array, func, bool } from 'prop-types';
import ControlsContainer from './ControlsContainer'
import './Node.css';

function Node({ id, name, type, valueType, value, children, onClick, onMouseEnter, onMouseLeave , showControls }) {
    const noValueClass = value !== '' ? 'value' : 'novalue';
    return (
        <div className={`tree-node ${type.toLowerCase()}`} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <span className="name">{name}</span>
            <span className={'type ' + noValueClass + '-type'}>{type}</span>            
            <span className={noValueClass}>
                {value}
            </span>
            <ControlsContainer visible={showControls} id={id} />
        </div>
    );
}

Node.propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    type: string.isRequired,
    valueType: string.isRequired,
    value: string.isRequired,
    children: array.isRequired,
    onClick: func.isRequired,
    onMouseEnter: func.isRequired,
    onMouseLeave: func.isRequired,
    showControls: bool.isRequired
}

export default Node;