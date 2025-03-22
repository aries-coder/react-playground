import { Files } from '@/ReactPlayground/PlaygroundContext'
import JSZip from 'jszip'

export async function downloadFiles(
  files: Files
) {
  const zip = new JSZip()

  Object.keys(files).forEach(name => {
    zip.file(name, files[name].value)
  })

  const blob = await zip.generateAsync({
    type: 'blob'
  })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `code${Math.random().toString().slice(2, 8)}`

  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  URL.revokeObjectURL(url)
}
