import React from 'react';
import { array } from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { NodeContainer } from '../containers';

function NodeList(props) {
    return (
        <div className="node-list">
            <TransitionGroup>
                {
                    props.children.map(child => <CSSTransition
                        key={child.id}
                        classNames="fade"
                        timeout={{ enter: 400, exit: 400 }} ><NodeContainer key={child.id} {...child} indent={true} /></CSSTransition>)
                }
            </TransitionGroup>
        </div>
    );
}


NodeList.propTypes = {
    children: array.isRequired,
}

export default NodeList;