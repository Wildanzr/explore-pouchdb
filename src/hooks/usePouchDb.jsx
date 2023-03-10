import { useMemo, useEffect, useState } from 'react'
import PouchDb from 'pouchdb-browser'

// Define remote url with username and password
const REMOTE_URL = 'http://admin:secret@couchdb.wildanzr.my.id/reading_lists'

export const usePouchDB = () => {
  // DB States
  const [alive, setAlive] = useState(false)

  // Memoize local and remote db
  const [localDb, remoteDb] = useMemo(
    () => [
      new PouchDb('reading_lists'),
      new PouchDb(REMOTE_URL)
    ], []
  )

  // Check if remote db is alive when first time
  useEffect(() => {
    const cancelInterval = setInterval(() => {
      remoteDb.info()
        .then(() => setAlive(true))
        .catch(() => setAlive(false))
    }, 1000)

    return () => clearInterval(cancelInterval)
  }, [remoteDb])

  // Sync local and remote db
  useEffect(() => {
    const canceller = localDb.sync(remoteDb, {
      live: true,
      retry: true
    })

    return () => canceller.cancel()
  }, [localDb, remoteDb])

  return {
    db: localDb,
    alive
  }
}
