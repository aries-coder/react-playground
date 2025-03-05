import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import { useContext } from 'react'
import FileNameListItem from './FileNameListItem'

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    setSelectedFileName
    
  } = useContext(PlaygroundContext)
  const tabs = Object.keys(files)

  return (
    <div className="h-8 flex items-center overflow-auto">
      {tabs.map((tab, index) => {
        return (
          <FileNameListItem
            key={tab + index}
            name={tab}
            actived={tab === selectedFileName}
            onClick={() =>
              setSelectedFileName(tab)
            }
          />
        )
      })}
    </div>
  )
}
