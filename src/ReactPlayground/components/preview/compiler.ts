import { ENTRY_FILE_NAME } from '@/ReactPlayground/files'
import {
  Files,
  File
} from '@/ReactPlayground/PlaygroundContext'
import { transform } from '@babel/standalone'
import type { PluginObj } from '@babel/core'

function getModuleFile(
  files: Files,
  modulePath: string
) {
  let moduleName =
    modulePath.split('./').pop() || ''
  if (!moduleName.includes('.')) {
    const realName = Object.keys(files)
      .filter(key => {
        return (
          key.endsWith('.ts') ||
          key.endsWith('.tsx') ||
          key.endsWith('.js') ||
          key.endsWith('.jsx')
        )
      })
      .find(key =>
        key.split('.').includes(moduleName)
      )
    if (realName) {
      moduleName = realName
    }
  }

  return files[moduleName]
}

function css2Js(file: File) {
  const randomId = Date.now()
  const js = `
    const styleSheet = document.createElement('style')
    styleSheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(styleSheet)
    const styles = document.createTextNode(\`${file.value}\`)
    styleSheet.innerHTML = ''
    styleSheet.appendChild(styles)
  `
  return URL.createObjectURL(
    new Blob([js], {
      type: 'application/javascript'
    })
  )
}

function json2Js(file: File) {
  const js = `export default ${file.value}`

  return URL.createObjectURL(
    new Blob([js], {
      type: 'application/javascript'
    })
  )
}

export const beforeTransformCode = (
  filename: string,
  code: string
) => {
  let _code = code
  const regexReact = /import\s+React/g
  if (
    (filename.endsWith('.jsx') ||
      filename.endsWith('.tsx')) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

export const babelTransform = (
  fileName: string,
  code: string,
  files: Files
) => {
  const _code = beforeTransformCode(
    fileName,
    code
  )
  let result = ''

  try {
    result = transform(_code, {
      filename: fileName,
      presets: ['react', 'typescript'],
      plugins: [customResolver(files)],
      retainLines: true
    }).code!

    return result
  } catch (error) {
    console.error(error)
  }
}

function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(
            files,
            modulePath
          )
          if (!file) return

          switch (file.name.split('.').pop()) {
            case 'css':
              path.node.source.value =
                css2Js(file)
              break
            case 'json':
              path.node.source.value =
                json2Js(file)
              break
            default:
              path.node.source.value =
                URL.createObjectURL(
                  new Blob(
                    [
                      babelTransform(
                        file.name,
                        file.value,
                        files
                      )!
                    ],
                    {
                      type: 'application/javascript'
                    }
                  )
                )
              break
          }
        }
      }
    }
  }
}

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(
    main.name,
    main.value,
    files
  )
}
