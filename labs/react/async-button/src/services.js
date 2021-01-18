function sleep(time=0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

export async function login() {
  await sleep(1000)
}

let users = [
  {
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export async function getAllUsers() {
  await sleep(1000)
  return users
}

export async function deleteUser(id) {
  await sleep(1000)
  const idx = users.findIndex(user => user.id === id)
  if (idx === -1) {
    return false
  } else {
    const { [idx]: tmp, ...rest} = users
    users = Object.values(rest)
    return true
  }
}
