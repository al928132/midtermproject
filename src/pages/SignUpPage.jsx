import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormField from '../components/FormField'
import './AuthPage.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_RE = /^(?=.*[A-Z])(?=.*\d).{8,}$/

function validate(fields) {
  const errors = {}
  if (!fields.username.trim()) errors.username = 'Username is required.'
  if (!EMAIL_RE.test(fields.email)) errors.email = 'Enter a valid email address.'
  if (!PASSWORD_RE.test(fields.password))
    errors.password = 'Min 8 characters, at least one uppercase letter and one digit.'
  if (fields.confirm !== fields.password) errors.confirm = 'Passwords do not match.'
  return errors
}

export default function SignUpPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [fields, setFields] = useState({ username: '', email: '', password: '', confirm: '' })
  const [touched, setTouched] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const errors = validate(fields)

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleBlur(e) {
    setTouched(prev => ({ ...prev, [e.target.name]: true }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ username: true, email: true, password: true, confirm: true })
    if (Object.keys(errors).length > 0) return

    setLoading(true)
    const result = await signUp(fields.username.trim(), fields.email, fields.password)
    setLoading(false)

    if (result.error) {
      setServerError(result.error)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-card__brand">Travel Dream</p>
        <h1 className="auth-card__title">Create Account</h1>

        {serverError && <p className="auth-card__server-error">{serverError}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Username"
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={fields.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username ? errors.username : ''}
          />
          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
          />
          <FormField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={fields.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : ''}
          />
          <FormField
            label="Confirm Password"
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={fields.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirm ? errors.confirm : ''}
          />

          <button className="auth-card__submit" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-card__switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
