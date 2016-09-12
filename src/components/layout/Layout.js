import React from "react"
import { observer } from "mobx-react"
import Header from "./Header"
import Footer from "./Footer"
import SubNav from "../subnav/SubNav"
import Flash from "../flash/Flash"
import Alert from "../alert/Alert"

@observer
export default class Layout extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    options: React.PropTypes.string,
  }

  render() {
    return (
      <div id="layout">
        <Header />
        <div id="content">
          <SubNav options={this.props.children.props.options}/>
          { this.props.children }
        </div>
        <Footer />
        <Flash />
        <Alert />
      </div>
    )
  }

}