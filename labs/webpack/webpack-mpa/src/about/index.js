import React from 'react'
import { render } from 'react-dom'

const App = () => {
  return <div>
    <p>这是 About 页面</p>
  </div>
}

render(
  <App />,
  document.getElementById('app')
)
