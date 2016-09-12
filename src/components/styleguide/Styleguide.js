import React from "react"
import Layout from "../layout/Layout"
import styles from "../../../public/css/styleguide.scss"

export default class Styleguide extends React.Component {

  shades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  colors = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  render() {
    return (
      <div className="styleguide">
        <p>Styleguide</p>

        <div className="section shades">
        {this.shades.map(index=> {
          return (
          <div key={index}>
            <div className="box" />
            <p></p>
          </div>)
        })}
        </div>

        <div className="section colors">
        {this.colors.map(index=> {
          return (
          <div key={index}>
            <div className="box" />
            <p></p>
          </div>)
        })}
        </div>

        <div className="section layout">
          <Layout />
        </div>

      </div>
    )
  }

}