import './Pages.css';
import { useState } from "react";

function Pages({ currentPage, pageNumbers, onChangePage }) {
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(10);

  function handlePageClick(page) {
    onChangePage(page)
  }

  function handleLeft(page) {
    onChangePage(page)
    if (page < pageNumbers[minPage]) {
      setMinPage(minPage - 10)
      setMaxPage(maxPage - 10)
    }
  }

  function handleRight(page) {
    onChangePage(page)
    if (page >= pageNumbers[maxPage]) {
      setMinPage(minPage + 10)
      setMaxPage(maxPage + 10)
    }
  }

  return (
    <div className="Pages">
      {
        currentPage === 1 ? null : <button type='button' className='button-left' onClick={() => handleLeft(currentPage - 1)} />
      }
      <nav className='pages-nums'>
        {
          pageNumbers.slice(minPage, maxPage).map(page => {
            return (
              <button className={`button-page ${currentPage === page ? 'button-page_active' : null}`} onClick={() => handlePageClick(page)}>{page}</button>
            )
          })
        }
      </nav>
      {
        currentPage === pageNumbers[pageNumbers.length - 1] ? null : <button type='button' className='button-right' onClick={() => handleRight(currentPage + 1)} />
      }
    </div>
  )
}

export default Pages;