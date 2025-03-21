import MonacoEditor, {
  OnMount,
  EditorProps
} from '@monaco-editor/react'
import { createATA } from './ata'
import { convertTsconfigToMonaco } from '@/utils'

export interface IEditorFileType {
  name: string
  value: string
  language: string
}

export interface IEditorPropsType {
  file: IEditorFileType
  theme: 'light' | 'dark'
  onChange?: EditorProps['onChange']
  options?: EditorProps['options']
  tsconfigRaw: string
}

export default function Editor(
  props: IEditorPropsType
) {
  const {
    file,
    onChange,
    options,
    theme,
    tsconfigRaw
  } = props

  const handleEditorMount: OnMount = (
    editor,
    monaco
  ) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      {
        ...convertTsconfigToMonaco(
          monaco,
          tsconfigRaw
        )
      }
    )

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      )
    })

    editor.onDidChangeModelContent(() => {
      console.log(editor.getValue())

      ata(editor.getValue())
    })

    ata(editor.getValue())
  }

  return (
    <div className="h-[calc(100vh-32px)]">
      <MonacoEditor
        key={file.name}
        theme={
          theme === 'dark' ? 'vs-dark' : theme
        }
        language={file.language}
        value={file.value}
        path={file.name}
        onMount={handleEditorMount}
        onChange={onChange}
        options={{
          // 设置不允许滚动到了最后一行依然可以滚动一屏
          scrollBeyondLastLine: false,
          // 设置 滚动条属性
          scrollbar: {
            verticalScrollbarSize: 6, // 垂直滚动条大小
            horizontalScrollbarSize: 6 // 水平滚动条大小
          },
          // 设置右上角不显示代码缩略图
          minimap: {
            enabled: false
          },
          ...options
        }}
      />
    </div>
  )
}
