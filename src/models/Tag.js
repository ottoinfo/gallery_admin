import BaseModel from "./BaseModel"
import { observable, computed } from "mobx"

export default class Tag extends BaseModel {
  // Model Attributes
  @observable name = ""

  @computed get asJSON() {
    const json = {
      id: this.id,
      name: this.name,
    }
    return json
  }
}