import React from "react"
import { observer } from "mobx-react"
import { TransitionMotion, spring } from "react-motion" // noWobble gentle wobbly stiff

@observer
export default class TransitionSpring extends React.Component {

  defaultValue = {
    opacity: { val: 0, config: [45, 10] },
    // OR
    // val: {
    //   opacity: 0,
    // },
    // config: [45, 10]
  }
  
  endValue = {
    opacity: { val: 1, config: [45, 10] },
  }

  willEnter = {
    opacity: { val: 1 },
  }

  willLeave = {
    opacity: { val: 0 },
  }

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    overrides: React.PropTypes.object,
  }

  static defaultProps = {
    className: "animation",
  }

  constructor(props, context) {
    super(props, context)
    Object.assign(this, props.overrides)
  }

  render() {
    return (
      <TransitionMotion
        willEnter={()=> ({ x: 0 })} // triggered by key3
        willLeave={()=> ({ x: spring(100) })} // triggered by key2
        defaultStyles={{
          key1: { x: 0 },
          key2: { x: 0 },
        }}
        styles={{
          key1: { x: spring(10) },
          key3: { x: spring(10) },
        }}>
        {values =>
          <div>
            {Object.keys(values).map((key) =>
              <div
                key={key}
                style={{ left: values[key].x }} />
            )}
          </div>
        }
      </TransitionMotion>
    )
  }
}