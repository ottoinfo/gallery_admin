import React from "react"
import { observer } from "mobx-react"
import TagItem from "./Item"
import styles from "./style.scss"

@observer 
export default class TagList extends React.Component {

  static contextTypes = {
    TagStore: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.TagStore = context.TagStore
  }

  componentDidMount() {
    console.log("componentDidMount", this.TagStore)
    if (!this.TagStore.isLoaded) {
      this.TagStore.fetchItems()
    }
  }

  render() {
    console.log("render", this.TagStore)
    return (
      <ul className="list">
      { this.TagStore.getItems.map(tag =>
        <TagItem key={tag.id} tag={tag}/> 
      ) }
      </ul>
    )
  }
}