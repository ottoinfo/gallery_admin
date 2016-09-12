import React from "react"
import { observer } from "mobx-react"
import TagList from "./List"
import TagForm from "./Form"

@observer
export default class TagLayout extends React.Component {

  static propTypes = { 
    params: React.PropTypes.object,
    options: React.PropTypes.string,
  }

  static defaultProps = {
    options: "tags",
  }

  render() {
    return (
      <div id="tags">
        <TagForm />
        <TagList />
      </div>
    )
  }

}