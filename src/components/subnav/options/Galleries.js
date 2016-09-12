import React from "react"
import { observer } from "mobx-react"
import SearchStore from "../../search/Store"
import styles from "../style.scss"

@observer
export default class GalleryOptions extends React.Component {

  static contextTypes = {
    GalleryStore: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.GalleryStore = context.GalleryStore
  }

  handleRefresh = (ev)=> {
    ev.preventDefault()
    this.GalleryStore.fetchItems()
  }

  render() {
    return (
      <div className={styles.options_layout}>
        <SearchStore store={this.GalleryStore} />
        <div className={styles.spacer} />
        <div>Filters</div>
        <a onClick={this.handleRefresh}><i className="fa fa-exchange" aria-hidden="true" /></a>
      </div>
    )
  }

}