import { useState } from 'react'

export default function AddReadingElement ({ handleAddElement }) {
  const [currentName, setCurrentName] = useState('')

  const addBook = () => {
    if (currentName) {
      // If the currentName has data, clear it and add a new element.
      handleAddElement(currentName)
      setCurrentName('')
    }
  }

  return (
    <div>
      <h2>Add a new book to read</h2>
      <label htmlFor="new_book">Book name</label>
      <input
        type="text"
        id="new_book"
        value={currentName}
        onChange={(event) => setCurrentName(event.target.value)}
      />
      <button onClick={addBook}>Add</button>
    </div>
  )
}
