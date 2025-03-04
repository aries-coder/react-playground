import { Allotment } from 'allotment'
import Header from './components/Header'
import CodeEditor from './components/CodeEditor'
import Preview from './components/preview'

import 'allotment/dist/style.css'

export default function ReactPlayground() {
  return (
    <div className="w-screen h-scree">
      <Header />
      <div className="w-screen h-[calc(100vh-56px)]">
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={500}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane minSize={500}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}
