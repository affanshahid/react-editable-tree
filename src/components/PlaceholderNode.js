import React from 'react';
import './PlaceholderNode.css';

function PlaceholderNode({ visible }) {
    const visibilityStyle = {
        display: visible ? 'block' : 'none'
    }
    return (
        <div style={visibilityStyle} className="placeholder-node" />
    );
}

export default PlaceholderNode;