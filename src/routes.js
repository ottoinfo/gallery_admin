import React from "react"
import { Route, IndexRoute, IndexRedirect } from "react-router"

import Layout from "./components/admin/Layout"
// import Information from "./components/information/Information"
import Login from "./components/admin/Login"
import Admin from "./components/admin/Admin"
// import Settings from "./components/settings/Settings"

const NotFound = ()=>
  (<h1>404.. This page is not found!</h1>)

export default (
  <Route path="/" component={ Layout }>
    <IndexRoute component={ Login }/>
    <Route path="login" component={ Login }/>
    <Route path="signup" component={ Admin }/>
    <Route path="*" component={ NotFound } />
  </Route>
)
