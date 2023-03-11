import { usePouchDB } from '../hooks/usePouchDb'
import { Alert } from 'antd'

const RenderMessage = ({ msg }) => {
  return (
    <div className="w-full h-full">
      <p className="w-32 text-xs">{msg}</p>
    </div>
  )
}

export default function AliveOrNot () {
  // PouchDB
  const { alive } = usePouchDB()
  return (
    <div className="w-full flex absolute flex-col items-end justify-end bottom-0 right-0">
      <Alert
        message={alive ? 'Online' : 'Offline'}
        type={alive ? 'success' : 'error'}
        showIcon
        description={
          alive
            ? <RenderMessage msg='The connection with the database is established' />
            : <RenderMessage msg='The connection with the database has been lost, you can still work on your documents, we will sync everything once the connection is re-established.' />
        }
      />
    </div>
  )
}
