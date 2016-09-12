import { observable, computed, toJS } from "mobx"
import uuid from "uuid"

export default class BaseModel {
  // Model Attributes
  uuid = uuid.v4()
  id = ""
  @observable show = true // Fuse Search
  
  // Reference
  store = null

  constructor(data={}, store) {
    Object.assign(this, data)
    this.store = store
  }

  @computed get asJSON() {
    return {
      id: this.id,
    }
  }

  @computed get urlPath() {
    return "/admin/"
  }

  @computed get url() {
    return `${this.urlPath}${this.id || "new"}`
  }

  update(data) {
    Object.assign(this, data)
  }

  save() {
    this.store.api.save(this.asJson)
  }

  delete() {
    this.store.api.delete(this.id)
  }

  reset() {
    Object.assign(this, toJS(new BaseModel()))
  }
}