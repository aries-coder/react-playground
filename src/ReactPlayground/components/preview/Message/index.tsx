import { memo, useEffect, useState } from 'react'

export interface IMessageProps {
  type: 'error' | 'warn'
  content: string
}

const Message = memo((props: IMessageProps) => {
  const { type, content } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!content)
  }, [content])

  return visible ?
      <div
        className={`p-2.5 w-[95%] rounded-2xl ${type === 'error' ? 'text-[#f56c6c] bg-[#fef0f0] border-[#f56c6c]' : 'text-[#e6a23a] bg-[#fdf6ec]'} overflow-auto h-[300px] absolute bottom-4 left-1/2 translate-x-[-50%]`}
      >
        <pre
          dangerouslySetInnerHTML={{
            __html: content
          }}
          className="p-4 whitespace-break-spaces"
        ></pre>
        <span
          className={`absolute right-2 top-2 w-6 h-6 ${type === 'error' ? 'bg-[#f56c6c] text-[#f0f0f0]' : 'bg-[#e6a23a] text-[#fdf6ec]'} text-center rounded-2xl cursor-pointer select-none`}
          onClick={() => setVisible(false)}
        >
          x
        </span>
      </div>
    : null
})

export default Message
