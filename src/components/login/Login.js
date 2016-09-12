import React from "react"
import { observer } from "mobx-react"
import styles from "./style.scss"

@observer
export default class Login extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    AccountStore: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.AccountStore = context.AccountStore
  }

  componentWillUpdate() {
    const { token } = this.AccountStore
    if (token) {
      console.log("TOKEN", token)
      this.context.router.push("/admin")
    }
  }

  handleInputChange = (ev)=> {
    const { target } = ev
    const account = this.AccountStore
    account[target.name] = target.value
  }

  handleLogin = (ev)=> {
    ev.preventDefault()
    this.AccountStore.login()
  }

  render() {
    const account = this.AccountStore

    return (
      <div className={styles.layout}>
        <form className={styles.form} autoComplete="nope">
          <legend className={styles.legend}>
            <p>Admin Login</p>
          </legend>

          <fieldset>
            <div className="group">
              <input type="text" id="username" name="username" value={account.username} onChange={this.handleInputChange} placeholder="username" className={styles.input}/>
              <i className="fa fa-user" aria-hidden="true" />
            </div>

            <div className="group">
              <input type="password" id="password" name="password" value={account.password} onChange={this.handleInputChange} placeholder="password" className={styles.input}/>
              <i className="fa fa-lock" aria-hidden="true" />
            </div>

            <p className={styles.message}>{account.message}</p>

            <div className="btns">
              <button type="submit" onClick={this.handleLogin} className={styles.btn}>Login</button>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }

}