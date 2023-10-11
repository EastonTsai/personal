import { ReactComponent as EditIcon } from 'files/icons/edit.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from 'utils/firebase'

const SampleCard = (props: {
  id: string
  link: string,
  title: string,
  picture: string,
  content: string,
  about: string[]
  feature: string[],
}) => {
  const { id, link, title, picture, content, about, feature } = props
  const [technologyHidden, setTechnologyHidden] = useState(true)
  const [featureHidden, setFeatureHidden] = useState(true)

  const handleEdit = async () => {

  }

  return (
    <div className=' shrink-0 box-border w-1/2 sm:w-1/3 lg:w-1/4 shadow'>
      <div className=' relative aspect-square overflow-hidden cursor-pointer bg-white'>
        <Link to={link}>
          <img className='max-w-full max-h-full mx-auto' src={picture} alt="Personal" />
          <div className='absolute top-0 left-0 w-full h-full bg-gray-400 opacity-80 flex justify-center duration-500 hover:opacity-0'>
            <h1 className='my-auto writing-vertical font-black text-5xl text-white leading-[3.5rem]'>{title}</h1>
          </div>
        </Link>
        <div className={`absolute w-full h-full top-0 -left-full bg-gray-600 text-white p-2 transition-[.3s] ${!featureHidden && 'translate-x-full'}`}>
          <h2 className='font-bold text-xl pb-4'>{title}</h2>
          {feature.map(item =>
            <p key={item} >。 {item}</p>
          )}
        </div>
        <button
          className=' absolute top-4 right-4 w-5 h-5 leading-5 text-sm bg-white font-black rounded-full cursor-pointer transition-[.3s] hover:bg-red-500 hover:text-white '
          onClick={() => setFeatureHidden(!featureHidden)}
        >
          {featureHidden ? '!' : 'X'}
        </button>
        <button
          className=' absolute bottom-4 right-4 w-6 h-6 bg-white p-1 rounded-lg hover:bg-blue-300 transition ease-in'
          onClick={handleEdit}
        >
          <EditIcon className=' h-full w-full' />
        </button>
      </div>
      <div className='p-2'>
        <div className='mb-2'>
          {content}
        </div>
        <div className=' border text-green-600'
        >
          <p
            className='text-center cursor-pointer'
            onClick={() => setTechnologyHidden(!technologyHidden)}
          >相關技術</p>
          <div className={`${technologyHidden && 'hidden'} flex gap-2 flex-wrap`}>
            {about.map(item =>
              <span key={item} className=' text-sm border-b border-green-600 mb-2'>{item}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SampleCard