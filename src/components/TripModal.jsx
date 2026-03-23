import { useState, useEffect } from 'react'
import './TripModal.css'

const MAX_NAME = 40

export default function TripModal({ onSave, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Trip name is required.'); return }
    onSave({ name: name.trim(), description: description.trim() })
    onClose()
  }

  return (
    <div className="trip-modal-backdrop" onClick={onClose}>
      <div className="trip-modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <div className="trip-modal__header">
          <h2 className="trip-modal__title">New Trip</h2>
          <button className="trip-modal__close" onClick={onClose} aria-label="Close">&#10005;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="trip-modal__field">
            <label className="trip-modal__label" htmlFor="trip-name">Trip Name <span>*</span></label>
            <input
              id="trip-name"
              className={`trip-modal__input${error ? ' trip-modal__input--error' : ''}`}
              type="text"
              placeholder="e.g. Europe Summer 2025"
              value={name}
              onChange={e => { setName(e.target.value.slice(0, MAX_NAME)); setError('') }}
              autoFocus
            />
            <div className="trip-modal__row">
              {error && <p className="trip-modal__error">{error}</p>}
              <p className={`trip-modal__count${name.length >= MAX_NAME ? ' trip-modal__count--limit' : ''}`}>
                {name.length}/{MAX_NAME}
              </p>
            </div>
          </div>

          <div className="trip-modal__field">
            <label className="trip-modal__label" htmlFor="trip-desc">Description <span className="trip-modal__optional">(optional)</span></label>
            <textarea
              id="trip-desc"
              className="trip-modal__textarea"
              placeholder="What's the plan?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="trip-modal__actions">
            <button className="trip-modal__submit" type="submit">Create Trip</button>
            <button className="trip-modal__cancel" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
