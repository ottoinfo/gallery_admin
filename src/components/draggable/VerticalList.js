import React from "react"
import Draggable from "./Draggable"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { Motion, spring } from "react-motion" 

@observer
export default class VerticalList extends Draggable {

  @observable management = {
    delta: 0,
    mouse: 0,
    isPressed: false,
    lastPressed: 0,
    order: [],
  }

  handleMouseMove = ({ pageY })=> {
    const { isPressed, delta, order, lastPressed } = this.management
    if (isPressed) {
      const mouse = pageY - delta
      const row = this.clamp(Math.round(mouse / 100), 0, order.length - 1)
      const newOrder = this.reorder(order.indexOf(lastPressed), row)
      Object.assign(this.management, { 
        mouse: mouse,
        order: newOrder,
      })
    }
  }

  render() {
    const { mouse, isPressed, lastPressed, order } = this.management
    const { animation } = this.props.config

    if (!order.length) {
      return null
    }

    return (
      <div className={this.props.className}>
      { order.map((key, index)=> {
        const style = lastPressed == key && isPressed
          ? {
            scale: spring(1.1, animation),
            shadow: spring(16, animation),
            y: mouse,
          }
          : {
            scale: spring(1, animation),
            shadow: spring(1, animation),
            y: spring(order.indexOf(key) * 100, animation),
          }

        return (
          <Motion style={style} key={index}>
            {({ scale, shadow, y }) =>
              <div
                onMouseDown={this.handleMouseDown.bind(null, key, y)}
                onTouchStart={this.handleTouchStart.bind(null, key, y)}
                style={{
                  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  zIndex: key == lastPressed ? 99 : index,
                }}>
                { this.findChild(key) }
              </div>
            }
          </Motion>
        )
      })}
      </div>
    )
  }
}
