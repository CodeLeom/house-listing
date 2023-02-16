import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass';



function App() {
  return (
    <>
      <Router>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
              <main className='container mb-auto h-10 px-3'>
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
      <ToastContainer />
    </>
  );
}

export default App;
