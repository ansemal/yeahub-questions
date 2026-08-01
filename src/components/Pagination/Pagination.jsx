import { useMemo } from 'react';
import './pagination.css';
import { DOTS } from '../../constants/constants';

export default function Pagination ({ totalPages, currentPage, setCurrentPage }) {

  const SIBLINGS = 2;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handlePageButton = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const paginationRange = useMemo(() => {
    if (!totalPages || totalPages <= 0) return [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const left = Math.max(2, currentPage - SIBLINGS);
    const right = Math.min(totalPages - 1, currentPage + SIBLINGS);
    const range = [];

    range.push(1);
    if (left > 2) range.push(DOTS);
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push(DOTS);
    range.push(totalPages);

    return range;
  }, [totalPages, currentPage]);

  return (
    <div className="pagination">
      {currentPage > 1 && <button onClick={(handlePreviousPage)}><img src="/icons/arrow-left.svg" alt="arrow-left" /></button>}
      {paginationRange.map((item, idx) =>
        item === DOTS 
          ? <span key={`dots-${idx}`} className="dots">{DOTS}</span>
          : <button
              key={idx}
              className={`pageNumber ${currentPage === item ? 'active' : ''}`}
              onClick={() => handlePageButton(item)}
              disabled={currentPage === item}
            >
              {item}
            </button>
      )}
      { currentPage < totalPages && <button onClick={handleNextPage}><img src="/icons/arrow-right.svg" alt="arrow-right" /></button>}
    </div>
  )
}