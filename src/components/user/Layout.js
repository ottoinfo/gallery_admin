import React from "react"
import { observer } from "mobx-react"
import UserList from "./List"
import UserForm from "./Form"

@observer
export default class UserLayout extends React.Component {

  static propTypes = { 
    params: React.PropTypes.object,
    options: React.PropTypes.string,
  }

  static defaultProps = {
    options: "users",
  }

  render() {
    return (
      <div id="users">
        <UserList />
        <UserForm userID={parseInt(this.props.params.id)} />
      </div>
    )
  }

}