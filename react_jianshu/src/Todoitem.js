import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Todoitem extends Component {
  constructor(props) {
    super(props)
    this.Deltodoitem = this.Deltodoitem.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.content)
    console.log(this.props.content)
    if(nextProps.content !== this.props.content) {
      console.log('1111')
      return true
    }
    return false
  }
  componentWillUpdate() {
    console.log('willUpdate')
  }
  // getSnapshotBeforeUpdate() {
  //   console.log('beforeUpdate')
  // }
  componentDidUpdate() {
    console.log('didUpdate')
  }
  render() {
    console.log('child render')
    const { content } = this.props
    return (
      <li onClick={this.Deltodoitem}>
        { content }
      </li>
    )
  }

  
  Deltodoitem(e) {
    const { DelTodo, index } = this.props
    DelTodo(index)
    // this.props.index
  }
}

Todoitem.propTypes = {
  content: PropTypes.string.isRequired,
  DelTodo: PropTypes.func,
  index: PropTypes.number
}

Todoitem.defaultProps = {
  test: 'abc'
}

export default Todoitem