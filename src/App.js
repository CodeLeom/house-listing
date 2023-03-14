import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/layout/Footer';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';


function App() {
  return (
    <>
      <Router>
          <div className='flex flex-col min-h-screen justify-between'>
            <Navbar />
              <main className='container mb-auto px-3 items-center max-w-full'>
                <Routes>
                  <Route path='/' element={<Explore />} />
                  <Route path='/offers' element={<Offers />} />
                  <Route path='/category/:categoryName' element={<Category />} />
                  <Route path='/profile' element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                  </Route>
                  <Route path='/signin' element={<SignIn />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/forgot-password' element={<ForgotPass />} />
                  <Route path='/create-listing' element={<CreateListing />} />
                  <Route path='/category/:categoryName/:listingId' element={<Listing />} />
                  <Route path='/contact/:ownerId' element={<Contact />} />
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
