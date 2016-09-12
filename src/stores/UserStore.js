import BaseStore from "./BaseStore"
import UserApi from "../services/UserApi"
import Model from "../models/User"

class UserStore extends BaseStore {
  urlPath = "/admin/users/"
  type = "User"
  api_methods = {
    fetch: "fetchUsers",
    save: "saveUser",
    delete: "deleteUser",
  }

  constructor() {
    super()
    this.api = new UserApi
  }

  createModel = (data={}) => {
    return new Model(data, this)
  }
}

const singleton = new UserStore()
export default singleton