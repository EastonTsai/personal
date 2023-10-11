import { FormSelect, FormInput, FormTextarea } from "./FormItem"
import { useState, useEffect } from 'react'
import { getOneDatabase, setDatabase } from "utils/firebase"
// import { getFirestoreCollection, setDatabase } from "utils/firebase"

const EditPersonal = () => {
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [current, setCurrent] = useState('')
  const [introduction, setIntroduction] = useState('')

  useEffect(() => {
    (async () => {
      const data = await getOneDatabase('personal', 'easton')
      if (data) {
        setName(data.name)
        setState(data.state)
        setCurrent(data.current)
        setIntroduction(data.introduction)
      }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await setDatabase(name, state, current, introduction)
    if (res) {
      alert('修改完成')
    }
  }

  return (
    <div className=" flex-none w-full">
      <div className=" wrap-90 max-w-[720px] py-8">
        <form
          className=" flex flex-col gap-y-6"
          onSubmit={handleSubmit}
        >
          <FormInput
            title='姓名'
            value={name}
            placeholder='請輸入姓名'
            onChange={(value) => setName(value)}
          />
          <FormSelect
            title='狀態'
            options={['積極求職中', '在職中', '待業中']}
            value={state}
            onChange={(value) => setState(value)}
          />

          <FormInput
            title='現職'
            value={current}
            placeholder='請輸入現任職務'
            onChange={(value) => setCurrent(value)}
          />
          <FormTextarea
            title='自我介紹'
            content={introduction}
            onChange={(value) => setIntroduction(value)}
          />
          <div>
            <button
              className="form-button">儲存</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default EditPersonal