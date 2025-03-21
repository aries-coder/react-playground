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
  IMPORT_MAP_FILE_NAME,
  TS_CONFIG_NAME
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
  const [creating, setcreating] = useState(false)

  const tabs = Object.keys(files).filter(
    fileName =>
      fileName !== IMPORT_MAP_FILE_NAME &&
      fileName !== TS_CONFIG_NAME
  )
  console.log(tabs)

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    TS_CONFIG_NAME
  ]
  const fixedFileNames = [
    IMPORT_MAP_FILE_NAME,
    TS_CONFIG_NAME
  ]

  const handleEditComplate = (
    name: string,
    prevName: string
  ) => {
    setcreating(false)

    if (!name || name === prevName) return
    const exitFile = tabs.includes(name)
    if (exitFile) {
      window.postMessage({
        type: 'error',
        content: `文件名: ${name} 已存在`
      })
      return
    }

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

  const renderTab = (
    tab: string,
    index: number,
    source: string[]
  ) => (
    <FileNameListItem
      key={tab}
      readonly={readonlyFileNames.includes(tab)}
      creating={
        creating && index === source.length - 1
      }
      value={tab}
      actived={tab === selectedFileName}
      onClick={() => setSelectedFileName(tab)}
      onEditComplate={name =>
        handleEditComplate(name, tab)
      }
      onRemove={e => {
        e.stopPropagation()
        handleRemove(tab)
      }}
    />
  )

  useEffect(() => {
    console.log(files)

    return () => {}
  }, [files])

  return (
    <div className="h-8 flex justify-between items-center bg-[var(--bg-color)] border-b border-[var(--border-color)]">
      <div className="flex overflow-auto">
        {tabs.map((tab, index) =>
          renderTab(tab, index, tabs)
        )}
        <div
          className="cursor-pointer"
          onClick={addTab}
        >
          +
        </div>
      </div>
      <div className="flex">
        {fixedFileNames.map((tab, index) =>
          renderTab(tab, index, fixedFileNames)
        )}
      </div>
    </div>
  )
}
