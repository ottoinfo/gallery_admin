import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"
import Animation from "../animate/Animation"
import styles from "./style.scss"

@observer
export default class UploadImage extends React.Component {

  @observable visible = true
  enterCounter = 0

  static contextTypes = {
    AccountStore: React.PropTypes.object.isRequired,
    ImageStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    children: React.PropTypes.node,
    multiple: React.PropTypes.bool,
    preview: React.PropTypes.bool,
    type: React.PropTypes.object,
  }

  static defaultProps = {
    multiple: true,
    preview: true,
    type: /image/,
    className: "file_upload",
  }

  constructor(props, context) {
    super(props, context)
    this.AccountStore = context.AccountStore
    this.ImageStore = context.ImageStore
    this.UIState = context.UIState
  }

  showUpload = (ev)=> {
    ev.preventDefault()
    this.visible = !this.visible
  }

  open() {
    this.fileInput.value = null
    this.fileInput.click()
  }

  onClick = (ev)=> {
    ev.preventDefault()
    this.open()
  }

  onDragStart = (ev)=> {
    console.log("onDragStart", ev)
  }

  onDragEnter = (ev)=> {
    console.log("onDragEnter")
    ev.preventDefault()
    ++this.enterCounter // Count the dropzone and any children that are entered.
    // This is tricky. During the drag even the dataTransfer.files is null
    // But Chrome implements some drag store, which is accesible via dataTransfer.items
    const dataTransferItems = ev.dataTransfer && ev.dataTransfer.items ? ev.dataTransfer.items : []
    // Now we need to convert the DataTransferList to Array
    const allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems))
    // observable change
  }

  onDragOver = (ev)=> {
    ev.preventDefault()
    ev.stopPropagation()
    return false
  }

  onDragLeave = (ev)=> {
    ev.preventDefault()
    if (--this.enterCounter > 0) return
    // observable change
  }

  onDrop = (ev)=> {
    ev.preventDefault()
    this.enterCounter = 0 // Reset the counter along with the drag on a drop.
    // observable change
    const droppedFiles = ev.dataTransfer ? ev.dataTransfer.files : ev.target.files
    const max = this.props.multiple ? droppedFiles.length : Math.min(droppedFiles.length, 1)
    const files = []
    console.log("dropped files", droppedFiles)
    Object.keys(droppedFiles).map(key => {
      const file = droppedFiles[key]
      if (!this.checkFileType(file)) return
      if (this.props.preview) {
        file.preview = window.URL.createObjectURL(file)
      }
      files.push(file)
    })
    this.ImageStore.uploadImages(files)
  }

  checkFileType(file) {
    return file.type.search(this.props.type) > -1
  }

  render() {
    return (
      <div id="drop" className={styles.upload} >
        <p className={styles.button} onClick={this.showUpload}>
          UPLOAD
          <i className={`fa ${this.visible ? "fa-arrow-down": "fa-arrow-up"}`} aria-hidden="true" />
        </p>
      
        <Animation
          atEnter={{ opacity: 0, translateY: 120 }}
          atLeave={{ opacity: 0, translateY: 120 }}
          atActive={{ opacity: 1, translateY: 0 }}
          mapStyles={styles => ({ opacity: `${styles.opacity}`, transform: `translateY(${styles.translateY}%)` })} >
        {this.visible && (
          <div className={styles.dropzone}
            onDragStart={this.onDragStart}
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop} 
            onClick={this.onClick} >
            <i className="fa fa-cloud-upload" aria-hidden="true" />
            <p>Drop Files or Click to Updoad</p>
            <input className={styles.input} type="file" name="files[]" accept multiple={this.props.multiple} ref={el => this.fileInput = el} onChange={this.onDrop} />
          </div>
        )}
        </Animation>
      </div>
    )
  }
}