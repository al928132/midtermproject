import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import RegionFilter from '../components/RegionFilter'
import DestinationCard from '../components/DestinationCard'
import { useWishlist } from '../hooks/useWishlist'
import destinations from '../data/destinations'
import './BrowsePage.css'

export default function BrowsePage() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const { isWishlisted, toggleWishlist } = useWishlist()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return destinations.filter(d => {
      const matchesRegion = region === 'All' || d.region === region
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q)
      return matchesRegion && matchesQuery
    })
  }, [query, region])

  return (
    <div className="browse-page">
      <Navbar />

      <main className="browse-main">
        <div className="browse-header">
          <h1 className="browse-header__title">Browse Destinations</h1>
          <p className="browse-header__sub">
            Discover places to add to your wishlist
          </p>
        </div>

        <div className="browse-controls">
          <SearchBar value={query} onChange={setQuery} />
          <RegionFilter active={region} onChange={setRegion} />
        </div>

        <p className="browse-count">
          {filtered.length === 1
            ? '1 destination'
            : `${filtered.length} destinations`}
          {region !== 'All' && ` in ${region}`}
          {query && ` matching "${query}"`}
        </p>

        {filtered.length > 0 ? (
          <div className="browse-grid">
            {filtered.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                saved={isWishlisted(dest.id)}
                onToggleSave={toggleWishlist}
              />
            ))}
            {(region === 'All' || region === 'Oceania') && !query && (
              <div className="dest-card dest-card--coming-soon">
                <div className="dest-card__coming-icon">✦</div>
                <h3 className="dest-card__coming-title">More Trips Coming Soon!</h3>
                <p className="dest-card__coming-text">
                  New destinations are on their way. Check back soon.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="browse-empty">
            <p className="browse-empty__text">No destinations found.</p>
            <button
              className="browse-empty__reset"
              onClick={() => { setQuery(''); setRegion('All') }}
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
