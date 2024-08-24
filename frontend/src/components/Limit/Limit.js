import './Limit.css';

function Limit({ onChangePageSize }) {
  function handleChangePageSize(evt) {
    onChangePageSize(evt.target.value)
  }

  return (
    <div className="Limit">
      <label>Максимум строк на странице: </label>
      <select className='limit-select' onChange={evt => handleChangePageSize(evt)}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>

    </div>
  )
}

export default Limit;