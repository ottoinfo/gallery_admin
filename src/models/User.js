import BaseModel from "./BaseModel"
import { observable, computed } from "mobx"

export default class User extends BaseModel {
  // Model Attributes
  @observable userName = ""
  @observable firstName = ""
  @observable lastName = ""
  @observable email = ""
  @observable checkbox = false
  @observable password = ""
  @observable confirmation = ""

  @computed get urlPath() {
    return `${this.store.path}${this.id}`
  }

  @computed get userInfo() {
    return `${this.firstName} ${this.lastName} (${this.userName})`
  }

  @computed get asJSON() {
    const json = {
      id: this.id,
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    }
    // Append Password && Confirmation if they Exist - Save Form
    if (this.password) json["password"] = this.password
    if (this.confirmation) json["confirmation"] = this.confirmation

    return json
  }
}