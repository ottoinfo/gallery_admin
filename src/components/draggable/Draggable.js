import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

@observer
export default class VerticalList extends React.Component {

  @observable management = {
    delta: 0,
    mouse: 0,
    isPressed: false,
    lastPressed: 0,
    order: [],
  }

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    mapKey: React.PropTypes.func,
  }

  static defaultProps = {
    className: "vertical-list",
    config: {
      animation: {
        stiffness: 300,
        damping: 50,
      },
    },
    mapKey: val => val.key,
  }

  constructor(props, context) {
    super(props, context)
    this.children = props.children
    this.mapKey = props.mapKey
    this.setupOrder(props.children)
  }

  componentDidMount() {
    window.addEventListener("touchmove", this.handleTouchMove)
    window.addEventListener("touchend", this.handleMouseUp)
    window.addEventListener("mousemove", this.handleMouseMove)
    window.addEventListener("mouseup", this.handleMouseUp)
  }

  componentWillReceiveProps(nextProps) {
    this.setupOrder(nextProps.children)
  }

  setupOrder(children) {
    children.map(child => {
      this.management.order.push(
        this.mapKey(child)
      )
    })
  }

  reorder(from, to) {
    const order = this.management.order.slice(0)
    const val = order[from]
    order.splice(from, 1)
    order.splice(to, 0, val)
    return order
  }

  clamp(n, min, max) {
    return Math.max(Math.min(n, max), min)
  }

  findChild = (key)=> {
    return this.props.children.find(child=> child["key"] == key)
  }

  findPosition = (model, key="id")=> {
    return this.management.order.find((item)=> item[key] == model[key])
  }

  handleTouchStart = (key, pressLocation, ev)=> {
    this.handleMouseDown(key, pressLocation, ev.touches[0])
  }

  handleTouchMove = (ev)=> {
    ev.preventDefault()
    this.handleMouseMove(ev.touches[0])
  }

  handleMouseDown = (pos, pressY, { pageY })=> {
    Object.assign(this.management, {
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    })
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

  handleMouseUp = ()=> {
    Object.assign(this.management, { 
      isPressed: false,
      delta: 0,
    })
  }

  render() {
    throw new Error("Please create a new render method")
  }
}
