import React from "react"
import { observer } from "mobx-react"

@observer
export default class LoginLayout extends React.Component {

  static propTypes = { 
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div id="login">
        { this.props.children }
      </div>
    )
  }

}