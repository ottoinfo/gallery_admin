import React from "react"
import { observer } from "mobx-react"
import { Motion, spring } from "react-motion" // noWobble gentle wobbly stiff

@observer
export default class Transion extends React.Component {

  defaultStyle = {
    y: 0,
    opacity: 0,
  }

  enterStyle = {
    y: spring(150),
    opacity: spring(1, { 
      stiffness: 45, 
      damping: 10,
    }),
  }

  leaveStyle = {
    y: spring(0),
    opacity: spring(0),
  }

  static propTypes = { 
    animation: React.PropTypes.string,
    children: React.PropTypes.node,
    overrides: React.PropTypes.object, 
  }

  constructor(props, context) {
    super(props, context)
    this.animation = this.props.animation || "enter"
    Object.assign(this, props.overrides)
  }

  render() {
    <Motion defaultStyle={this.defaultStyle()} key="test" style={ ( this.animation == "enter" ? this.enterStyle : this.leaveStyle) }>
      { ({ opacity, y }) =>
        {...this.props.children}
      }
    </Motion>
  }
}