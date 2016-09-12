import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"
import Fuse from "fuse.js"
import styles from "./style.scss"

@observer
export default class SearchStore extends React.Component {

  @observable search = ""

  static propTypes = {
    className: React.PropTypes.string,
    fields: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    store: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
    className: "search",
    fields: ["name"],
    placeholder: "search...",
  }

  constructor(props, context) {
    super(props, context)
    this.className = props.className
    this.fields = props.fields
    this.placeholder = props.placeholder
    this.store = props.store
  }

  componentDidMount() {
    this.fuse = new Fuse(null, {
      caseSensitive: false,
      threshold: 0.2,
      maxPatternLength: 32,
      keys: this.fields,
    })
  }

  handleInputChange = (ev)=> {
    const { target } = ev
    this.search = target.value
    !this.search ? this.resetStore() : this.searchStore(ev)
  }

  handleClearSearch = ()=> {
    this.search = ""
    this.resetStore()
  }

  resetStore() {
    this.store.items.map(item => item.show = true)
  }

  searchStore(ev) {
    ev.preventDefault()
    this.store.items.map(item => {
      this.fuse.list = [item]
      this.fuse.search(this.search).length ? item.show = true : item.show = false
    })
  }

  render() {
    return (
      <div className={`${styles.search} ${this.className}`}>
        <i className="fa fa-search" aria-hidden="true" />
        <input type="text" placeholder={this.placeholder} value={this.search} onChange={this.handleInputChange} />
        <i className="fa fa-times" aria-hidden="true" onClick={this.handleClearSearch} />
      </div>
    )
  }
}