import api from "superagent"

export default class AccountApi {
  path = "/api/account/"

  login(username, password) {
    return api.post(this.path + "login", {
      username, 
      password,
    })
  }

  logout() {
    return api.get(this.path + "logout")
  }
}