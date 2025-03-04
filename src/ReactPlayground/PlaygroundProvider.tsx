import {
  PropsWithChildren,
  useState
} from 'react'
import {
  Files,
  PlaygroundContext
} from './PlaygroundContext'
import { fileName2Language } from '@/utils'

export default function PlaygroundProvider(
  props: PropsWithChildren
) {
  const { children } = props
  const [files, setFiles] = useState<Files>({})
  const [selectedFileName, setSelectedFileName] =
    useState('App.tsx')

  const addFile = (fileName: string) => {
    files[fileName] = {
      name: fileName,
      value: '',
      language: fileName2Language(fileName)
    }

    setFiles({ ...files })
  }
  const removeFile = (fileName: string) => {
    delete files[fileName]

    setFiles({ ...files })
  }
  const updateFileName = (
    oldFieldName: string,
    newFieldName: string
  ) => {
    if (
      !files[oldFieldName] ||
      newFieldName === undefined ||
      newFieldName === null
    )
      return
    const { [oldFieldName]: value, ...rest } =
      files
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName
      }
    }
    setFiles({
      ...rest,
      ...newFile
    })
  }

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        setFiles,
        selectedFileName,
        setSelectedFileName,
        addFile,
        removeFile,
        updateFileName
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
