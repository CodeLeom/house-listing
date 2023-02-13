import {NavLink} from 'react-router-dom'

function Navbar() {
    
  return (
    <div>
        <nav className="navbar sticky-top navbar-expand-xl navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink to='/' className="navbar-brand fw-bold">House Listing Application</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse show" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                        <li className="nav-item">
                            <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link fw-bold active' : 'nav-link'} aria-current="page">Explore</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/offers' className={({ isActive }) => isActive ? 'nav-link fw-bold active' : 'nav-link'}>Offers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/profile' className={({ isActive }) => isActive ? 'nav-link fw-bold active' : 'nav-link'}>Profile</NavLink>
                        </li>
                    </ul> 
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
