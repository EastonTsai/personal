
import { ReactComponent as HomeIcon } from 'files/icons/home.svg'
import { ReactComponent as EditIcon } from 'files/icons/edit.svg'
import { useLocation, Link } from 'react-router-dom'

const Header = () => {
  const location = useLocation().pathname

  return (
    <header className="bg-gray-700 px-4 py-2 flex justify-between ">
      <h3 className="text-gray-300 font-black">
        Personal
      </h3>
      <div className=' cursor-pointer'>
        <div className=' flex gap-4 '>
          {location === '/' ?
            <Link to='/admin'>
              <EditIcon className='edit-icon' />
            </Link>
            :
            <Link to='/'>
              <HomeIcon className='home-icon' />
            </Link>
          }

        </div>
      </div>
    </header>
  )
}
export default Header