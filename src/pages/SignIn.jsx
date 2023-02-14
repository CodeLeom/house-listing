import { useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
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

  const onChange = () => {

  }

  return (
    <>
        <div>
          <header className="">
            Welcome Back
          </header>

          <main>
            <form>
              <input type="email" className="emailInput" placeholder="enter your email" id="email" value={email} onChange={onChange} />

              <div className="passwordInputDiv">
                <input type={showPass ? 'text' : 'password'} className="passwordInput" placeholder="input your password" id="password" value={password} onChange={onChange} />
                <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPass((prevState) => !prevState)} />
              </div>

              <NavLink to='/forgot-password' className="forgotPasswordLink">Forgot Password</NavLink>
            </form>
          </main>
        </div>
    </>
  )
}

export default SignIn
