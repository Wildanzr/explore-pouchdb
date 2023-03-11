import { useEffect } from 'react'
import { usePouchDB } from './hooks/usePouchDb'
import { useReadingList } from './hooks/useReadingList'

import { Header, AliveOrNot, Todos, AddTodo } from './components'

import { nanoid } from 'nanoid'

export default function App () {
  const { db, alive } = usePouchDB()
  const { documents } = useReadingList(db, alive)

  const handleAddElement = (name) => {
    // post sends a document to the database and generates the unique ID for us
    db.post({
      _id: `rl-${new Date().getTime()}-${nanoid()}`,
      name,
      read: false
    })
  }

  const handleRemoveElement = (element) => {
    db.remove(element)
  }

  const handleToggleRead = (element) => {
    db.put({
      ...element,
      read: !element.read
    })
  }

  // Reorder styles between antd and tailwindcss
  useEffect(() => {
    const reorderTailwind = () => setTimeout(() => {
      const head = document.querySelector('head')
      const tailWindStyleTag = [...head.querySelectorAll('style')].find((style) =>
        style.innerHTML.includes('tailwind')
      )
      head.insertAdjacentElement('afterbegin', tailWindStyleTag)
    }, 5000)

    reorderTailwind()
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-between space-y-4">
      <AliveOrNot />
      <Header />
      <AddTodo handleAddElement={handleAddElement} />
      <Todos
        handleRemoveElement={handleRemoveElement}
        handleToggleRead={handleToggleRead}
        documents={documents}
      />
    </div>
  )
}
