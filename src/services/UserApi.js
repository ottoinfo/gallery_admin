import api from "superagent"

export default class UserApi {
  url = "/api/users/"

  fetchUsers = ()=> {
    return api.get(this.url).accept("application/json")
  }

  saveUser = (user)=> {
    if (user.id) {
      return api.put(this.url + user.id).send(user).accept("application/json")
    }
    else {
      return api.post(this.url).send(user).accept("application/json")
    }
  }

  deleteUser = (user)=>{
    return api.delete(this.url + user.id).accept("application/json")
  }
}