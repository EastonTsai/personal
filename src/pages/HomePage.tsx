
import BasicInformation from "components/BasicInformation"
import Header from "components/Header"
import SampleCard from "components/SampleCard"
import TimeLine from "components/TimeLine"
import { useState, useEffect } from 'react'
import { getDatabase } from 'utils/firebase'
import myPhone from 'files/pictures/126717.jpg'

const HomePage = () => {
  const [personal, setPersonal] = useState<any>(null)
  const [sampleCards, setSampleCards] = useState<any[]>([])
  const [experience, setExperience] = useState<any[]>([])

  useEffect(() => {
    const getPersonal = async () => {
      const res = await getDatabase('personal')
      if (res) {
        setPersonal(res[0])
      }
    }
    const getSampleCards = async () => {
      const res = await getDatabase('portfolio')
      if (res) {
        setSampleCards(res)
      }
    }
    const getExperience = async () => {
      const res = await getDatabase('experience')
      if (res) {
        res.sort(function (a, b) {
          var dateA: any = new Date(a.date);
          var dateB: any = new Date(b.date);
          return dateA - dateB;
        })
        setExperience(res)
      }
    }
    getPersonal()
    getSampleCards()
    getExperience()
  }, [])
  return (
    <div className="container-default" >
      <Header />
      <main>
        <section className="sm:flex ">
          <ul className=" shrink-0 even:[&>]:bg-gray-200 odd:[&>]:bg-gray-50 border-b-2">
            <BasicInformation title='姓名' content={personal?.name} />
            <BasicInformation title='姓別' content={'男'} />
            <BasicInformation title='狀態' content={personal?.state} />
            <BasicInformation title='現職' content={personal?.current} />
            <BasicInformation title='工作經歷' content={'超過10年'} />
            <BasicInformation title='相關經驗' content={'無實務經歷'} />
            <BasicInformation title='年齡' content={'40'} />
            <BasicInformation title='學歷' content={'高職'} />
          </ul>
          <div className=" py-4 px-8 grow bg-gray-400">
            <div className='max-w-2xl mx-auto text-white flex flex-col h-full justify-center'>
              <p className="pb-2 font-black text-2xl mx-auto whitespace-pre-line">
                {personal?.introduction}
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-4 px-2">
          <div className="mb-4 border-b-2 sm:text-center font-bold">作品集...</div>
          <div className="flex gap-2 ">
            {sampleCards?.map(card =>
              <SampleCard
                key={card.id}
                id={card.id}
                link={card.link}
                title={card.title}
                picture={card.imageUrl}
                content={card.introduce}
                feature={card.features}
                about={card.technology}
              />
            )}
          </div>
        </section>
        <section className="py-4 px-2">
          <div className="mb-4 border-b-2 sm:text-center font-bold">工作經歷...</div>
          <div className="flex overflow-x-scroll">
            {experience?.map(ex =>
              <TimeLine
                key={ex.date}
                when={ex.date}
                where={ex.company}
                what={ex.achievementList}
              />
            )}
          </div>
        </section>
      </main>
      <footer className="bg-gray-600 px-4 py-8">
        <div className="max-w-3xl mx-auto sm:flex text-center sm:text-start gap-4 text-white">
          <div className=" sm:w-1/2 py-4 ">
            <div className="[&>p]:pl-4">
              <h2 className=" font-black text-[1.25rem] mb-4" >相關技術經驗:</h2>
              <p>HTML, Css, JavaScript</p>
              <p>Sass/Scss</p>
              <p>Tailwind Css</p>
              <p>Axios</p>
            </div>
            <div className="pt-4 [&>p]:pl-4">
              <h2 className=" font-black text-[1.25rem] mb-4" >相關框架經驗:</h2>
              <p>React</p>
            </div>
          </div>
          <div className=" sm:w-1/2 py-4 [&>p]:pl-4">
            <h2 className=" font-black text-[1.25rem] mb-4" >網頁製作:</h2>
            <p>蔡營歆 (Easton)</p>
            <div className=" max-w-[10rem] mx-auto py-4">
              <img src={myPhone} alt="" />
            </div>
          </div>
        </div>
        <div className=" text-white text-center">

          <h2 className="pt-4">連絡方式:</h2>
          <p>Email: eastontsai.te@gmail.com</p>
        </div>
      </footer>

    </div>
  )
}
export default HomePage

