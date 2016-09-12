import React from "react"
import { observer } from "mobx-react"
import styles from "./style.scss"

@observer 
export default class ImageItem extends React.Component {

  static contextTypes = {
    ImageStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    image: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.ImageStore = context.ImageStore
    this.UIState = context.UIState
  }

  handleDelete = (ev)=> {
    ev.preventDefault()
    this.UIState.alert = { 
      message: "Are you sure you want to delete this Image?",
      handleSubmit: ()=> {
        console.log("submit", this.props.image)
        this.ImageStore.deleteImage(this.props.image.asJSON)
      },
    }
  }

  getDisplay() {
    // return this.layout ? styles.multi : styles.single
    return styles.multi
  }

  render() {
    const { image } = this.props

    return (
      <li className={this.getDisplay()}>
        <img src={image.thumb}/>
        <p>{image.name}</p>
      </li>
    )
  }
}