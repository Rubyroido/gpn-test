import './App.css';
import { useEffect, useState, useRef } from 'react';
import { getData } from '../../utils/Api';
import Limit from '../Limit/Limit';
import Table from '../Table/Table';
import Pages from '../Pages/Pages';

function App() {
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  let totalItemsRef = useRef(0);

  function countPages(totalItems, pageSize) {
    const numOfPages = Math.ceil(totalItems / pageSize);
    const arrayOfPages = [];
    for (let i = 1; i <= numOfPages; i++) {
      arrayOfPages.push(i)
    }
    setPageNumbers(arrayOfPages)
  }

  function onChangePage(page) {
    setCurrentPage(page)
    setOffset(page * pageSize - pageSize)
  }

  function onChangePageSize(size) {
    setPageSize(size)
  }

  useEffect(() => {
    getData(offset, pageSize)
      .then(res => {
        setData(res.data)
        totalItemsRef.current = res.totalItems;
        countPages(res.totalItems, pageSize)
      })
      .catch(err => console.log(err))
  }, [offset, pageSize]);

  return (
    <div className="App">
      <Limit onChangePageSize={onChangePageSize} />
      <Table data={data} />
      <Pages currentPage={currentPage} pageNumbers={pageNumbers} onChangePage={onChangePage} />
    </div>
  );
}

export default App;
