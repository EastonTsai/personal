
const BasicInformation = (props: {
  title: string,
  content: string
}) => {
  const { title, content } = props

  return (
    <li className=" flex items-center p-2 relative">
      <h3 className=" shrink-0">{title}:</h3>
      <div className=" w-full ">
        <div className=" font-bold text-xl absolute sm:relative top-0 left-0 w-full h-full text-center sm:text-left p-2">
          {content}
        </div>
      </div>
    </li>
  )
}
export default BasicInformation