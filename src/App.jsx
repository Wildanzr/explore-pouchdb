import { useEffect } from 'react'
import { usePouchDB } from './hooks/usePouchDb'
import { useReadingList } from './hooks/useReadingList'

import { AddReadingElement, Header, AliveOrNot } from './components'

export default function App () {
  const { db, alive } = usePouchDB()
  const { documents } = useReadingList(db, alive)

  const handleAddElement = (name) => {
    // post sends a document to the database and generates the unique ID for us
    db.post({
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
    <div className="w-full h-screen relative flex flex-col items-center justify-start space-y-4">
      <Header />
      <div>
        {documents.length
          ? (
          <ul>
            {documents.map((doc) => (
              <li key={doc._id}>{doc.name}</li>
            ))}
          </ul>
            )
          : (
          <div>No books to read added, yet</div>
            )}
      </div>

      {documents.length
        ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>
              <input
                type="checkbox"
                checked={doc.read}
                onChange={() => handleToggleRead(doc)}
                id={doc._id}
              />
              <label htmlFor={doc._id}>{doc.name}</label>
              <button onClick={() => handleRemoveElement(doc)}>Delete</button>
            </li>
          ))}
        </ul>
          )
        : (
        <div>No books to read added, yet</div>
          )}

      <AddReadingElement handleAddElement={handleAddElement} />
      <AliveOrNot />
    </div>
  )
}
