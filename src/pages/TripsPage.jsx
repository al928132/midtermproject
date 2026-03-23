import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import TripCard from '../components/TripCard'
import TripModal from '../components/TripModal'
import { useTrips } from '../hooks/useTrips'
import destinations from '../data/destinations'
import './TripsPage.css'

const destMap = Object.fromEntries(destinations.map(d => [d.id, d]))

export default function TripsPage() {
  const { trips, createTrip, deleteTrip, addDestinationToTrip, removeDestinationFromTrip, reorderDestinations } = useTrips()
  const [showModal, setShowModal] = useState(false)
  const [selectedTripId, setSelectedTripId] = useState(null)
  const [showPicker, setShowPicker] = useState(false)
  const [pickerQuery, setPickerQuery] = useState('')
  const dragIndex = useRef(null)
  const dragOverIndex = useRef(null)

  const selectedTrip = trips.find(t => t.id === selectedTripId) || null
  const tripDests = selectedTrip
    ? selectedTrip.destinationIds.map(id => destMap[id]).filter(Boolean)
    : []

  const availableDests = selectedTrip
    ? destinations.filter(
        d =>
          !selectedTrip.destinationIds.includes(d.id) &&
          (pickerQuery === '' ||
            d.name.toLowerCase().includes(pickerQuery.toLowerCase()) ||
            d.country.toLowerCase().includes(pickerQuery.toLowerCase()))
      )
    : []

  function handleDragStart(index) {
    dragIndex.current = index
  }

  function handleDragOver(e, index) {
    e.preventDefault()
    dragOverIndex.current = index
  }

  function handleDrop() {
    const from = dragIndex.current
    const to = dragOverIndex.current
    if (from === null || to === null || from === to) return
    const newOrder = [...selectedTrip.destinationIds]
    const [moved] = newOrder.splice(from, 1)
    newOrder.splice(to, 0, moved)
    reorderDestinations(selectedTripId, newOrder)
    dragIndex.current = null
    dragOverIndex.current = null
  }

  function closePicker() {
    setShowPicker(false)
    setPickerQuery('')
  }

  /* ── Trip detail view ── */
  if (selectedTrip) {
    return (
      <div className="trips-page">
        <Navbar />
        <main className="trips-main">
          <div className="trip-detail">
            <button className="trip-detail__back" onClick={() => setSelectedTripId(null)}>
              ← All Trips
            </button>

            <div className="trip-detail__header">
              <div>
                <h1 className="trip-detail__name">{selectedTrip.name}</h1>
                {selectedTrip.description && (
                  <p className="trip-detail__desc">{selectedTrip.description}</p>
                )}
              </div>
              <button className="trip-detail__add-btn" onClick={() => setShowPicker(true)}>
                + Add Destination
              </button>
            </div>

            {tripDests.length === 0 ? (
              <div className="trip-detail__empty">
                <div className="trip-detail__empty-icon">🗺️</div>
                <p className="trip-detail__empty-text">No destinations yet. Start adding places to visit!</p>
                <button className="trip-detail__add-btn" onClick={() => setShowPicker(true)}>
                  + Add Destination
                </button>
              </div>
            ) : (
              <>
                <p className="trip-detail__hint">Drag rows to reorder your itinerary.</p>
                <ol className="trip-dest-list">
                  {tripDests.map((dest, index) => (
                    <li
                      key={dest.id}
                      className="trip-dest-item"
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={e => handleDragOver(e, index)}
                      onDrop={handleDrop}
                    >
                      <span className="trip-dest-item__num">{index + 1}</span>
                      <span className="trip-dest-item__drag" aria-hidden="true">⠿</span>
                      <img
                        className="trip-dest-item__img"
                        src={dest.image}
                        alt={dest.name}
                        draggable={false}
                      />
                      <div className="trip-dest-item__info">
                        <span className="trip-dest-item__name">{dest.name}</span>
                        <span className="trip-dest-item__country">{dest.country}</span>
                      </div>
                      <button
                        className="trip-dest-item__remove"
                        onClick={() => removeDestinationFromTrip(selectedTripId, dest.id)}
                        aria-label={`Remove ${dest.name}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </main>

        {showPicker && (
          <div className="trip-picker-backdrop" onClick={closePicker}>
            <div className="trip-picker" onClick={e => e.stopPropagation()}>
              <div className="trip-picker__header">
                <h3 className="trip-picker__title">Add Destination</h3>
                <button className="trip-picker__close" onClick={closePicker} aria-label="Close">✕</button>
              </div>
              <div className="trip-picker__search-wrap">
                <input
                  className="trip-picker__search"
                  type="search"
                  placeholder="Search destinations…"
                  value={pickerQuery}
                  onChange={e => setPickerQuery(e.target.value)}
                  autoFocus
                />
              </div>
              {availableDests.length === 0 ? (
                <p className="trip-picker__empty">
                  {pickerQuery ? 'No matches found.' : 'All destinations are already in this trip!'}
                </p>
              ) : (
                <ul className="trip-picker__list">
                  {availableDests.map(dest => (
                    <li
                      key={dest.id}
                      className="trip-picker__item"
                      onClick={() => { addDestinationToTrip(selectedTripId, dest.id); closePicker() }}
                    >
                      <img className="trip-picker__img" src={dest.image} alt={dest.name} />
                      <div>
                        <p className="trip-picker__name">{dest.name}</p>
                        <p className="trip-picker__country">{dest.country} · {dest.region}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  /* ── Trip grid view ── */
  return (
    <div className="trips-page">
      <Navbar />
      <main className="trips-main">
        <div className="trips-header">
          <div>
            <h1 className="trips-header__title">My Trips</h1>
            <p className="trips-header__sub">
              {trips.length === 0
                ? 'Plan your next adventure'
                : `${trips.length} trip${trips.length === 1 ? '' : 's'} planned`}
            </p>
          </div>
          <button className="trips-new-btn" onClick={() => setShowModal(true)}>+ New Trip</button>
        </div>

        {trips.length === 0 ? (
          <div className="trips-empty">
            <div className="trips-empty__icon">✈</div>
            <h2 className="trips-empty__heading">No trips yet</h2>
            <p className="trips-empty__text">
              Create your first trip and start adding destinations to plan your perfect adventure.
            </p>
            <button className="trips-empty__btn" onClick={() => setShowModal(true)}>Create Your First Trip</button>
          </div>
        ) : (
          <div className="trips-grid">
            {trips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onOpen={id => setSelectedTripId(id)}
                onDelete={deleteTrip}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <TripModal
          onSave={createTrip}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
