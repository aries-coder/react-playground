import Logo from '@/assets/images/react.svg'
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import { downloadFiles } from '@/utils/downloadFiles'
import {
  SunOutlined,
  MoonOutlined,
  BranchesOutlined,
  DownloadOutlined
} from '@ant-design/icons'
import { message } from 'antd'
import { useContext } from 'react'

export default function Header() {
  const { theme, setTheme, files } = useContext(
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
      <div className="text-3xl space-x-3">
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
        <span
          className="cursor-pointer"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                window.location.href
              )
              message.success('分享链接复制成功')
            } catch {
              message.success('分享链接复制失败')
            }
          }}
        >
          <BranchesOutlined />
        </span>
        <span
          onClick={async () => {
            await downloadFiles(files)
            message.success('下载完成')
          }}
        >
          <DownloadOutlined />
        </span>
      </div>
    </div>
  )
}
