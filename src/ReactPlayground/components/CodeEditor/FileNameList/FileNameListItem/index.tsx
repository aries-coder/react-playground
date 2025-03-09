import {
  memo,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react'

interface FileNameListItemProps {
  value: string
  actived: boolean
  creating: boolean
  readonly: boolean
  onClick: () => void
  onEditComplate?: (name: string) => void
  onRemove?: MouseEventHandler
}

const FileNameListItem = memo(
  (props: FileNameListItemProps) => {
    const {
      value,
      onClick,
      actived,
      creating,
      readonly,
      onEditComplate,
      onRemove
    } = props
    const [editing, setEditing] =
      useState(creating)
    const [name, setName] = useState(value)
    const inputRef =
      useRef<HTMLInputElement>(null)

    const handleDoubleClick = () => {
      setEditing(true)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }

    const handleOnBlur = () => {
      setEditing(false)
      onEditComplate?.(name)
    }

    useEffect(() => {
      inputRef.current?.focus()
    }, [creating])

    return (
      <div
        className={`mx-2 cursor-pointer text-nowrap ${actived ? 'text-blue-500 border-b-2' : 'text-[var(--text-color)]'}`}
        onClick={onClick}
      >
        {editing ?
          <input
            type="text"
            value={name}
            ref={inputRef}
            onBlur={handleOnBlur}
            onChange={e =>
              setName(e.target.value)
            }
            className="bg-gray-100 outline-0"
          />
        : <>
            <span
              onDoubleClick={
                !readonly ?
                  handleDoubleClick
                : () => {}
              }
              className="select-none"
            >
              {name}
            </span>
            {!readonly && (
              <span
                className="mx-2 text-gray-500"
                onClick={onRemove}
              >
                x
              </span>
            )}
          </>
        }
      </div>
    )
  }
)

export default FileNameListItem
