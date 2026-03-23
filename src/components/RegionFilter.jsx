const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function RegionFilter({ active, onChange }) {
  return (
    <div className="region-filter" role="group" aria-label="Filter by region">
      {REGIONS.map(region => (
        <button
          key={region}
          className={`region-filter__btn${active === region ? ' region-filter__btn--active' : ''}`}
          onClick={() => onChange(region)}
        >
          {region}
        </button>
      ))}
    </div>
  )
}
