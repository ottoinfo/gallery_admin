import React from "react"
import { Route } from "react-router"

// Components
import AppWrapper from "./wrapper"
import Layout from "./components/layout/Layout"
import GalleryLayout from "./components/gallery/Layout"
import ImageLayout from "./components/image/Layout"
import TagLayout from "./components/tag/Layout"
import UserLayout from "./components/user/Layout"
import Styleguide from "./components/styleguide/Styleguide"
import Login from "./components/login/Login"
import NotFound from "./components/404"

export default (
  <Route path="/" component={ AppWrapper }>
    <Route path="admin" component={Layout}>
      <Route path="galleries(/)(:id)" component={GalleryLayout} />
      <Route path="images(/)(:id)" component={ImageLayout} />
      <Route path="tags(/)(:id)" component={TagLayout} />
      <Route path="users(/)(:id)" component={UserLayout} />
    </Route>

    <Route path="admin/styleguide" component={Styleguide}/>

    <Route path="login" component={ Login }/>
    <Route path="*" component={ NotFound }/>
  </Route>
)
