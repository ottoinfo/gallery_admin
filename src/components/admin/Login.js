import React from "react"
// import styles from "./style.scss"

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      user: "",
      password: "",
    }
  }

  login(e) {
    e.preventDefault()
    // Here, we call an external AuthService. We’ll create it in the next step
    // Auth.login(this.state.user, this.state.password)
    // .catch(function(err) {
    //   console.log("Error logging in", err)
    // })
  }

  render() {
    return (
      <form id="login">
        <input id="email" name="email" type="text" placeholder="username"/>
        <input id="password" name="password" type="password" placeholder="password"/>
        <button type="submit" onClick={ this.login.bind(this) }>Submit</button>
      </form>
    )
  }

}