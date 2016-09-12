import React from "react"
import { observer } from "mobx-react"

// Stores
import AccountStore from "./stores/AccountStore"
import GalleryStore from "./stores/GalleryStore"
import ImageStore from "./stores/ImageStore"
import TagStore from "./stores/TagStore"
import UserStore from "./stores/UserStore"
import UIState from "./UIState"

// Setup Params on Stores
GalleryStore.setup({ AccountStore, UIState })
ImageStore.setup({ AccountStore, UIState })
TagStore.setup({ AccountStore, UIState })
UserStore.setup({ AccountStore, UIState })

@observer
export default class AppWrapper extends React.Component {
  static propTypes = { children: React.PropTypes.node }
  
  static childContextTypes = {
    AccountStore: React.PropTypes.object,
    GalleryStore: React.PropTypes.object,
    ImageStore: React.PropTypes.object,
    TagStore: React.PropTypes.object,
    UserStore: React.PropTypes.object,
    UIState: React.PropTypes.object,
  }

  getChildContext() {
    return {
      AccountStore,
      GalleryStore,
      ImageStore,
      TagStore,
      UserStore,
      UIState,
    }
  }

  authRequired(nextState, replace) {
    console.log("authRequired", nextState, replace)
    // if (!this.context.AccountStore.isLoggedIn) {
    //   replace("/login")
    // }
  }

  render() {
    return (
      <div id="wrapper">
        {this.props.children}
      </div>
    )
  }
}