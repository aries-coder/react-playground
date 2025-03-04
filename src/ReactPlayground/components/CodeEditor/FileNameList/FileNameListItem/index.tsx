import { memo } from 'react'

interface FileNameListItemProps {
  name: string
  onClick: () => void
  actived: boolean
}

const FileNameListItem = memo(
  (props: FileNameListItemProps) => {
    const { name, onClick, actived } = props
    return (
      <div
        className={`mx-2 cursor-pointer text-nowrap ${actived ? 'text-blue-500 border-b-2' : 'text-gray-500'}`}
        onClick={onClick}
      >
        {name}
      </div>
    )
  }
)

export default FileNameListItem
