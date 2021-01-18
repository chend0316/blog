import AsyncButton from './AsyncButton'
import { login } from './services'

function AsyncButtonDemo() {
  return <AsyncButton onClick={login}>Login</AsyncButton>
}

export default AsyncButtonDemo
