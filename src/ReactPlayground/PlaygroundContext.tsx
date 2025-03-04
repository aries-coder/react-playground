import { createContext } from 'react'

export interface File {
  name: string
  value: string
  language: string
}

export interface Files {
  [key: string]: File
}

export interface IPlaygroundContextType {
  files: Files
  selectedFileName: string
  setSelectedFileName: (name: string) => void
  addFile: (fileName: string) => void
  removeFile: (fileName: string) => void
  updateFileName: (
    oldFieldName: string,
    newFieldName: string
  ) => void
  setFiles: (files: Files) => void
}

export const PlaygroundContext =
  createContext<IPlaygroundContextType>(
    {} as IPlaygroundContextType
  )
