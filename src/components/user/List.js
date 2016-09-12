import React from "react"
import { observer } from "mobx-react"
import UserItem from "./Item"
// import styles from "./style.scss"

@observer 
export default class UserList extends React.Component {

  static contextTypes = {
    UserStore: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.UserStore = context.UserStore
    console.log("con", this)
  }

  componentDidMount() {
    if (!this.UserStore.isLoaded) {
      this.UserStore.fetchItems()
    }
  }

  render() {
    return (
      <ul>
      { this.UserStore.getItems.map(user =>
        <UserItem key={user.id} user={user}/> 
      ) }
      </ul>
    )
  }
}