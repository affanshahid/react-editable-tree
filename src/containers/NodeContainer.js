import React, { Component } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { string, array, bool, func } from 'prop-types';
import { Node, EditableNode, NodeList, PlaceholderNode } from '../components';
import { DropTarget, DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { moveNode, copyNode } from '../actions';
import './NodeContainer.css';

const indentSpacing = 20;

class NodeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            childrenVisible: props.children.length === 0,
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
        if (this.props.children.length === 0) return;
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
        const { id, name, type, valueType, value, children, indent, parentId, connectDragSource, connectDropTarget, isOver, isDragging } = this.props;

        const containerStyle = {
            marginLeft: indent ? indentSpacing : 0,
        };

        const hasChildrenClass = children.length === 0 ? '' : 'has-children ';

        return connectDropTarget(
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

                        : connectDragSource(<div>
                            <Node id={id}
                                faded={isDragging}
                                name={name}
                                type={type}
                                valueType={valueType}
                                value={value}
                                parentId={parentId}
                                onClick={this.handleClick}
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                                showControls={this.state.showControls}
                                onBeginEdit={this.handleBeginEdit} />
                        </div>)

                }
                <PlaceholderNode visible={isOver} />
                <SmoothCollapse expanded={this.state.childrenVisible}>
                    <NodeList parentId={id}>
                        {children}
                    </NodeList>
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
    connectDragSource: func.isRequired,
    connectDropTarget: func.isRequired,
    isOver: bool.isRequired,
    isDragging: bool.isRequired,
    indent: bool
}

NodeContainer.defaultProps = {
    indent: false
}

const nodeSource = {
    beginDrag: function ({ id, parentId, children }) {
        return { id, fromParent: parentId, children }
    }
}

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

NodeContainer = DragSource('NODE', nodeSource, collectSource)(NodeContainer);

function isDescendant(children, nodeId) {
    for (let child of children) {
        if (child.id === nodeId) return true;
        if (isDescendant(child.children, nodeId)) return true;
    }
    return false;
}

const NodeContainerTarget = {
    drop: function ({ handleMoveNode, handleCopyNode }, monitor) {
        if (monitor.didDrop()) return;
        const { id } = monitor.getItem();
        if (window.controlPressed) handleCopyNode(id);
        else handleMoveNode(id);
    },

    canDrop: function (props, monitor) {
        const dropItem = monitor.getItem();
        if (dropItem.id === props.id || props.id === dropItem.fromParent || isDescendant(dropItem.children, props.id)) return false;

        return monitor.isOver({ shallow: true });
    }
}

function collectTarget(connect, monitor) {
    return {
        isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
        connectDropTarget: connect.dropTarget(),
    }
}

NodeContainer = DropTarget(['NODE'], NodeContainerTarget, collectTarget)(NodeContainer);

function mapDispatchToProps(dispatch, props) {
    return {
        handleMoveNode: id => {
            dispatch(moveNode(id, props.id))
        },
        handleCopyNode: id => {
            dispatch(copyNode(id, props.id))
        }
    }
}

NodeContainer = connect(null, mapDispatchToProps)(NodeContainer);

export default NodeContainer;