import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing">
      <h1 className="landing__title">Travel Dream</h1>
      <p className="landing__description">
        Travel Dream is a front-end React application for DIG 4503. Browse
        destinations from around the world, save the places you want to visit,
        add personal notes and star ratings, and organize everything by region
        or custom trip. All data is stored in your browser using localStorage
        — no backend required. Sign up and log in with regex-validated
        credentials to keep your wishlist across sessions.
      </p>
    </div>
  )
}
