import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"
// import styles from "./style.scss"

@observer
export default class UserForm extends React.Component {

  @observable user = {}

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    AccountStore: React.PropTypes.object.isRequired,
    UserStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    userID: React.PropTypes.number,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.AccountStore = context.AccountStore
    this.UserStore = context.UserStore
    this.UIState = context.UIState
    this.userID = props.userID || "new"
  }

  componentDidMount() {
    this.loadUser()
  }

  componentWillUpdate() {
    this.loadUser()
  }

  componentWillReceiveProps(nextProps) {
    this.userID = nextProps.userID
    this.user = {}
  }

  loadUser = ()=> {
    if (this.UserStore.isLoaded && !this.user.uuid) {
      this.user = this.UserStore.findItem(this.userID) || this.UserStore.createModel()
    }
  }

  handleInputChange = (ev)=> {
    const { target } = ev
    this.user[target.name] = target.value
  }

  handleSubmit = (ev)=> {
    ev.preventDefault()
    this.UserStore.saveItem(this.user.asJSON, (err)=>{
      if (err) return
    })
  }

  handleDelete = (ev)=> {
    ev.preventDefault()
    this.UIState.alert = { 
      message: "Are you sure you want to delete this User?",
      handleSubmit: ()=> {
        this.UserStore.deleteItem(this.user.asJSON)
      },
    }
  }

  render() {
    const { errors } = this.UserStore
    const user = this.user || {}

    return (
      <form className={this.UserStore.isLoading ? "loading" : ""} onSubmit={this.handleSubmit}>
        <legend>
          <p>{user.id ? "Edit" : "Create"} User</p>
        </legend>
        <p className="required">Required fields are followed by <strong>*</strong></p>

       <fieldset>
          <div className="group">
            <label htmlFor="userName">User Name <strong>*</strong></label>
            <input type="text" name="userName" value={user.userName} onChange={this.handleInputChange} placeholder="Ex: WallyFink"/>
            <p className="error">{ errors.userName }</p>
          </div>

          <div className="group">
            <label htmlFor="firstName">First Name <strong>*</strong></label>
            <input type="text" name="firstName" value={user.firstName} onChange={this.handleInputChange} placeholder="Ex: Wally"/>
            <p className="error">{ errors.firstName }</p>
          </div>

          <div className="group">
            <label htmlFor="lastName">Last Name <strong>*</strong></label>
            <input type="text" name="lastName" value={user.lastName} onChange={this.handleInputChange} placeholder="Ex: Finkbeiner"/>
            <p className="error">{ errors.lastName }</p>
          </div>

          <div className="group">
            <label htmlFor="email">Email <strong>*</strong></label>
            <input type="text" name="email" value={user.email} onChange={this.handleInputChange} placeholder="Ex: walleyfink@gmail.com"/>
            <p className="error">{ errors.email }</p>
          </div>

        {user.id &&
          <div className="reset group">
            <input id="checkbox" type="checkbox" checked={user.checkbox} onChange={(ev)=> Boolean(user.checkbox = ev.target.checked)}/>
            <label htmlFor="checkbox">Reset Password</label>
          </div>
        }

        {(!user.id || user.checkbox) &&
          <div className="group">
            <p className="error">{ errors.password }</p>
            <label htmlFor="password">Password <strong>{user.id && "*"}</strong></label>
            <input type="password" name="password" value={user.password} onChange={this.handleInputChange} placeholder="Ex: ****"/>
          </div>
        }

        {(!user.id || user.checkbox) &&
          <div className="group">
            <label htmlFor="confirmation">Confirm Password <strong>{user.id && "*"}</strong></label>
            <input type="password" name="confirmation" value={user.confirmation} onChange={this.handleInputChange} placeholder="Ex: ****"/>
          </div>
        }

          <div className="btns">
            <button id="save" className="btn blue" onClick={this.handleSubmit}>Save</button>
          {user.id &&
            <button id="delete" className="btn red" onClick={this.handleDelete}>Delete</button>
          }
          </div>
        </fieldset>
      </form>
    )
  }
}