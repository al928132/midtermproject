import './TripCard.css'

export default function TripCard({ trip, onOpen, onDelete }) {
  function handleDelete(e) {
    e.stopPropagation()
    if (window.confirm(`Delete "${trip.name}"? This cannot be undone.`)) {
      onDelete(trip.id)
    }
  }

  const count = trip.destinationIds.length

  return (
    <div className="trip-card" onClick={() => onOpen(trip.id)}>
      <div className="trip-card__top">
        <span className="trip-card__icon">✈</span>
        <button className="trip-card__delete" onClick={handleDelete} aria-label="Delete trip">✕</button>
      </div>

      <div className="trip-card__body">
        <h3 className="trip-card__name">{trip.name}</h3>
        {trip.description && (
          <p className="trip-card__desc">
            {trip.description.length > 80 ? trip.description.slice(0, 80) + '…' : trip.description}
          </p>
        )}
        <p className="trip-card__count">
          {count === 0 ? 'No destinations yet' : count === 1 ? '1 destination' : `${count} destinations`}
        </p>
      </div>

      <div className="trip-card__footer">
        <span className="trip-card__open">View Trip →</span>
      </div>
    </div>
  )
}
