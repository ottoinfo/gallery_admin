import BaseModel from "./BaseModel"
import { observable, computed } from "mobx"

export default class Gallery extends BaseModel {
  // Model Attributes
  @observable description = ""
  @observable name = ""
  @observable order = ""
  @observable slug = ""
  @observable visible = true

  @computed get urlPath() {
    return "/admin/galleries/"
  }

  @computed get asJSON() {
    return {
      id: this.id,
      description: this.description,
      name: this.name,
      order: this.order,
      slug: this.slug,
      visible: this.visible,
    }
  }
}