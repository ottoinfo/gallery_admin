import BaseStore from "./BaseStore"
import TagApi from "../services/TagApi"
import Model from "../models/Tag"

export default class TagStore extends BaseStore {
  urlPath = "/admin/tags/"
  
  type = "Tags"
  
  api_methods = {
    fetch: "fetchTags",
    save: "saveTag",
    delete: "deleteTag",
  }

  constructor() {
    super()
    this.api = new TagApi()
  }

  createModel = (data={}) => {
    return new Model(data, this)
  }
}

const singleton = new TagStore()
export default singleton