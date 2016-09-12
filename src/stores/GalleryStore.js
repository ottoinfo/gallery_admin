import BaseStore from "./BaseStore"
import GalleryApi from "../services/GalleryApi"
import Model from "../models/Gallery"

export default class ImageStore extends BaseStore {
  urlPath = "/admin/galleries/"
  type = "Gallery"
  api_methods = {
    fetch: "fetchGalleries",
    save: "saveGallery",
    delete: "deleteGallery",
  }

  constructor() {
    super()
    this.api = new GalleryApi()
  }

  createModel = (data={}) => {
    return new Model(data, this)
  }
}

const singleton = new ImageStore()
export default singleton