

const TimeLine = (props: {
  when: string,
  where: string,
  what: string[]
}) => {
  const { when, where, what } = props
  return (
    <div
      className="time-line shrink-0 min-w-[200px] max-w-[66.6%] sm:max-w-[50%] flex flex-col even:flex-col-reverse  "
    >

      <div className="h-[150px] sm:h-[200px] p-2 flex flex-col justify-center overflow-hidden ">
        <div className="border-2 rounded-xl p-2 bg-gray-50">
          {what.map(item =>
            <p className=" w-full max-h-full overflow-auto">。{item}</p>
          )}
        </div>
      </div>

      <div className=" relative">
        <span className="circle bg-gray-500 before:bg-gray-500 after:border-l-4 after:border-gray-500 flex flex-col-reverse after:border-dotted " />
        <span className=" absolute inset-y-1/2 -translate-y-1/2 w-full h-1 bg-gray-500"></span>
      </div>

      <div className="time-point h-[150px] sm:h-[200px] py-6 px-6 text-center italic ">
        <p>{when}</p>
        <p>{where}</p>
      </div>

    </div>
  )
}
export default TimeLine