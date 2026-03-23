export default function FormField({ label, id, error, ...inputProps }) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`form-field__input${error ? ' form-field__input--error' : ''}`}
        {...inputProps}
      />
      {error && <p className="form-field__error">{error}</p>}
    </div>
  )
}
