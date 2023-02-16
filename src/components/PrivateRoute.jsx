import {Navigate, Outlet} from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './layout/Spinner'

function PrivateRoute() {
    const {loggedIn, loading} = useAuthStatus()

    if(loading){
        return <Spinner />
    }
  return loggedIn ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute
