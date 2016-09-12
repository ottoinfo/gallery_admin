import React from "react"
import { observer } from "mobx-react"
import ImageList from "./List"
import ImageForm from "./Form"
import styles from "./style.scss"

@observer
export default class ImageLayout extends React.Component {

  static propTypes = {
    params: React.PropTypes.object,
    options: React.PropTypes.string,
  }

  static defaultProps = {
    options: "images",
  }

  render() {
    return (
      <div id="images" className={styles.layout}>
        <ImageList />
        
      </div>
    )
  }

}
// <ImageForm imageID={parseInt(this.props.params.id)} />