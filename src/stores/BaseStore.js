import { observable, computed, action } from "mobx"
import Model from "../models/BaseModel"
import Helper from "../helpers/Sort"
import Sockets from "../helpers/Sockets"

export default class BaseStore {
  urlPath = "/admin/"
  
  type = "Item"
  
  api_methods = {
    fetch: "fetchItems",
    save: "saveItem",
    delete: "deleteItem",
  }
  
  flash_messages = {
    fetch: {
      error: ()=> {
        return `Error Fetching ${this.type}s`
      },
      success: ()=> {
        return `Successfully fetched ${this.type}s`
      },
    },
    save: {
      error: ()=> {
        return `Error Saving ${this.type}`
      },
      success: ()=> {
        return `Successfully Saved ${this.type}`
      },
    },
    delete: {
      error: ()=> {
        return `Error Deleting ${this.type}`
      },
      success: ()=> {
        return `Successfully Deleted ${this.type}`
      },
    },
  }
  
  callbacks = {
    fetch: {
      error: (err, data)=> { 
        return null
      },
      success: (res, data)=> { 
        return this.items = res.body.map(this.createModel)
      },
    },
    save: {
      error: (err, data)=> { 
        return null
      },
      success: (res, data)=> { 
        return this.updateItem(res.body)
      },
    },
    delete: {
      error: (err, data)=> { 
        return null
      },
      success: (res, data)=> { 
        return this.removeItem(data)
      },
    },
  }
  
  @observable sort = "updateAt|desc"
  @observable isLoaded = false
  @observable items = []
  @observable errors = {}
  @observable pendingRequest = 0

  constructor() {
    this.api = {}
  }

  setup(args) {
    Object.assign(this, args)
  }

  @computed get isLoading() {
    return this.pendingRequest > 0
  }

  createModel = (data={}) => {
    return new Model(data, this)
  }

  addItem(item) {
    this.items.push(this.createModel(item))
  }

  updateItem(json) {
    const item = this.findItem(json.id)
    if (!item) {
      this.addItem(json)
    }
    else {
      item.update(json)
    }
  }

  removeItem(item) {
    this.items.splice(this.items.findIndex((obj)=> obj.uuid == item.uuid), 1)
  }

  findItem(id) {
    return this.items.find((item)=> item.id == id)
  }

  @computed get getItems() {
    return this.sortItems
  }

  @computed get sortItems() {
    const array = String(this.sort).split(/\|/)
    return Helper.sortArray(this.items.toJS(), array[0], array[1] == "asc")
  }

  @action
  apiCall(params={ 
    after: {}, // Callbacks
    before: {}, // Callbacks
    handler: {}, // Callbacks
    data: {}, // Model || Data
    flash: {}, // Message object { error, success}
    method: "", // API Method
  }) {
    if (!params.method) {
      throw new Error("No Method defined for API call")
    }
    if (!this.api[params.method]) {
      throw new Error(`No Method in API called: ${params.method}`)
    }
    if (params.before) params.before()
    this.pendingRequest++
    this.api[params.method](params.data)
    .end(action(`${params.method}-callback`, (err, res) => {
      if (Object.keys(params.flash).length) {
        this.flashMessage(err, res, params.flash)
      }
      if (err) {
        this.handleErrors(err.response.body)
        if (params.handler.error) params.handler.error(err, params.data)
      }
      else {
        if (params.handler.success) params.handler.success(res, params.data)
      }
      this.pendingRequest--
      if (params.after) {
        params.after()
      }
    }))
  }

  flashMessage(err, res, obj) {
    let flash = {}
    if (err) {
      flash = { 
        type: "error",
        message: obj.error ? obj.error() : "Error",
      }
    }
    else {
      flash = { 
        type: "success",
        message: obj.success ? obj.success() : "Success",
      }
    }
    this.UIState.flash = flash
  }
  
  handleErrors = (resp)=> {
    const data = {}
    resp.errors.map((item)=>
      data[item.field] = item.message
    )
    this.errors = data
  }
  
  fetchItems() {
    this.apiCall({
      after: ()=> {
        this.isLoaded  = true
      },
      before: ()=> {
        this.isLoaded  = false
      },
      handler: this.callbacks.fetch,
      flash: this.flash_messages.fetch, 
      method: this.api_methods.fetch, 
    })
  }

  saveItem(item, cb) {
    this.apiCall({
      after: cb,
      data: item,
      handler: this.callbacks.save,
      flash: this.flash_messages.save, 
      method: this.api_methods.save, 
    })
  }

  deleteItem(item, cb) {
    this.apiCall({
      after: cb,
      data: item,
      handler: this.callbacks.delete,
      flash: this.flash_messages.delete, 
      method: this.api_methods.delete, 
    })
  }
}