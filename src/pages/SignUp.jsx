import { useState } from "react"
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import OAuth from "../components/OAuth"
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {FaArrowRight} from "react-icons/fa"
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {name, email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [e.target.id]: e.target.value
      }
    ))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      //this to remove password from the form input and add other info to the db
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (err) {
      toast.error('Something went wrong with your registration')
    }
  }

  return (
    <>
        <div className="container">
          <header className="mb-5">
            Welcome Back
          </header>

          <main>
            <form onSubmit={onSubmit}>
              <input type="text" className="nameInput" placeholder="enter your name" id="name" value={name} onChange={onChange} />

              <input type="email" className="emailInput" placeholder="enter your email" id="email" value={email} onChange={onChange} />

              <div className="passwordInputDiv">
                <input type={showPass ? 'text' : 'password'} className="passwordInput" placeholder="input your password" id="password" value={password} onChange={onChange} />
                <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPass((prevState) => !prevState)} />
              </div>

              <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password</Link>

              <div className="signUpBar">
                <p className="signUpText">
                  Sign Up
                </p>
                <button className="signUpButton">
                  <FaArrowRight fill="white" width={34} height={34} />
                </button>
              </div>
            </form>

            <OAuth />
            <Link to='/signin' className="registerLink">Already Registered, Sign In Instead</Link>
          </main>
        </div>
    </>
  )
}

export default SignUp
