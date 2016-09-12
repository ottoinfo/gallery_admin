import React, { cloneElement, createElement } from "react"
import { observer } from "mobx-react"
import { TransitionMotion } from "react-motion" // noWobble gentle wobbly stiff
import ensureSpring from "./ensureSpring"

@observer
export default class Animation extends React.Component {

  static propTypes = {
    atActive: React.PropTypes.object.isRequired,
    atEnter: React.PropTypes.object.isRequired,
    atLeave: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    component: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
    key: React.PropTypes.string.isRequired,
    mapStyles: React.PropTypes.func,
    measure: React.PropTypes.bool,
    runOnMount: React.PropTypes.bool,
    wrap: React.PropTypes.bool,
  }

  static defaultProps = {
    atActive: { opacity: 1 },
    atEnter: { opacity: 0 },
    atLeave: { opacity: 0 },
    className: "animation",
    component: "nav",
    key: "animate",
    mapStyles: val => val,
    measure: true,
    runOnMount: true,
  }

  getDefaultStyles() {
    if (!this.props.runOnMount) {
      return null
    }

    if (!this.props.children) {
      return []
    }

    return [{
      key: this.props.key,
      data: this.props.children,
      style: this.props.atEnter,
    }]
  }

  // there"s only ever one route mounted at a time,
  // so just return the current match
  getStyles() {
    if (!this.props.children) {
      return []
    }

    return [{
      key: this.props.key,
      data: this.props.children,
      style: ensureSpring(this.props.atActive),
    }]
  }

  willEnter = ()=> {
    return this.props.atEnter
  }

  willLeave = ()=> {
    return ensureSpring(this.props.atLeave)
  }

  renderChild = (config)=> {
    const props = {
      style: this.props.mapStyles(config.style),
      key: config.key,
    }
    return this.props.component
      ? createElement(this.props.component, props, config.data)
      : cloneElement(config.data, props)
  }

  renderChildren = (interpolatedStyles)=> {
    return (
      <div className={this.props.className}>
        {interpolatedStyles.map(this.renderChild)}
      </div>
    )
  }

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {this.renderChildren}
      </TransitionMotion>
    )
  }

}