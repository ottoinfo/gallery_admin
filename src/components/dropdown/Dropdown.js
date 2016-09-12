import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"
import Animation from "../animate/Animation"
import styles from "./style.scss"

@observer 
export default class TagSort extends React.Component {

  @observable visible = false
  @observable value = ""

  static propTypes = {
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
    sortOptions: React.PropTypes.object,
    title: React.PropTypes.string,
    value: React.PropTypes.string,
  }

  static defaultProps = {
    className: "dropdown",
    sortOptions: {
      "updateAt|desc": "Updated (Newest)",
      "updateAt|asc": "Updated (Oldest)",
      "name|asc": "Name (A-Z)",
      "name|desc": "Name (Z-A)",
    },
    value: null,
  }

  constructor(props, context) {
    super(props, context)
    this.className = props.className
    this.sortOptions = props.sortOptions
    this.title = props.title
    this.setValue(props.value)
  }

  setValue(value) {
    this.value = this.sortOptions[value] || this.sortOptions[Object.keys(this.sortOptions)[0]]
  }

  showList = (ev)=> {
    this.visible = !this.visible
  }

  handleClick = (ev)=> {
    ev.preventDefault()
    const { sort } = ev.currentTarget.dataset
    this.setValue(sort)
    this.props.onChange(sort)
  }

  render() {
    return (
      <div className={`${this.className} ${styles.layout}`} onClick={this.showList}>
        <p>
          {this.value}
          <i className={`fa ${this.visible ? "fa-caret-up ": "fa-caret-down"}`} aria-hidden="true" />
        </p>

        <Animation
          atEnter={{ opacity: 0, height: 0 }}
          atLeave={{ opacity: 0, height: 0 }}
          atActive={{ opacity: 1, height: 100 }} 
          component={false}>
        {this.visible && (
          <ul className="options">
            {Object.keys(this.sortOptions).map(key =>{
              return (
                <li data-sort={key} key={key} onClick={this.handleClick}>
                  <p>{this.sortOptions[key]}</p>
                </li>
              )
            })}
          </ul>
        )}
        </Animation>
      </div>
    )
  }
}