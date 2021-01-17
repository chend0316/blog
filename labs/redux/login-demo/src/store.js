import { createStore } from 'redux'

const initialState = {
  account: null
}

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account/login':
      if (action.payload.password === '123456') {
        return {
          ...state,
          account: {
            username: 'zhangsan',
            role: 'admin'
          }
        }
      } else {
        return {
          ...state,
          account: null
        }
      }
    case 'account/logout':
      return {
        ...state,
        account: null
      }
    default:
      return state
  }
}

export default createStore(
  accountReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
