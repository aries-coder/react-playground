import Logo from '@/assets/images/react.svg'

export default function Header() {
  return (
    <div className="h-14 flex justify-between items-center px-2 border-b border-gray-300">
      <div className="flex">
        <img src={Logo} alt="" />
        <span className="text-2xl m-1">
          React Playground
        </span>
      </div>
      {/* <div>2</div> */}
    </div>
  )
}
