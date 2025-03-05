import {
  useContext,
  useEffect,
  useState
} from 'react'
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import { compile } from './compiler'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '@/ReactPlayground/files'

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] =
    useState('')
  const [iframeUrl, setIframeUrl] = useState('')
  const importMapFileValue =
    files[IMPORT_MAP_FILE_NAME].value

  useEffect(() => {
    const res = compile(files)!
    setCompiledCode(res)
  }, [files])

  useEffect(() => {
    function getIframeUrl() {
      const code = iframeRaw
        .replace(
          `<script type="importmap"></script>`,
          `<script type="importmap">${importMapFileValue}</script>`
        )
        .replace(
          `<script type="module" id="appSrc"></script>`,
          `<script type="module" id="appSrc">${compiledCode}</script>`
        )
      return URL.createObjectURL(
        new Blob([code], {
          type: 'text/html'
        })
      )
    }
    setIframeUrl(getIframeUrl())
  }, [importMapFileValue, compiledCode])

  return (
    <div className="h-full">
      {iframeUrl && (
        <iframe
          className="w-full h-full"
          src={iframeUrl}
        ></iframe>
      )}
    </div>
  )
}
