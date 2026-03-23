import StarRating from './StarRating'

export default function DestinationCard({ destination, saved, onToggleSave, onCardClick }) {
  const { name, country, region, image, description, tags, note, rating } = destination

  return (
    <article className="dest-card">
      <div className="dest-card__img-wrap">
        <img
          className="dest-card__img"
          src={image}
          alt={name}
          loading="lazy"
        />
        <span className="dest-card__region">{region}</span>
        <button
          className={`dest-card__save${saved ? ' dest-card__save--saved' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleSave(destination) }}
          aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
          title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>

      <div
        className={`dest-card__body${onCardClick ? ' dest-card__body--clickable' : ''}`}
        onClick={onCardClick ? () => onCardClick(destination) : undefined}
      >
        <div className="dest-card__header">
          <h3 className="dest-card__name">{name}</h3>
          <span className="dest-card__country">{country}</span>
        </div>
        <p className="dest-card__desc">{description}</p>

        {/* Note snippet — only shown on wishlist cards */}
        {note && (
          <p className="dest-card__note">
            &#8220;{note.length > 80 ? note.slice(0, 80) + '…' : note}&#8221;
          </p>
        )}

        {/* Star summary — only shown on wishlist cards */}
        {rating > 0 && (
          <div className="dest-card__rating">
            <StarRating value={rating} readOnly />
          </div>
        )}

        <ul className="dest-card__tags">
          {tags.map(tag => (
            <li key={tag} className="dest-card__tag">{tag}</li>
          ))}
        </ul>

        {onCardClick && (
          <span className="dest-card__edit-hint">Click to edit notes &amp; rating</span>
        )}
      </div>
    </article>
  )
}
