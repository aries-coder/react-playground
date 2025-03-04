import { memo, useContext } from 'react'
import FileNameList from './FileNameList'
import Editor from './Editor'
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import { debounce } from 'lodash-es'

const CodeEditor = memo(() => {
  const { files, selectedFileName, setFiles } =
    useContext(PlaygroundContext)

  const file = files[selectedFileName]

  const onChange = (
    value: string | undefined
  ) => {
    files[file.name].value = value!
    setFiles({ ...files })
  }
  console.log(file)

  return (
    <div className="h-ful">
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce(onChange, 500)}
      />
    </div>
  )
})

export default CodeEditor
