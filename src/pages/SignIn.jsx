import { useState } from "react"
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {FaArrowRight} from "react-icons/fa"
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

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

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user){
        navigate('/')
      }
    } catch (err) {
      toast.error('Bad User Credentials')
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
              <input type="email" className="emailInput" placeholder="enter your email" id="email" value={email} onChange={onChange} />

              <div className="passwordInputDiv">
                <input type={showPass ? 'text' : 'password'} className="passwordInput" placeholder="input your password" id="password" value={password} onChange={onChange} />
                <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPass((prevState) => !prevState)} />
              </div>

              <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password</Link>

              <div className="signInBar">
                <p className="signInText">
                  Sign In
                </p>
                <button className="signInButton">
                  <FaArrowRight fill="white" width={34} height={34} />
                </button>
              </div>
            </form>

            {/* Google OAuth */}

            <Link to='/signup' className="registerLink">Sign Up Instead</Link>
          </main>
        </div>
    </>
  )
}

export default SignIn
