import React from "react"
import { observer } from "mobx-react"
import SearchStore from "../../search/Store"
import styles from "../style.scss"

@observer
export default class UserOptions extends React.Component {

  static contextTypes = {
    UserStore: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.UserStore = context.UserStore
  }

  handleRefresh = (ev)=> {
    ev.preventDefault()
    this.UserStore.fetchItems()
  }

  render() {
    return (
      <div className={styles.options_layout}>
        <SearchStore store={this.UserStore} fields={["userName","firstName","lastName","email"]}/>
        <div className={styles.spacer} />
        <div>Filters</div>
        <a className={`btn ${styles.refresh}`} onClick={this.handleRefresh}><i className="fa fa-exchange" aria-hidden="true" /></a>
      </div>
    )
  }

}