import { useState, useEffect } from 'react'

export const useReadingList = (db, isReady) => {
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState([])

  // Fetch documents from db
  const fetchDocument = async () => {
    try {
      setLoading(true)
      const doc = await db.allDocs({
        include_docs: true
      })

      // Set result
      setLoading(false)
      setDocuments(doc.rows.map((row) => row.doc))
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch documents in first time
  useEffect(() => {
    fetchDocument()

    const canceller = db.changes({
      since: 'now',
      live: true
    }).on('change', () => fetchDocument())

    return () => canceller.cancel()
  }, [db])

  return {
    loading,
    documents
  }
}
