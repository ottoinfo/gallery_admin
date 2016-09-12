import React from "react"
import { observer } from "mobx-react"
import SearchStore from "../../search/Store"
import styles from "../style.scss"

@observer
export default class TagOptions extends React.Component {

  static contextTypes = {
    TagStore: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.TagStore = context.TagStore
  }

  handleRefresh = (ev)=> {
    ev.preventDefault()
    this.TagStore.fetchItems()
  }

  render() {
    return (
      <div className={styles.options_layout}>
        <SearchStore store={this.TagStore} />
        <div className={styles.spacer} />
        <div>Filters</div>
        <a onClick={this.handleRefresh}><i className="fa fa-exchange" aria-hidden="true" /></a>
      </div>
    )
  }

}