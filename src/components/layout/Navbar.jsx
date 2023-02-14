import {Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'


function Navbar() {
    
  return (
    <nav className='navbar mb-12 bg-base-100 shadow-lg'>
    <div className='container mx-auto'>
        <div className='flex-row px-2 mx-2'>
            <Link to='/' className='text-lg font-bold align-middle'>
                House Listing App.
            </Link>
        </div>
        <div className='flex-1 px-2 mx-2'>
            <div className='flex justify-end'>
                <Link to='/' className='btn btn-ghost btn-sm rounded-btn' aria-current="page">Explore</Link>
                <Link to='/offers' className='btn btn-ghost btn-sm rounded-btn' aria-current="page">Offers</Link>
                <Link to='/profile' className='btn btn-ghost btn-sm rounded-btn' aria-current="page">Profile</Link>
            </div>
        </div>
    </div>
</nav>
  )
}

export default Navbar
