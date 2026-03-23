import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing__inner">
        <span className="landing__eyebrow">DIG 4503 &mdash; Midterm Project</span>

        <h1 className="landing__title">
          Your <span>Travel</span> Wishlist,<br />All in One Place
        </h1>

        <p className="landing__description">
          Browse destinations from around the world, save the places you dream of
          visiting, add personal notes and star ratings, and organize everything
          into custom trips — all stored right in your browser.
        </p>

        <div className="landing__actions">
          <Link className="landing__btn landing__btn--primary" to="/signup">
            Get Started
          </Link>
          <Link className="landing__btn landing__btn--secondary" to="/login">
            Log In
          </Link>
        </div>

        <div className="landing__divider" />
      </div>
    </div>
  )
}
