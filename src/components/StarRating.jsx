import { useState } from 'react'
import './StarRating.css'

export default function StarRating({ value = 0, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(0)

  const active = hovered || value

  return (
    <div
      className={`star-rating${readOnly ? ' star-rating--readonly' : ''}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Rating: ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          className={`star-rating__star${star <= active ? ' star-rating__star--filled' : ''}`}
          onClick={() => !readOnly && onChange(star === value ? 0 : star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          disabled={readOnly}
        >
          ★
        </button>
      ))}
    </div>
  )
}
