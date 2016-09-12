import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"
import styles from "./style.scss"

@observer
export default class TagForm extends React.Component {

  @observable tag = {
    name: "",
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    AccountStore: React.PropTypes.object.isRequired,
    TagStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.AccountStore = context.AccountStore
    this.TagStore = context.TagStore
    this.UIState = context.UIState
  }

  handleInputChange = (ev)=> {
    const { target } = ev
    this.tag.name = target.value
  }

  handleClearSearch = ()=> {
    this.tag.name = ""
  }

  handleSubmit = (ev)=> {
    ev.preventDefault()
    this.TagStore.saveItem(this.tag, (err)=>{
      if (err) {
        throw new Error("Error Saving:" + err)
      }
      else {
        this.handleClearSearch()
      }
    })
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
       <fieldset>
          <label htmlFor="name">Create Tags <i className="fa fa-question-circle" aria-hidden="true" /></label>
          
          <div className={styles.input}>
            <input type="text" name="name" placeholder="ex: favorites" value={this.tag.name} onChange={this.handleInputChange} />
            <i className="fa fa-times" aria-hidden="true" onClick={this.handleClearSearch} />
          </div>
          
          <button id="save" className="btn blue" onClick={this.handleSubmit}>Save</button>
        </fieldset>
      </form>
    )
  }
}