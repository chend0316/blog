const immer = require('immer')

const person = {
  name: 'zhang',
  age: 18,
  arr: ['a', 'b', 'c']
}

const person2 = immer.produce(person, (personProxy) => {
  personProxy.name = 'li'
  personProxy.arr[2] = 'd'
  personProxy.arr.push('e')
})
console.log(person)
console.log(person2)
