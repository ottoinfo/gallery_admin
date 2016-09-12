import React from "react"
import { observer } from "mobx-react"
import styles from "./style.scss"

@observer
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
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.title}>Admin</div>
          <div className={styles.spacer} />
          <a className={styles.logout} onClick={this.handleLink} href="/admin/logout"><i className="fa fa-sign-out" aria-hidden="true" />Logout</a>
        </nav>
      </header>
    )
  }

}