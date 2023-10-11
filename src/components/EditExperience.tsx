import react from 'react'
import { FormInput } from './FormItem'
import { db } from 'utils/firebase'

const EditExperience = () => {
  const [date, setDate] = react.useState('')
  const [company, setCompany] = react.useState('')
  const [achievement, setAchievement] = react.useState('')
  const [achievementList, setAchievementList] = react.useState<string[]>([])
  const [error, setError] = react.useState('')

  const handleAddAchievement = () => {
    if (achievement.trim().length > 1) {
      setAchievementList(prev => [...prev, achievement])
      setAchievement('')
    }
  }
  const handleDeleteAchievement = (achievement: string) => {
    setAchievementList(achievementList.filter(ac => ac !== achievement))
  }
  const handleAddExperience = async () => {
    if (
      date.trim().length < 1 ||
      company.trim().length < 1 ||
      achievementList.length < 1
    ) {
      setError('輸入錯誤')
      return
    }
    const res = await db.collection('experience').add({
      date,
      company,
      achievementList
    })
    if (res) {
      alert('儲存成功')
      setDate('')
      setCompany('')
      setAchievementList([])
    }
  }

  return (
    <div className=" flex-none w-full">
      <div className="wrap-90 max-w-[720px] py-8 flex flex-col gap-y-6">
        <FormInput
          type='month'
          title='時間'
          value={date}
          placeholder=''
          onChange={(value) => setDate(value)}
        />

        <FormInput
          title='公司'
          value={company}
          placeholder='公司名稱'
          onChange={(value) => setCompany(value)}
        />
        <FormInput
          title='成就'
          value={achievement}
          placeholder='取得成就 or 工作內容'
          onChange={(value) => setAchievement(value)}
          onEnter={handleAddAchievement}
        />
        <div className='border p-2 flex flex-col gap-2 '>
          {achievementList.map(item =>
            <p key={item}>
              。{item}
              <span
                className=' ml-2 font-bold text-red-500 cursor-pointer'
                onClick={() => handleDeleteAchievement(item)}
              >X</span>
            </p>
          )}
        </div>
        {error.length > 1 && <p className=' text-center text-red-500'>{error}</p>}
        <div>
          <button
            className="form-button"
            onClick={handleAddExperience}
          >新增</button>
        </div>
      </div>
    </div>
  )
}
export default EditExperience