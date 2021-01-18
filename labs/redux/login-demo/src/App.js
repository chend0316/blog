import { useState } from "react";
import { connect } from 'react-redux'

function App({ onLogin, onLogout, hasLoggedIn }) {
  const [password, setPassword] = useState('')

  function handleLogin() {
    onLogin(password)
  }

  function handleLogout() {
    onLogout()
  }

  return (
    <div>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      { !hasLoggedIn && <button onClick={handleLogin}>登录</button> }
      { hasLoggedIn && <button onClick={handleLogout}>注销</button> }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    hasLoggedIn: state.account !== null
  }
}

const mapDispatchToProps = {
  onLogin: (password) => {
    return {
      type: 'account/login',
      payload: {
        password
      }
    }
  },
  onLogout: () => {
    return {
      type: 'account/logout'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
