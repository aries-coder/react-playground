import '@ant-design/v5-patch-for-react-19'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './assets/css/index.css'

createRoot(
  document.getElementById('root')!
).render(<App />)
