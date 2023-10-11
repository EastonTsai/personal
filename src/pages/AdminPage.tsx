import EditExperience from "components/EditExperience"
import EditPersonal from "components/EditPersonal"
import EditPortfolio from "components/EditPortfolio"
import Header from "components/Header"
import { useState } from 'react'

const AdminPage = () => {
  const pages = ['個人資料', '作品集', '工作經歷']
  const [currentPage, setCurrentPage] = useState(0)
  return (
    <div className="container-default">
      <Header />
      <main>
        <section className=" p-4 flex gap-4">
          {pages.map((item, index) =>
            <span
              key={item}
              onClick={() => setCurrentPage(Number(index))}
              className={`font-black text-xl text-gray-400 cursor-pointer transition-[.5s] ${index === currentPage && 'active'}`}
            >{item}</span>
          )}
        </section>
        <section className='flex transition ease-in' style={{ 'transform': `translateX(-${100 * currentPage}%)` }}>
          <EditPersonal />
          <EditPortfolio />
          <EditExperience />
        </section>
      </main>
    </div>
  )
}
export default AdminPage