import Pagination from '../Pagination/Pagination';
import Skeleton from '../Skeleton/Skeleton';
import Question from './Question/Question';
import './questions.css';

export default function Questions ({ questions, current, setCurrent, isLoading, isFiltersMblOpen, setIsFiltersMblOpen }) {

  const {data, totalPages} = questions;

  const changeCurrentPage = (newPageNumber) => {
    setCurrent(prev => ({...prev, page: newPageNumber}))
  }

  const showNameSpec = () => {
    return (
      <div className="questions__spec">
        Вопросы {current.spec.title}
        <button 
          className='filters__button-mbl'
          onClick={() => setIsFiltersMblOpen(true)}
          aria-expanded={isFiltersMblOpen}
          aria-label="Открыть фильтры"
        >
          <img src="/icons/filters.svg" alt="filters" />
        </button>
      </div>
    )
  }

  return (
    <section className="questions__section">
      {!isLoading ? showNameSpec() : <Skeleton />}
      <div className="questions__list">
        {isLoading ? <Skeleton count={10} type={'item'} />
          : <>
              <div className="questions__list">
                {data?.map(question => <Question key={question.id} question={question} />)}
              </div>
            </>
        }
      </div>
      <Pagination totalPages={totalPages} currentPage={current.page} setCurrentPage={changeCurrentPage} />
    </section>

  )
}