Redux
===

Redux是一个数据状态管理工具，常与React搭配使用。其核心思路是
1. `Component`触发事件，`dispatch`一个`action`（包含数据）给`store`
2. `store`根据`action.type`分发给`reducer`函数
3. `reducer`函数则返回一个新的`state`给`store`
4. `store`对`Component`进行更新状态

###action编写方法

1. 直接返回
  ```
  function action(data) {
    return {
    type: 'EXAMPLE',
    data
    }
  }
  ```
2. 触发其他action
  ```
  function action(data) {
    return (dispatch,getState){
      if(getState.num == 0){
        return dispatch(anotherAction(data))
      }
    }
  }
  ```

###reducer编写方法
1. 编写单个reducer
  ```
  function reducer1(state = {num:0}, action) {
    switch (action.type) {
      case EXAMPLE :
      return Object.assign({}, state, {
        num: state.num + 1
      })
      default:
        return state
    }
  }
  ```
2. 合并reducer
  ```
  import { combineReducers } from 'redux'
  const rootReducer = combineReducers({
    reducer1,
    reducer2
  })
  export default rootReducer
  ```
  注：之后在State里reducer1和reducer2就分别是相对应state的key值，例如`store.getState().reducer1`

###store编写方法
1. 简单方法
  ```
  import { createStore } from 'redux'
  import rootReducer from './reducers'
  export default createStore(rootReducer)
  ```
2. 加中间件和初始状态
  ```
  import { createStore, applyMiddleware } from 'redux'
  import thunkMiddleware from 'redux-thunk'
  import createLogger from 'redux-logger'
  import rootReducer from './reducers'
  const loggerMiddleware = createLogger()
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore)
  export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState)
  }
  ```
3. 引入`redux-tools`浏览器支持
  ```
  export default createStore(todoApp, window.devToolsExtension && window.devToolsExtension());
  ```

###与`React Component`结合
```
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { action1, action2 } from '../action/actions'

class App extends Component {
  handleEvent(data) {
    const { dispatch } = this.props
    dispatch(action1(data))
  }
  render() {
    const { state1, state2 } = this.props
    return (
      <Component value={state1} handleClick={this.handleEvent} />
    )
  }
}

function mapStateToProps(state){
  const { reducer1, reducer2 } = state
  const { num } = reducer1
  return {
    num
  }
}

export default connect(mapStateToProps)(App)
```

###渲染到页面
```
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import configureStore from '../configureStore'
import App from './App'

const store = configureStore({})

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
      <App />
      </Provider>
    )
  }
}

render(
  <Root />,
  document.getElementById('root')
)
```

###编写middleware进行通用处理
```
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}
```
注：一个`middleware`接受3次参数，第一个是`store`容器，第二个是接下来的`action`生成器函数，第三个是被触发的`action`。

就像猴子传玉米一样，每个`middleware`取得`store` 和 `next` 和 `action`进行处理，返回一个`next(action)`传递给真正的`action`生成器。
