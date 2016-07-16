import React from "react"
import { Link } from "react-router"
import styles from "./style.scss"

export default class Footer extends React.Component {

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.logo}>MATTHEW OTTO</div>
        <div className={styles.spacer} />
        <Link to="">Information</Link>
        <Link to="settings">Settings</Link>
      </nav>
    )
  }

}