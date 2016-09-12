import React from "react"
import UploadImage from "../upload/Image"
import styles from "./style.scss"

export default class Footer extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
  }

  handleLink = (ev)=> {
    ev.preventDefault()
    const { target } = ev
    return this.router.push(target.href.replace(window.location.origin, ""))
  }

  render() {
    return (
      <footer className={styles.footer}> 
        <UploadImage />
        <a href="/admin/about" onClick={this.handleLink}>About</a>
        <a href="/admin/styleguide" onClick={this.handleLink}>Styleguide</a>
        <div className={styles.spacer}/>
        <a href="/admin/privacy" onClick={this.handleLink}>Privacy Policy</a>
        <a href="/admin/copyright" onClick={this.handleLink}>copyright 2016</a>
      </footer>
    )
  }

}