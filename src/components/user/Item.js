import React from "react"
import { observer } from "mobx-react"

@observer 
export default class UserItem extends React.Component {

  static contextTypes = {
    UserStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    user: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.UserStore = context.UserStore
    this.UIState = context.UIState
    this.user = props.user
  }

  handleDelete = (ev)=> {
    ev.preventDefault()
    this.UIState.alert = { 
      message: "Are you sure you want to delete this User?",
      handleSubmit: ()=> {
        this.UserStore.deleteUser(this.props.user.asJSON)
      },
    }
  }

  render() {
    if (!this.user.show) {
      return null
    }

    return (
      <li onClick={this.handleEdit}>
        <i className="fa fa-tag" aria-hidden="true" />
        <p>{this.user.userInfo}</p>
        <i className="fa fa-times" aria-hidden="true" onClick={this.handleDelete} />
      </li>
    )
  }
}