import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Added error states
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")

  const navigate = useNavigate()

  const validate = () => {
    let newErrors = {}

    if (!email.trim()) newErrors.email = "Email is required"
    if (!password.trim()) newErrors.password = "Password is required"

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setServerError("")

    axios.post("http://localhost:3001/login", {
      email: email,
      password: password
    })
      .then((result) => {
        console.log(result);

        if (result.data.message === "Success") {
          navigate("/dashboard");
        } else {
          // Server validation — wrong email or password
          setServerError(result.data.error || "Invalid login details")
        }
      })
      .catch((err) => {
        console.error(err);
        setServerError("Server error. Check backend.")
      });
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>

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
                name='password'
                className={`form-control rounded-0 ${errors.password ? "is-invalid" : ""}`}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* SERVER ERROR — invalid email or password */}
            {serverError && (
              <div className="alert alert-danger p-2">
                {serverError}
              </div>
            )}

            <button type='submit' className='btn btn-success w-100 rounded-0'>
              Login
            </button>
          </form>

          <p>Do not Have an Account?</p>

          <Link className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none' to="/register">
            Sign Up
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Login
