import BaseStore from "./BaseStore"
import { observable, computed, action } from "mobx"
import ImageApi from "../services/ImageApi"
import UploadImage from "../services/UploadImage"
import Model from "../models/Image"

export default class ImageStore extends BaseStore {
  urlPath = "/admin/images/"
  type = "Image"
  api_methods = {
    fetch: "fetchImages",
    save: "saveImage",
    delete: "deleteImage",
    upload: "uploadImages",
  }

  constructor() {
    super()
    this.api = new ImageApi()

    Object.assign(this.flash_messages, {
      upload: {
        error: ()=> {
          return `Error Uploading ${this.type}s`
        },
        success: ()=> {
          return `Successfully uploaded ${this.type}s`
        },
      },
    })

    Object.assign(this.callbacks, {
      upload: {
        error: (err, data)=> {
          return null
        },
        success: (res, data)=> {
          console.log("success", res, data)
          // this.items = res.body.map(this.createModel)
        },
      },
    })
  }

  createModel = (data={}) => {
    return new Model(data, this)
  }

  uploadImages(files) {
    console.log("store", files)
    this.apiCall({
      data: files,
      handler: this.callbacks.upload,
      flash: this.flash_messages.upload, 
      method: this.api_methods.upload, 
    })
  }
}

const singleton = new ImageStore()
export default singleton