import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DestinationCard from '../components/DestinationCard'
import DestinationDetailModal from '../components/DestinationDetailModal'
import { useWishlist } from '../hooks/useWishlist'
import './WishlistPage.css'

export default function WishlistPage() {
  const { items, wishlist, isWishlisted, toggleWishlist, updateWishlistItem } = useWishlist()
  const [selectedId, setSelectedId] = useState(null)

  const selectedEntry = selectedId ? wishlist[selectedId] : null

  function handleSave({ note, rating }) {
    updateWishlistItem(selectedId, { note, rating })
  }

  return (
    <div className="wishlist-page">
      <Navbar />

      <main className="wishlist-main">
        <div className="wishlist-header">
          <h1 className="wishlist-header__title">My Wishlist</h1>
          <p className="wishlist-header__sub">
            {items.length === 1
              ? '1 saved destination'
              : `${items.length} saved destinations`}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="wishlist-grid">
            {items.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                saved={isWishlisted(dest.id)}
                onToggleSave={toggleWishlist}
                onCardClick={dest => setSelectedId(dest.id)}
              />
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <div className="wishlist-empty__icon">♡</div>
            <h2 className="wishlist-empty__heading">Nothing saved yet</h2>
            <p className="wishlist-empty__text">
              Browse destinations and tap the heart to save places you want to visit.
            </p>
            <Link className="wishlist-empty__btn" to="/browse">
              Browse Destinations
            </Link>
          </div>
        )}
      </main>

      {selectedEntry && (
        <DestinationDetailModal
          entry={selectedEntry}
          onSave={handleSave}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
