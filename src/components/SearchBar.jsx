export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">&#9906;</span>
      <input
        className="search-bar__input"
        type="search"
        placeholder="Search destinations or countries…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search destinations"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  )
}
