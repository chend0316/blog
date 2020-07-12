const { createStore, combineReducers } = require('redux');

function reducer1(state = { name: 'zhang', age: 18 }, action) {
  console.log('reducer1')
  if (action.type === '111_name') {
    return {
      ...state,
      name: action.name,
    }
  } else if (action.type === '111_age') {
    return {
      ...state,
      age: action.age,
    }
  }
  return state
}

function reducer2(state = '', action) {
  console.log('reducer2')
  if (action.type === '222') {
    return action.msg
  }
  return state
}

const reducer = combineReducers({
  reducer1,
  reducer2
})
const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})
console.log('!!!!!')
store.dispatch({
  type: '111_name',
  name: 'lisi',
})

store.dispatch({
  type: '222',
  msg: 'hello'
})
