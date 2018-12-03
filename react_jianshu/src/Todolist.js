import React, { Component, Fragment } from 'react';
// import axios from 'axios'

import Todoitem from './Todoitem'
import './todo.css';

class Todolist extends Component {
  constructor(props) {
    super(props)
    // 当组件的state或者props发生改变的时候，render函数就会重新执行.
    this.InputTodo = this.InputTodo.bind(this)
    this.AddTodo = this.AddTodo.bind(this)
    this.DelTodo = this.DelTodo.bind(this)
    this.state = {
      inputValue: '',
      list: []
    }
  }
  // componentDidMount() { // 放ajax请求
  //   axios.get('./api/todolist')
  //     .then(()=>{alert('succ')})
  //     .catch(()=>{alert('error')})
  // }
  render() {
    return (
      <Fragment>
        {/* 注释这样写 */}
        {
          // 或者这样写 //
        }
        <div>
          <label htmlFor="insert">输入：</label>
          <input
            id="insert"
            className="input"
            value={this.state.inputValue}
            onChange={this.InputTodo}/>
          <button onClick={this.AddTodo}>提交</button>
        </div>
        <ul>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    );
  }
  getTodoItem() {
    return this.state.list.map((item, index)=>{
      return (
        <Todoitem 
          content={item}
          index={index}
          DelTodo={this.DelTodo}
          key={index}
        ></Todoitem>
        // <li 
        //   key={index}
        //   onClick={this.DelTodo.bind(this,index)}
        //   // dangerouslySetInnerHTML={{__html: item}} //取消转义，会有被xss攻击危险
        // > 
        //   {/* {item}  */}
        // </li>
      )
    })
  }

  InputTodo(e) {
    const value = e.target.value // setState更建议返回一个函数，里面的内容要提前提出来，return一个函数
    this.setState(() => { // 异步的setState，跟虚拟dom有关系
      return ({
        inputValue: value
      })
    })
    // this.setState({
    //   inputValue: e.target.value
    // })
  }
  AddTodo(e) {
    this.setState((prevState)=>({ // prevState表示改变之前的状态，替代 this.state
      list: [...prevState.list,prevState.inputValue],
      inputValue: ''
    }))
    // this.setState({
    //   list: [...this.state.list,this.state.inputValue],
    //   inputValue: ''
    // })
  }
  DelTodo(index) {
    this.setState((prevState)=> {
      const list = [...prevState.list]
      list.splice(index,1)
      return {
        list
      }
    })
    // this.setState({
    //   list: list
    // })
  }
}

export default Todolist;
