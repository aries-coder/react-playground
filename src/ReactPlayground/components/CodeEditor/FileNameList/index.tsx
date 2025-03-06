import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import FileNameListItem from './FileNameListItem'
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME
} from '@/ReactPlayground/files'

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    addFile,
    setSelectedFileName,
    updateFileName,
    removeFile
  } = useContext(PlaygroundContext)
  const tabs = Object.keys(files)
  const [creating, setcreating] = useState(false)
  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
    IMPORT_MAP_FILE_NAME
  ]

  const handleEditComplate = (
    name: string,
    prevName: string
  ) => {
    if (!name || name === prevName) return

    updateFileName(prevName, name)
    setSelectedFileName(name)
  }
  const addTab = () => {
    addFile(
      `Comp${Math.random().toString().slice(2, 8)}.tsx`
    )
    setcreating(true)
  }
  const handleRemove = (name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }

  useEffect(() => {
    console.log(files)

    return () => {}
  }, [files])

  return (
    <div className="h-8 flex items-center overflow-auto">
      {tabs.map((tab, index) => {
        return (
          <FileNameListItem
            key={tab + index}
            readonly={readonlyFileNames.includes(
              tab
            )}
            creating={
              creating &&
              index === tabs.length - 1
            }
            value={tab}
            actived={tab === selectedFileName}
            onClick={() =>
              setSelectedFileName(tab)
            }
            onEditComplate={name =>
              handleEditComplate(name, tab)
            }
            onRemove={e => {
              e.stopPropagation()
              handleRemove(tab)
            }}
          />
        )
      })}
      <div
        className="cursor-pointer"
        onClick={addTab}
      >
        +
      </div>
    </div>
  )
}
