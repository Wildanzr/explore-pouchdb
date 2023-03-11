import { useState, useEffect } from 'react'

import { Table, Button, Checkbox } from 'antd'

export default function Todos (props) {
  // Props destructuring
  const { handleRemoveElement, handleToggleRead, documents } = props

  // Local states
  const [todos, setTodos] = useState([])

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Todo',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="w-full flex flex-row space-x-8 items-center">
          <Checkbox
            checked={record.read}
            onChange={() => handleToggleRead(record)}
          />
          <Button type="primary" onClick={() => handleRemoveElement(record)} danger>
            Delete
          </Button>
        </div>
      )
    }
  ]

  const mapTodos = documents.map((todo, index) => {
    return {
      no: index + 1,
      ...todo
    }
  })

  useEffect(() => {
    const sortedTodos = mapTodos.sort((a, b) => a.no - b.no)
    console.log(sortedTodos)
    setTodos(sortedTodos)
  }, [documents])
  return (
    <div className="w-1/3 flex flex-col items-center justify-center">
      <Table
        columns={columns}
        dataSource={todos}
        pagination={false}
        className="w-full"
      />
    </div>
  )
}
