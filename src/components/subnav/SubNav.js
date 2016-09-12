import React from "react"
import { observer } from "mobx-react"
import GalleryOptions from "./options/Galleries"
import ImageOptions from "./options/Images"
import TagOptions from "./options/Tags"
import UserOptions from "./options/Users"
import styles from "./style.scss"

@observer
export default class SubHeader extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  static propTypes = { 
    options: React.PropTypes.string,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.options = props.options
  }

  isSelected = (route)=> {
    return window.location.pathname.search(route) > -1 ? styles.selected : styles.notselected
  }

  getOptions() {
    switch (this.options) {
    case "galleries":
      return <GalleryOptions />
    case "images":
      return <ImageOptions />
    case "tags":
      return <TagOptions />
    case "users":
      return <UserOptions />
    default:
      return null
    }
  }

  handleLink = (ev)=> {
    ev.preventDefault()
    const target = ev.currentTarget
    return this.router.push(target.href.replace(window.location.origin, ""))
  }

  render() {
    return (
      <div id="subheader" className={styles.subnav}>
        <ul className={styles.icons}>
          <li className={`${styles.icon} ${this.isSelected("galleries")}`} >
            <a href="/admin/galleries" onClick={this.handleLink}><i className="fa fa-folder-open-o" aria-hidden="true" /><span>Galleries</span></a>
          </li>

          <li className={`${styles.icon} ${this.isSelected("images")}`} >
            <a href="/admin/images" onClick={this.handleLink}><i className="fa fa-camera" aria-hidden="true" /><span>Images</span></a>
          </li>

          <li className={`${styles.icon} ${this.isSelected("tags")}`} >
            <a href="/admin/tags" onClick={this.handleLink}><i className="fa fa-tags" aria-hidden="true" /><span>Tags</span></a>
          </li>

          <li className={`${styles.icon} ${this.isSelected("users")}`} >
            <a href="/admin/users" onClick={this.handleLink}><i className="fa fa-user" aria-hidden="true" /><span>Users</span></a>
          </li>

          <li className={`${styles.icon} ${this.isSelected("settings")}`} >
            <a href="/admin/settings" onClick={this.handleLink}><i className="fa fa-cog" aria-hidden="true" /><span>Settings</span></a>
          </li>
        </ul>

        <div className={styles.options}>
          {this.getOptions()}
        </div>
      </div>
    )
  }

}