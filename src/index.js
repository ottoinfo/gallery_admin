import React from "react"
import ReactDom from "react-dom"
import { Router, browserHistory } from "react-router"
import routes from "./routes"

alert("hello")

ReactDom.render(<Router children={ routes } history={ browserHistory }/> , document.getElementById("app"))