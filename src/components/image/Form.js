import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

@observer
export default class ImageForm extends React.Component {

  @observable image = null

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    AccountStore: React.PropTypes.object.isRequired,
    ImageStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.AccountStore = context.AccountStore
    this.ImageStore = context.ImageStore
    this.UIState = context.UIState
  }

  componentDidMount() {
    if (!this.ImageStore.isLoaded)
      this.ImageStore.fetchImages()
    else
      this.loadImage()
  }

  componentWillUpdate() {
    this.loadImage()
  }

  loadImage = ()=> {
    if (this.ImageStore.isLoaded && !this.image) {
      this.image = this.ImageStore.findImage(parseInt(this.props.params.id)) || this.ImageStore.createModel()
    }
  }

  listIndex = ()=> {
    this.router.push(this.ImageStore.path)
  }

  handleInputChange = (ev)=> {
    const { target } = ev
    this.image[target.name] = target.value
    console.log("input", this.image)
  }

  handleCancel = (ev)=> {
    ev.preventDefault()
    this.ImageStore.errors = {}
    this.listIndex()
  }

  handleSubmit = (ev)=> {
    ev.preventDefault()
    this.ImageStore.saveImage(this.image.asJSON, (err)=>{
      if (err) return
      this.listIndex()
    })
  }

  handleDelete = (ev)=> {
    ev.preventDefault()
    this.UIState.alert = { 
      message: "Are you sure you want to delete this Image?",
      handleSubmit: ()=> {
        this.ImageStore.deleteImage(this.image.asJSON, this.listIndex)
      },
    }
  }

  render() {
    const { errors } = this.ImageStore
    const image = this.image || {}
    console.log("render image", image)

    return (
      <form className={this.ImageStore.isLoading ? "loading" : ""} onSubmit={this.handleSubmit}>
        <legend>
          <p>{image.id ? "Edit" : "Create"} Image</p>
          <a onClick={this.handleCancel} className="btn dark-blue cancel">Cancel</a>
        </legend>
        <p className="required">Required fields are followed by <strong>*</strong></p>

       <fieldset>
          <div className="group">
            <label htmlFor="name">Upload Image <strong>*</strong></label>
            <input type="file" accept="image/*" name="file" value={image.file} onChange={this.handleFileUpload}/>
            <p className="error">{ errors.file }</p>
          </div>

          <div className="group">
            <label htmlFor="name">Image Name <strong>*</strong></label>
            <input type="text" name="name" value={image.name} onChange={this.handleInputChange} placeholder="Ex: Favorites"/>
            <p className="error">{ errors.name }</p>
          </div>

          <div className="btns">
            <button id="save" className="btn blue" onClick={this.handleSubmit}>Save</button>
          {image.id &&
            <button id="delete" className="btn red" onClick={this.handleDelete}>Delete</button>
          }
          </div>
        </fieldset>
      </form>
    )
  }
}