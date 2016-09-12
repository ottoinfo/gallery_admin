import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"
import styles from "./style.scss"

@observer
export default class GalleryForm extends React.Component {

  @observable gallery = {}

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    AccountStore: React.PropTypes.object.isRequired,
    GalleryStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }
  
  static propTypes = {
    galleryID: React.PropTypes.number,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.AccountStore = context.AccountStore
    this.GalleryStore = context.GalleryStore
    this.UIState = context.UIState
    this.galleryID = props.galleryID || "new"
  }

  componentDidMount() {
    this.loadGallery()
  }

  componentWillUpdate() {
    this.loadGallery()
  }

  componentWillReceiveProps(nextProps) {
    this.galleryID = nextProps.galleryID
    this.gallery = {}
    console.log("willReceive", nextProps)
  }

  loadGallery = ()=> {
    if (this.GalleryStore.isLoaded && !this.gallery.uuid) {
      this.gallery = this.GalleryStore.findItem(this.galleryID) || this.GalleryStore.createModel()
    }
  }

  handleInputChange = (ev)=> {
    const { target } = ev
    this.gallery[target.name] = target.value
  }

  handleSubmit = (ev)=> {
    ev.preventDefault()
    this.GalleryStore.saveItem(this.gallery.asJSON, (err)=>{
      if (err) return
    })
  }

  handleDelete = (ev)=> {
    ev.preventDefault()
    this.UIState.alert = { 
      message: "Are you sure you want to delete this Gallery?",
      handleSubmit: ()=> {
        this.GalleryStore.deleteItem(this.gallery.asJSON)
      },
    }
  }

  render() {
    const { errors } = this.GalleryStore
    const gallery = this.gallery || {}

    return (
      <form className={this.GalleryStore.isLoading ? "loading" : ""} onSubmit={this.handleSubmit}>
        <legend>
          <p>{gallery.id ? "Edit" : "Create"} Gallery</p>
        </legend>
        <p className="required">Required fields are followed by <strong>*</strong></p>

       <fieldset>
          <div className="group">
            <label htmlFor="name">Set Default Image</label>
            <p className="error">{ errors.file }</p>
          </div>

          <div className="group">
            <label htmlFor="name">Name <strong>*</strong></label>
            <input type="text" name="name" value={gallery.name} onChange={this.handleInputChange} placeholder="Ex: Favorites"/>
            <p className="error">{ errors.name }</p>
          </div>

          <div className="group">
            <label htmlFor="description">Description <strong>*</strong></label>
            <textarea name="description" value={gallery.description} onChange={this.handleInputChange} placeholder="description..."/>
            <p className="error">{ errors.description }</p>
          </div>

          <div className="group">
            <input type="checkbox" id="visible" checked={gallery.visible} onChange={(ev)=> Boolean(gallery.visible = ev.target.checked)}/>
            <label htmlFor="visible">Visible</label>
          </div>

          <div className="btns">
            <a onClick={this.handleCancel} className="btn orange">Cancel</a>
            <a onClick={this.handleSubmit} className="btn blue">Save</a>
          </div>
        </fieldset>
      </form>
    )
  }
}