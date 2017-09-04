import React from 'react';
import { string, func, bool } from 'prop-types';
import { ControlsContainer } from '../containers';
import './Node.css';

function Node({
    id,
    name,
    type,
    valueType,
    value,
    onClick,
    onMouseEnter,
    onMouseLeave,
    showControls,
    onBeginEdit,
    faded
}) {
    const noValueClass = value !== '' ? 'value' : 'novalue';
    return (
        <div className={`tree-node ${type.toLowerCase()}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{opacity: faded? 0.5: 1}}>
            
            <span className="name">{name === '' ? 'Node Name' : name}</span>
            <span className={'type ' + noValueClass + '-type'}>{type === '' ? 'Node Type' : type}</span>
            <span className={noValueClass}>
                {value}
            </span>
            <ControlsContainer onBeginEdit={onBeginEdit} visible={showControls} id={id} />
        </div>
    );
}

Node.propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    type: string.isRequired,
    valueType: string.isRequired,
    value: string.isRequired,
    onClick: func.isRequired,
    onMouseEnter: func.isRequired,
    onMouseLeave: func.isRequired,
    showControls: bool.isRequired,
    faded: bool.isRequired,
    onBeginEdit: func
};

export default Node;