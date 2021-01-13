const React = require('react')
import { add } from './math'

const About = () => {
  return <h1>About us {add(3, 4)}</h1>
}

export default About
