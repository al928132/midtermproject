import { useState, useEffect } from 'react'
import StarRating from './StarRating'
import './DestinationDetailModal.css'

const MAX_NOTE = 500

export default function DestinationDetailModal({ entry, onSave, onClose }) {
  const [note, setNote] = useState(entry.note || '')
  const [rating, setRating] = useState(entry.rating || 0)

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSave() {
    onSave({ note: note.trim(), rating })
    onClose()
  }

  const { name, country, image, description } = entry

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={name} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="modal__header">
          <div>
            <p className="modal__brand">Travel Dream</p>
            <h2 className="modal__title">{name}</h2>
            <p className="modal__country">{country}</p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">&#10005;</button>
        </div>

        {/* Image */}
        <div className="modal__img-wrap">
          <img className="modal__img" src={image} alt={name} />
        </div>

        {/* Read-only description */}
        <p className="modal__desc">{description}</p>

        <hr className="modal__divider" />

        {/* Star rating */}
        <div className="modal__section">
          <label className="modal__label">Your Rating</label>
          <StarRating value={rating} onChange={setRating} />
          {rating > 0 && (
            <span className="modal__rating-hint">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
            </span>
          )}
        </div>

        {/* Notes */}
        <div className="modal__section">
          <label className="modal__label" htmlFor="modal-note">Personal Notes</label>
          <textarea
            id="modal-note"
            className="modal__textarea"
            placeholder="What do you want to remember about this place?"
            value={note}
            onChange={e => setNote(e.target.value.slice(0, MAX_NOTE))}
            rows={4}
          />
          <p className={`modal__char-count${note.length >= MAX_NOTE ? ' modal__char-count--limit' : ''}`}>
            {note.length} / {MAX_NOTE}
          </p>
        </div>

        {/* Actions */}
        <div className="modal__actions">
          <button className="modal__save" onClick={handleSave}>Save</button>
          <button className="modal__cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
