import React from "react"
import { observer } from "mobx-react"
import GalleryList from "./List"
import GalleryForm from "./Form"
import styles from "./style.scss"

@observer
export default class GalleryLayout extends React.Component {

  static propTypes = { 
    params: React.PropTypes.object,
    options: React.PropTypes.string,
  }

  static defaultProps = {
    options: "galleries",
  }

  render() {
    return (
      <div id="galleries" className={styles.layout}>
        <GalleryList />
        <GalleryForm galleryID={parseInt(this.props.params.id)} />
      </div>
    )
  }

}