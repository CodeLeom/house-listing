import { useState } from "react"
import { Link } from "react-router-dom"
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {FaArrowRight} from "react-icons/fa"


function ForgotPass() {
  const [email, setEmail] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Reset Email sent successfully!")

    } catch (err) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder="enter your email" id="email" value={email} onChange={onChange} />

          <Link className="forgotPasswordLink" to='/signin'>Sign In</Link>

          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
            </div>
            <button className="signInButton">
            <FaArrowRight fill="#fff" width={34} height={34} />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPass
