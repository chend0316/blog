const React = require('react')
const ReactDOM = require('react-dom')

const root = document.createElement('div')
document.body.appendChild(root)

const App = () => {
  const msg = 'world'
  return <h1>hello {msg}</h1>
}

ReactDOM.render(<App />, root)
