import React from "react"
import Cookies from "js-cookie"

export default class NotFound extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  static propTypes = { 
    params: React.PropTypes.object,
  }

  render() {
    console.log(this.props.params.splat)
    if (this.props.params.splat.search(/logout/) > -1) {
      Cookies.remove("gallery.admin")
      window.location.replace("/api/account/logout")
    }

    return (
      <div id='not_found'>
        <h1>404...this page was not found!</h1>
      </div>
    )
  }

}