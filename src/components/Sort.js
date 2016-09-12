import React from "react"
import { observer } from "mobx-react"

@observer 
export default class TagSort extends React.Component {

  sortOptions = {
    "updateAt|desc": "Updated (Newest)",
    "updateAt|asc": "Updated (Oldest)",
    "name|asc": "Name (A-Z)",
    "name|desc": "Name (Z-A)",
  }

  static propTypes = {
    onChange: React.PropTypes.func,
    sortOptions: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    if (props.sortOptions) { // Override Defaults
      this.sortOptions = props.sortOptions
    }
  }

  render() {
    return (
      <select id="sort" onChange={this.props.onChange}>
        { Object.keys(this.sortOptions).map(key =>
          <option value={key} key={key}>
            {this.sortOptions[key]}
          </option> 
        ) }
      </select>
    )
  }
}