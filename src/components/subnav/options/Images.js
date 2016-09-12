import React from "react"
import { observer } from "mobx-react"
import SearchStore from "../../search/Store"
import Dropdown from "../../dropdown/Dropdown"
import styles from "../style.scss"

@observer
export default class ImageOptions extends React.Component {

  static contextTypes = {
    ImageStore: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.ImageStore = context.ImageStore
  }

  handleRefresh = (ev)=> {
    ev.preventDefault()
    this.ImageStore.fetchItems()
  }

  handleSort = (value)=> {
    console.log(value)
    this.ImageStore.sort = value
  }

  render() {
    return (
      <div className={styles.options_layout}>
        <SearchStore store={this.ImageStore} />
        <div className={styles.spacer} />
        <div>Filters</div>
        <Dropdown onChange={this.handleSort}/>
        <a onClick={this.handleRefresh}><i className="fa fa-exchange" aria-hidden="true" /></a>
      </div>
    )
  }

}