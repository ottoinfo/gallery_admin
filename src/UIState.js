import { observable } from "mobx"
import { spring, presets } from "react-motion"

class UIState {
  @observable flash = {}
  @observable alert = {}

  // Animation Helpers
  configAnimation = {
    default: {
      stiffness: 120,
      damping: 17,
      precision: 0.1,
    },
  }

  animateItems = (children, style) => {
    return Object.assign(children, style)
  }

  flashAnimation = {
    defaults: {
      height: 0, 
      opacity: 1,
    },
    enter: {
      height: 0,
      opacity: 1,
    },
    leave: {
      height: spring(0),
      opacity: spring(0),
    },
    style: {
      height: spring(60, presets.gentle),
      opacity: spring(1, presets.gentle),
    },
  }
}

const singleton = new UIState()
export default singleton