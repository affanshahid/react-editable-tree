import React, { Component } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { string, array, bool } from 'prop-types';
import Node from './Node';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import './NodeContainer.css';

const indentSpacing = 20;

class NodeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            childrenVisible: true,
            showControls: false
        }

        this.handleChildClick = this.handleChildClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleChildClick() {
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
                <Node id={id}
                    name={name}
                    type={type}
                    valueType={valueType}
                    value={value}
                    children={children}
                    onClick={this.handleChildClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    showControls={this.state.showControls} />

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