import { Files } from './PlaygroundContext'
import importMap from './template/import-map.json?raw'
import App from './template/App?raw'
import AppCss from './template/App.css?raw'
import main from './template/main?raw'
import { fileName2Language } from '@/utils'

export const APP_COMPONENT_FILE_NAME = 'App.tsx'
export const IMPORT_MAP_FILE_NAME =
  'import-map.json'
export const ENTRY_FILE_NAME = 'main.tsx'

export const initFiles: Files = {
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    value: App,
    language: fileName2Language(
      APP_COMPONENT_FILE_NAME
    )
  },
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    value: main,
    language: fileName2Language(ENTRY_FILE_NAME)
  },
  ['App.css']: {
    name: 'App.css',
    value: AppCss,
    language: fileName2Language('App.css')
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    value: importMap,
    language: fileName2Language(
      IMPORT_MAP_FILE_NAME
    )
  }
}
