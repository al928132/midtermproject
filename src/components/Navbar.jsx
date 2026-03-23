import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="navbar">
      <Link className="navbar__brand" to={user ? '/browse' : '/'}>
        Travel Dream
      </Link>

      {user && (
        <nav className="navbar__nav">
          <NavLink
            className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}
            to="/browse"
          >
            Browse
          </NavLink>
          <NavLink
            className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}
            to="/wishlist"
          >
            Wishlist
          </NavLink>
          <NavLink
            className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}
            to="/trips"
          >
            Trips
          </NavLink>
        </nav>
      )}

      <div className="navbar__right">
        {user ? (
          <>
            <span className="navbar__username">{user.username}</span>
            <button className="navbar__logout" onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <Link className="navbar__auth-link" to="/login">Log In</Link>
            <Link className="navbar__auth-btn" to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  )
}
