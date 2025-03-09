import Logo from '@/assets/images/react.svg'
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import {
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons'
import { useContext } from 'react'

export default function Header() {
  const { theme, setTheme } = useContext(
    PlaygroundContext
  )

  return (
    <div className="h-14 flex justify-between items-center px-2 border-b bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--border-color)]">
      <div className="flex">
        <img src={Logo} alt="" />
        <span className="text-2xl m-1">
          React Playground
        </span>
      </div>
      <div className="text-3xl">
        <span
          className="cursor-pointer"
          onClick={() =>
            setTheme(
              theme === 'dark' ? 'light' : 'dark'
            )
          }
        >
          {theme === 'light' ?
            <MoonOutlined />
          : <SunOutlined />}
        </span>
      </div>
    </div>
  )
}
