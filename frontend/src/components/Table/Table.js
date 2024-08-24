import './Table.css';

function Table(props) {
  const tableData = props.data.map(item => {
    return (
      <tr>
        <th>{item.articleid}</th>
        <th>{item.subarticleid}</th>
        <th>{item.articlename}</th>
        <th>{item.external_str_id}</th>
        <th>{item.ecrlongname}</th>
      </tr>
    )
  })

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>articleid</th>
          <th>subarticleid</th>
          <th>articlename</th>
          <th>external_str_id</th>
          <th>ecrlongname</th>
        </tr>
      </thead>
      <tbody>
        {
          tableData
        }
      </tbody>
    </table>
  )
}

export default Table;