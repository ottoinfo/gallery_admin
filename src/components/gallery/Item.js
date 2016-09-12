import React from "react"
import { observer } from "mobx-react"
import styles from "./style.scss"

@observer 
export default class GalleryItem extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    GalleryStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    gallery: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.GalleryStore = context.GalleryStore
    this.UIState = context.UIState
    this.gallery = props.gallery
  }

  handleEdit = ()=> {
    console.log("edit", this)
    return this.router.push("/admin/galleries/" + this.gallery.id)
  }

  render() {
    return (
      <div className={styles.item} onClick={this.handleEdit}>
        <i className="fa fa-eye" aria-hidden="true"></i>
        <p>{this.gallery.name}</p>
        <i className={`fa fa-arrows ${styles.arrows}`} aria-hidden="true"></i>
      </div>
    )
  }
}