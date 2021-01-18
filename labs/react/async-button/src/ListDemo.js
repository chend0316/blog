import React from 'react'
import { Table } from 'antd'
import { getAllUsers, deleteUser } from './services'
import AsyncButton from './AsyncButton'

class ListDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: false
    }

    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <AsyncButton onClick={() => this.handleDeleteUser(record.id)}>Delete</AsyncButton>
        ),
      },
    ]
  }

  async componentDidMount() {
    await this.fetchData()
  }

  async fetchData() {
    this.setState({ loading: true })
    const users = await getAllUsers()
    this.setState({ users, loading: false })
  }

  async handleDeleteUser(id) {
    await deleteUser(id)
    this.fetchData()
  }

  render() {
    return <Table
      columns={this.columns}
      dataSource={this.state.users}
      loading={this.state.loading}
      rowKey="id"
    />
  }
}

export default ListDemo
