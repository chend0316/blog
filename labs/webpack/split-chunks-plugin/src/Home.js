const React = require('react')
import { add } from './math'

const Home = () => {
  return <h1>Home {add(3, 4)}</h1>
}

export default Home
