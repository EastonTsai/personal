
const Modal = (props: {
  title: string,
  onClick: (boolean: boolean) => void,
}) => {
  const { title, onClick } = props
  return (
    <div className=" fixed w-screen h-screen top-0 left-0 z-50 bg-white/[.9]">
      <div className=" w-2/3 max-w-xl mx-auto mt-40 bg-gray-100 px-8 py-20 shadow-lg">
        <h2 className=" font-bold text-4xl mb-8 text-center">{title}</h2>
        <div className=" flex gap-10 justify-center">

          <button
            className=" py-2 px-4 bg-gray-200 hover:bg-gray-500 transition-inset"
            onClick={() => onClick(true)}
          >確定</button>
          <button
            className=" py-2 px-4 bg-gray-200 hover:bg-gray-500 transition-inset"
            onClick={() => onClick(false)}
          >取消</button>
        </div>
      </div>
    </div>
  )
}
export default Modal