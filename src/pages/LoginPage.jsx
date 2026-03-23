import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormField from '../components/FormField'
import './AuthPage.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields) {
  const errors = {}
  if (!EMAIL_RE.test(fields.email)) errors.email = 'Enter a valid email address.'
  if (!fields.password) errors.password = 'Password is required.'
  return errors
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [fields, setFields] = useState({ email: '', password: '' })
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
    setTouched({ email: true, password: true })
    if (Object.keys(errors).length > 0) return

    setLoading(true)
    const result = await login(fields.email, fields.password)
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
        <h1 className="auth-card__title">Log In</h1>

        {serverError && <p className="auth-card__server-error">{serverError}</p>}

        <form onSubmit={handleSubmit} noValidate>
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
            autoComplete="current-password"
            value={fields.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : ''}
          />

          <button className="auth-card__submit" type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="auth-card__switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
