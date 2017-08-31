import React from 'react';
import { bool, func } from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import add from './add.svg';
import edit from './edit.svg';
import remove from './remove.svg';
import confirm from './confirm.svg';
import cancel from './cancel.svg';
import trash from './trash.svg';
import './Controls.css';

function MainControls({ visible, onAdd, onRemove, onEdit }) {
    const visibilityStyle = {
        display: visible ? '' : 'none'
    }
    return (
        <div className="controls" style={visibilityStyle} >
            <a onClick={onAdd}><img className="control-add" width="12" src={add} alt="add-button" /></a>
            <a onClick={onRemove}><img className="control-remove" width="12" src={remove} alt="remove-button" /></a>
            <a onClick={onEdit}><img className="control-edit" width="12" src={edit} alt="edit-button" /></a>
        </div>
    );
}

MainControls.propTypes = {
    visible: bool.isRequired,
    onAdd: func.isRequired,
    onRemove: func.isRequired,
    onEdit: func.isRequired
};

function ConfirmControls({ onConfirm, onCancel }) {
    return (
        <div className="controls">
            <span ><img src={trash} width="16" alt="delete" /></span>
            <a onClick={onConfirm} ><img src={confirm} width="12" alt="confirm" /> </a>
            <a onClick={onCancel} ><img src={cancel} width="12" alt="cancel" /> </a>
        </div>
    );
}

//eslint-disable-next-line
ConfirmControls = onClickOutside(ConfirmControls);

ConfirmControls.propTypes = {
    onConfirm: func.isRequired,
    onCancel: func.isRequired
}

export {
    MainControls,
    ConfirmControls
};

