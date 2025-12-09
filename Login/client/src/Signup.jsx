import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")

  const navigate = useNavigate()

  const validate = () => {
    let newErrors = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address"
    }
    if (!password.trim()) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setServerError("")

    axios.post('http://localhost:3001/register', {
      name,
      email,
      password
    })
      .then(result => {
        console.log(result)
        navigate('/login')
      })
      .catch(err => {
        console.log(err)
        setServerError("Registration failed. Try again.")
      })
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          {/* SERVER ERROR */}
          {serverError && (
            <div className="alert alert-danger p-2">{serverError}</div>
          )}

          {/* NAME FIELD */}
          <div className='mb-3'>
            <label><strong>Name</strong></label>
            <input
              type="text"
              placeholder='Enter Name'
              autoComplete='off'
              className={`form-control rounded-0 ${errors.name ? "is-invalid" : ""}`}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className='mb-3'>
            <label><strong>Email</strong></label>
            <input
              type="email"
              placeholder='Enter Email'
              autoComplete='off'
              className={`form-control rounded-0 ${errors.email ? "is-invalid" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className='mb-3'>
            <label><strong>Password</strong></label>
            <input
              type="password"
              placeholder='Enter Password'
              className={`form-control rounded-0 ${errors.password ? "is-invalid" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Register
          </button>
        </form>

        <p>Already Have an Account?</p>
        <Link className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none' to="/login">
          Login
        </Link>

      </div>
    </div>
  )
}

export default Signup
