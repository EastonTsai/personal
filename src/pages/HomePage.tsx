
import personal_01 from 'files/pictures/Personal_01.png'
import login_register_page_01 from 'files/pictures/login_register_page_01.png'

import BasicInformation from "components/BasicInformation"
import Header from "components/Header"
import SampleCard from "components/SampleCard"
import TimeLine from "components/TimeLine"

const HomePage = () => {

  return (
    <div className="w-11/12 mx-auto max-w-7xl md:w-10/12 mt-4 md:mt-8 border border-gray-300 rounded-lg overflow-hidden" >
      <Header />
      <main>
        <section className="sm:flex ">
          <ul className=" shrink-0 even:[&>]:bg-gray-200 odd:[&>]:bg-gray-50 ">
            <BasicInformation title='姓名' content={['Easton', '蔡營歆']} />
            <BasicInformation title='狀態' content={['積極求職中']} />
            <BasicInformation title='現職' content={['美食外送員']} />
            <BasicInformation title='經歷' content={['自營商(餐飲)']} />
          </ul>
          <div className=" py-4 px-8 grow bg-gray-400">
            <div className='max-w-2xl mx-auto text-white flex flex-col h-full justify-center'>
              <p className=" font-black text-2xl">Hi!</p>
              <p className="pb-2 font-black text-2xl mx-auto">這裡是我的個人網頁 , 有關我的作品及經歷都在這裡</p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-4 px-2">
          <div className="mb-4 border-b-2 sm:text-center font-bold">作品集...</div>
          <div className="flex gap-2 ">
            <SampleCard
              link='/'
              title='個人網站'
              picture={personal_01}
              content='把個人資料及作品連結集中在這裡'
              feature={['RWD', '程式寫入資訊']}
              about={['React', 'Tailwind Css', 'TypeScript']}
            />
            <SampleCard
              link='https://eastontsai.github.io/login_register_page/'
              title='登入/註冊'
              picture={login_register_page_01}
              content='網頁必備登入頁面(含表單驗證)'
              feature={['前端驗證表單']}
              about={['React', 'Scss', 'TypeScript']}
            />

          </div>
        </section>
        <section className="py-4 px-2">
          <div className="mb-4 border-b-2 sm:text-center font-bold">工作經歷...</div>
          <div className="flex overflow-x-scroll">
            <TimeLine
              when='2015-10'
              where='餐飲店面(自營商)'
              what={['採買', '備料', '處理店面大小事']}
            />
            <TimeLine
              when='2021-02'
              where='FoodPanda'
              what={['機車外送餐點服務', '計畫路線']}
            />
            <TimeLine
              when='2023-04'
              where='ALPHA Camp'
              what={['結業', '前端專修', 'Twitter-前後端分離專案']}
            />
          </div>
        </section>
      </main>
      <footer className="bg-gray-600 px-4 py-8">
        <div className="max-w-3xl mx-auto flex gap-4 text-white">
          <div className=" w-1/2 ">
            <div className="[&>p]:pl-4">
              <h2>相關技術經驗:</h2>
              <p>HTML, Css, JavaScript</p>
              <p>Sass/Scss</p>
              <p>Tailwind Css</p>
              <p>Axios</p>
            </div>
            <div className="pt-4 [&>p]:pl-4">
              <h2>相關框架經驗:</h2>
              <p>React</p>
            </div>
          </div>
          <div className=" w=1/2 [&>p]:pl-4">
            <h2>網頁製作:</h2>
            <p>蔡營歆 (Easton)</p>
            <h2 className="pt-4">連絡方式:</h2>
            <p>Email: eastontsai.te@gmail.com</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
export default HomePage