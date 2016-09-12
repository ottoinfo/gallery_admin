import BaseModel from "./BaseModel"
import { observable, computed } from "mobx"

export default class Image extends BaseModel {
  // Model Attributes
  @observable destination = ""
  @observable fileName = ""
  @observable name = ""
  @observable originalName = ""
  @observable slug = ""
  @observable tags = []

  @computed get urlPath() {
    return "/admin/images/"
  }

  @computed get thumb() {
    return this.paths.small
  }

  @computed get asJSON() {
    return {
      id: this.id,
      name: this.name,
      file: this.file,
      originalName: this.originalName,
      path: this.path,
      tags: this.tags,
    }
  }
}