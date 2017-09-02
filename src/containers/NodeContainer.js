import React, { Component } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { string, array, bool } from 'prop-types';
import { Node, EditableNode } from '../components';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import './NodeContainer.css';

const indentSpacing = 20;

class NodeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            childrenVisible: false,
            showControls: false,
            editMode: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleBeginEdit = this.handleBeginEdit.bind(this);
        this.handleEndEdit = this.handleEndEdit.bind(this);
    }

    handleBeginEdit() {
        this.setState({
            editMode: true
        });
    }

    handleEndEdit() {
        this.setState({
            editMode: false
        });
    }

    handleClick() {
        this.setState({
            childrenVisible: !this.state.childrenVisible
        });
    }

    handleMouseEnter() {
        this.setState({
            showControls: true
        });
    }

    handleMouseLeave() {
        this.setState({
            showControls: false
        });
    }

    render() {
        const { id, name, type, valueType, value, children, indent } = this.props;

        const containerStyle = {
            marginLeft: indent ? indentSpacing : 0,
        };

        const hasChildrenClass = children.length === 0 ? '' : 'has-children ';

        return (
            <div className={"node-container " + hasChildrenClass} key={id} style={containerStyle}>
                {
                    this.state.editMode ?
                        <EditableNode
                            id={id}
                            name={name}
                            type={type}
                            valueType={valueType}
                            value={value}
                            onEndEdit={this.handleEndEdit} />

                        : <Node id={id}
                            name={name}
                            type={type}
                            valueType={valueType}
                            value={value}
                            onClick={this.handleClick}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            showControls={this.state.showControls}
                            onBeginEdit={this.handleBeginEdit} />

                }
                <SmoothCollapse expanded={this.state.childrenVisible}>
                    <TransitionGroup>
                        {
                            children.map(child => <CSSTransition
                                key={child.id}
                                classNames="fade"
                                timeout={{ enter: 400, exit: 400 }} ><NodeContainer key={child.id} {...child} indent={true} /></CSSTransition>)
                        }
                    </TransitionGroup>
                </SmoothCollapse>
            </div>
        );
    }
}

NodeContainer.propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    type: string.isRequired,
    valueType: string.isRequired,
    value: string.isRequired,
    children: array.isRequired,
    indent: bool
}

NodeContainer.defaultProps = {
    indent: false
}

export default NodeContainer;