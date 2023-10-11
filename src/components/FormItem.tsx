
export const FormInput = (props: {
  type?: string,
  title: string,
  value: string,
  defaultValue?: string,
  placeholder: string,
  onChange: (value: string) => void,
  onEnter?: () => void,
}) => {
  const { type, title, value, defaultValue, placeholder, onChange, onEnter } = props

  return (
    <div className="form-item-wrap">
      <label
        htmlFor={title}
        className=""
      >{title} :</label>
      <input
        id={title}
        type={type ? type : 'text'}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter && onEnter()}
      />
    </div>
  )
}
export const FormSelect = (props: {
  title: string,
  options: string[],
  value: string,
  onChange: (value: string) => void,
}) => {
  const { title, options, value, onChange } = props
  return (
    <div className="form-item-wrap">
      <label>{title} :</label>
      <select
        className=" bg-gray-100 py-2 px-4 grow outline-none flex-none"
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {
          options.map(option =>
            <option
              key={option}
              value={option}
            >{option}</option>)
        }

      </select>
    </div>
  )
}
export const FormTextarea = (props: {
  title: string,
  content: string,
  onChange: (value: string) => void,
}) => {
  const { title, content, onChange } = props
  return (
    <div className="">
      <label>{title}:</label>
      <textarea
        className=" w-full h-60 py-2 ps-4 bg-gray-100 outline-none"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      >

      </textarea>
    </div>
  )
}
export const FormFile = (props: {
  title: string,
  onChange: (files: FileList | null) => void
}) => {
  const { title, onChange } = props

  return (
    <div>
      <label htmlFor={title}>{title} :</label>
      <input
        type="file"
        accept=".jpg,.png"
        id={title}
        className=" hidden"
        onChange={(e) => onChange(e.target.files)}
      />
    </div>
  )
}