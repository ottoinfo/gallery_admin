import React from "react"
import { observer } from "mobx-react"
import VerticalList from "../draggable/VerticalList"
import GalleryItem from "./Item"
import styles from "./style.scss"

@observer
export default class GalleryList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    AccountStore: React.PropTypes.object.isRequired,
    GalleryStore: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
    this.AccountStore = context.AccountStore
    this.GalleryStore = context.GalleryStore
  }

  componentDidMount() {
    if (!this.GalleryStore.isLoaded) {
      this.GalleryStore.fetchItems()
    }
  }

  handleNew = ()=> {
    this.router.push("/admin/galleries/new")
  }

  handleRefresh = (ev)=> {
    ev.preventDefault()
    this.GalleryStore.fetchItems()
  }

  handleSort = (ev)=> {
    this.GalleryStore.sort = ev.target.value
  }

  render() {
    return (
      <div className={styles.menu}>
        <div className={styles.options}>
          <a className={styles.new} onClick={this.handleNew}><i className="fa fa-plus" aria-hidden="true" />New</a>
        </div>
        
        <VerticalList
          className={styles.list} >
        { this.GalleryStore.getItems.map(gallery =>
          <GalleryItem key={gallery.uuid} gallery={gallery}/> 
        ) }
        </VerticalList>
      </div>
    )
  }
}