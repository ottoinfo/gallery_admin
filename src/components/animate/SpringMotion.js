import React, { PropTypes, cloneElement, createElement } from 'react'
import { observer } from "mobx-react"
import { SpringMotion } from "react-motion" // noWobble gentle wobbly stiff

@observer
export default class TransitionSpringMotion extends React.Component {

  defaultValue = {
    opacity: [ val: 0, config: [45, 10] ],
    // OR
    // val: {
    //   opacity: 0,
    // },
    // config: [45, 10]
  }
  
  endValue = {
    opacity: [ val: 1, config: [45, 10] ],
  }

  willEnter = {
    opacity: [ val: 1 ],
  }

  willLeave = {
    opacity: [ val: 0 ],
  }

  static propTypes = {
    children: React.PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    mapStyles: PropTypes.func,
    overrides: React.PropTypes.object,
    runOnMount: PropTypes.bool,
    style: PropTypes.object
  }

  static defaultProps = {
    component: 'div',
    runOnMount: true,
    mapStyles: val => val,
  }

  constructor(props, context) {
    super(props, context)
    Object.assign(this, props.overrides)
  }

  getDefaultStyles() {
    return [{
      key: this.props.key,
      data: this.props.children,
      style: this.props.atEnter
    }]
  }

  getStyles() {
    if (!this.props.children) {
      return []
    }
    
    return [{
      key: this.props.key,
      data: this.props.children,
      style: ensureSpring(this.props.atActive)
    }];
  },

  renderChild(config) {
    const props = {
      style: this.props.mapStyles(config.style),
      key: config.key
    }
    return this.props.component ? createElement(this.props.component, props, config.data) : cloneElement(config.data, props);
  }

  renderChildren(interpolatedStyles) {
    return (
      <div className={this.props.className} style={this.props.style}>
        {interpolatedStyles.map(this.renderChild)}
      </div>
    );
  },

  render() {
    <SpringMotion defaultValue={this.defaultValue} endValue={this.endValue} willEnter={this.willEnter} willLeave={this.willLeave}>
      {val => {
        {this.renderChildren}
      } }
    </SpringMotion>
  }
}