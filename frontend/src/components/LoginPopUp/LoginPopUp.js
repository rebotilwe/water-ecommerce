import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault()

    // *** FIXED: full API URL to match your Express server on port 8085 ***
    const url =
      currState === "Login"
        ? "http://localhost:8085/login"
        : "http://localhost:8085/signup"

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      // ensure we really got JSON back
      const contentType = res.headers.get("content-type") || ""
      if (!contentType.includes("application/json")) {
        throw new Error("Server did not return JSON. Check API URL/port.")
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong")

      alert(`${currState} successful`)
      setShowLogin(false)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and Privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{"  "}

            <span onClick={() => setCurrState("Sign Up ")}> 
              Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{"  "}
            <span onClick={() => setCurrState("Login ")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopUp
// *** FIXED: full API URL to match your Express server on port 8085 ***