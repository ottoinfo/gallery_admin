import React from "react"
import Header from "./Header"
import Footer from "./Footer"

export default class Layout extends React.Component {
  
  propTypes() {
    return { children: React.PropTypes.node }
  }

  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    )
  }

}