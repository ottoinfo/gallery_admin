import React, { Children } from "react"
import { observer } from "mobx-react"
import { spring } from "react-motion"
import Transition from "react-motion-ui-pack"

@observer 
export default class Collapse extends React.Component {
  
  static propTypes = {
    children: React.PropTypes.node,
    isOpen: React.PropTypes.bool,
  }

  render() {
    const { isOpen, children } = this.props
    return (
      <Transition
        component={false}
        enter={{ height: spring("auto", { stiffness: 45, damping: 10 }), opacity: 1 }}
        leave={{ height: 0, opacity: 0 }}
      >
        {isOpen && Children.only(children)}
      </Transition>
    )
  }
}