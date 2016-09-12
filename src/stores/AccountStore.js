import { observable, computed, action } from "mobx"
import AccountApi from "../services/AccountApi"
import Cookies from "js-cookie"

export default class AccountStore {
  @observable username = ""
  @observable password = ""
  @observable token = null
  @observable message = ""
  @observable pendingRequest = 0

  // If I want to do FE Validation of session
  constructor() {
    this.api = new AccountApi()
    const cookie = Cookies.get("gallery.admin")
    this.token = cookie
  }

  setup(args) {
    Object.assign(this, args)
  }

  @computed get isLoading() {
    return this.pendingRequest > 0
  }

  @computed get isLoggedIn() {
    return !!this.token
  }

  @action
  login() {
    this.pendingRequest++
    const { username, password } = this
    this.api.login(username, password)
    .end(action("login-callback", (err, res) => {
      console.log("bbbbb", err, res)
      if (err) {
        this.message = res.body.message
      }
      else {
        this.token = res.body.user
        this.message = null
      }
      this.pendingRequest--
    }))
  }

  @action("logout")
  logout() {
    this.api.logout()
  }
}

const singleton = new AccountStore()
export default singleton