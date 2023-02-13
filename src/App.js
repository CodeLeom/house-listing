import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPass from './pages/ForgotPass'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'



function App() {
  return (
    <>
      <Router>
          <div className='d-flex flex-column'>
            <Navbar />
              <main className='container mt-5 mb-5'>
                <Routes>
                  <Route path='/' element={<Explore />} />
                  <Route path='/offers' element={<Offers />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/signin' element={<SignIn />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/forgot-password' element={<ForgotPass />} />
                </Routes>
              </main>
            <Footer />
        </div>
      </Router>
      
    </>
  );
}

export default App;
