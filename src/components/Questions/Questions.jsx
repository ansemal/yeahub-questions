import Pagination from '../Pagination/Pagination'
import Skeleton from '../Skeleton/Skeleton';
import Question from './Question/Question'
import './questions.css'

export default function Questions ({ questions, current, setCurrent, isLoading }) {

  const {data, totalPages} = questions;

  const changeCurrentPage = (newPageNumber) => {
    setCurrent(prev => ({...prev, page: newPageNumber}))
  }

  return (
    <section className="questions__section">
      <div className="questions__list">
        {!isLoading ? <div className="questions__theme">Вопросы {current.spec.title}</div> : <Skeleton />}
        {!isLoading 
          ? <div className="questions__list">
              {data?.map(question => <Question key={question.id} question={question} />)}
            </div>
          : <Skeleton count={10} type={'item'} />
        }
      </div>
      <Pagination totalPages={totalPages} currentPage={current.page} setCurrentPage={changeCurrentPage} />
    </section>

  )
}