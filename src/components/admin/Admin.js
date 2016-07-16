import React from "react"
// import styles from "./style.scss"

export default class Admin extends React.Component {

  render() {
    return (
      <form id="login">
        <input id="email" name="email" type="text" placeHolder="username"/>
        <input id="password" name="password" type="password" placeHolder="password"/>
      </form>
    )
  }

}