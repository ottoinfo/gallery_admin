import React from "react"
import { Motion, spring } from "react-motion" // noWobble gentle wobbly stiff
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

  handleClose = ()=> {
    console.log("handleClose", this)
    this.UIState.alert = {}
  }

  handleConfirm = ()=> {
    console.log("handleConfirm", this)
    this.UIState.alert.handleSubmit()
    this.handleClose()
  }

  render() {
    const { alert } = this.UIState

    const style = {
      default: {
        y: 0,
        opacity: 0,
      },
      enter: {
        y: spring(150),
        opacity: spring(1, { stiffness: 45, damping: 10 }),
      },
      leave: {
        y: spring(0),
        opacity: spring(0),
      },
    }

    if (!alert.message) return null

    return (
      <Motion defaultStyle={ style.default } key="test" style={ (alert.message ? style.enter : style.leave) }>
        { ({ opacity, y }) =>
          <div id="alert" style={ { opacity } }>
            <div id="alert-window" style={ { y } } >
              <div id="alert-message" style={ { y } } >
                <p>{alert.message}</p>
                <div className="btns">
                  <button type="button" onClick={this.handleClose}>Cancel</button>
                  <button type="submit" onClick={this.handleConfirm}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        }
      </Motion>
    )
  }
}