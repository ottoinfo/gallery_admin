import React from "react"
import { observer } from "mobx-react"
import { Link } from "react-router"

@observer
export default class Button extends React.Component {
  static propTypes = { 
    children: React.PropTypes.string,
    className: React.PropTypes.string,
    to: React.PropTypes.string,
  }

  static defaultProps = { className: "btn" }

  render() {
    const { className, to, children } = this.props
    return (  
      <Link className={className} to={to}>{children}</Link>
    )
  }
}