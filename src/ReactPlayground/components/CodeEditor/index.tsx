import { memo } from 'react'
import FileNameList from './FileNameList'
import Editor, { IEditorFileType } from './Editor'

const CodeEditor = memo(() => {
  const file: IEditorFileType = {
    name: 'index.tsx',
    value: `import { memo } from 'react'`,
    language: 'typescript'
  }

  const onChange = (
    value: string | undefined
  ) => {
    console.log(value)
  }

  return (
    <div className="h-full bg-amber-200">
      <FileNameList />
      <Editor file={file} onChange={onChange} />
    </div>
  )
})

export default CodeEditor
