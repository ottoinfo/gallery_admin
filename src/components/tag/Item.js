import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"
import EditInline from "../inputs/EditInline"

@observer 
export default class TagItem extends React.Component {

  static contextTypes = {
    TagStore: React.PropTypes.object.isRequired,
    UIState: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    tag: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.TagStore = context.TagStore
    this.UIState = context.UIState
    this.tag = props.tag
  }

  handleUpdate = ()=> {
    console.log("update", this.tag.asJSON)
    this.TagStore.saveItem(this.tag.asJSON, (err)=>{
      if (err) return
    })
  }

  handleDelete = (ev)=> {
    ev.preventDefault()
    this.UIState.alert = { 
      message: "Are you sure you want to delete this Tag?",
      handleSubmit: ()=> {
        this.TagStore.deleteItem(this.props.tag.asJSON)
      },
    }
  }

  render() {
    console.log("render", this.tag.show)
    if (!this.tag.show) {
      return null
    }
    return (
      <li onClick={this.handleEdit}>
        <i className="fa fa-tag" aria-hidden="true" />
        <EditInline model={this.tag} value="name" handleUpdate={this.handleUpdate}/>
        <i className="fa fa-times" aria-hidden="true" onClick={this.handleDelete} />
      </li>
    )
  }
}