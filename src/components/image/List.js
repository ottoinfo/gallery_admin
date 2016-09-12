import React from "react"
import { observer } from "mobx-react"
import Animation from "../animate/Animation"
import Item from "./Item"
import styles from "./style.scss"

@observer 
export default class ImageList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    AccountStore: React.PropTypes.object.isRequired,
    ImageStore: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.AccountStore = context.AccountStore
    this.ImageStore = context.ImageStore
  }

  componentDidMount() {
    if (!this.ImageStore.isLoaded) this.ImageStore.fetchItems()
  }

  render() {
    if (!this.ImageStore.getItems.length) {
      return ( 
        <div>No Images Uploaded</div> 
      )
    }

    return (
      <Animation
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }} >
        <ul className={styles.list}>
        { this.ImageStore.getItems.map(image =>
          <Item key={image.id} image={image}/>
        ) }
        </ul>
      </Animation>
    )
  }
}