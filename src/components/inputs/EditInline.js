import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

@observer 
export default class EditInline extends React.Component {

  @observable focus = false

  static propTypes = {
    className: React.PropTypes.string,
    handleUpdate: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
    value: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: "inline",
    handleUpdate: function(val) { 
      console.log("Value Updated:", val) 
    },
    model: {},
    value: null,
  }

  constructor(props, context) {
    super(props, context)
    this.model = props.model
    this.value = props.value
    this.original = this.model[this.value]
  }

  handleFocus = (ev)=> {
    this.focus = true
  }

  handleBlur = (ev)=> {
    this.focus = false
    if (this.original != this.model[this.value]) {
      this.original = this.model[this.value]
      this.props.handleUpdate(this.original)
    }
  }

  handleKeyPress = (ev)=> {
    if (ev.charCode == 13) { // Handle Enter Key
      ev.stopPropagation()
      this.handleBlur()
    }
  }

  handleInputChange = (ev)=> {
    const { target } = ev
    this.model[this.value] = target.value
  }

  render() {
    let field
    if (!this.focus) {
      field = <p>{this.model[this.value]}</p>
    }
    else {
      field = <input autoFocus type="text" value={this.model[this.value]} onKeyPress={this.handleKeyPress} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleInputChange} />
    }

    return (
      <div className={this.props.className} onClick={this.handleFocus}>
        { field }
      </div>
    )
  }

}