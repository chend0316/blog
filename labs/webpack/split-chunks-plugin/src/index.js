const { useState } = require('react')
const React = require('react')
const ReactDOM = require('react-dom')

const root = document.createElement('div')
document.body.appendChild(root)

const App = () => {
  const [page, setPage] = useState(null)

  function loadHome() {
    import('./Home').then((module) => {
      setPage(module.default)
    })
  }

  function loadAbout() {
    import('./About').then((module) => {
      setPage(module.default)
    })
  }

  return <div>
    <button onClick={() => loadHome()}>加载Home</button>
    <button onClick={() => loadAbout()}>加载About</button>
    {
      page ? page : null
    }
  </div>
}

ReactDOM.render(<App />, root)
