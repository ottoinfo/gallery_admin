import React from "react"
import { Motion, spring, presets } from "react-motion" // noWobble gentle wobbly stiff
import { observer } from "mobx-react"

@observer
export default class Flash extends React.Component {

  static contextTypes = {
    UIState: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.UIState = context.UIState
  }

  setTimer() {
    this.stopTimer()
    this.timer = setTimeout(this.clearFlash, 5000)
  }

  stopTimer() {
    if (this.timer) clearTimeout(this.timer)
  }

  clearFlash = ()=> {
    this.UIState.flash.message = null
  }

  handleClick = ()=> {
    this.stopTimer()
    this.clearFlash()
  }

  render() {
    const { flash } = this.UIState
    console.log("flash data", flash)
    if (flash.message) this.setTimer()
    const style = {
      default: {
        height: 0,
        opacity: 0,
      },
      enter: {
        height: spring(30),
        opacity: spring(1, { stiffness: 45, damping: 10 }),
      },
      leave: {
        height: spring(0),
        opacity: spring(0),
      },
    }

    return (
      <Motion defaultStyle={ style.default } key="test" style={ (flash.message ? style.enter : style.leave) }>
        { ({ opacity, height }) =>
          <div id="flash-message" className={flash.type} style={ { opacity, height } } onClick={this.handleClick}>
            <p>{flash.message}</p>
          </div> 
        }
      </Motion>
    )
  }
}