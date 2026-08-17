import { useEffect, useState } from 'react';
import Search from '../Search/Search';
import './filter.css'
import Filter from './Filter/Filter';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { FILTERS_NAMES, COMPLEXITY, RATE } from '../../constants/constants';

export default function Filters ({ specializations, skills, current, setCurrent, isFiltersMblOpen, setIsFiltersMblOpen }) {

  const [keywords, setKeywords] = useState('');
  const debouncedKeyWords = useDebounce(keywords, 1000);

  useEffect(() => {
    setCurrent(prev => ({...prev, keywords: debouncedKeyWords, page: 1}));
  }, [debouncedKeyWords, setCurrent])

  const closeFilters = () => {
    isFiltersMblOpen && setIsFiltersMblOpen(false);
  }

  return (
    <section className={`filters filters-mobile ${isFiltersMblOpen ? 'isOpen' : ''}`}>
      <button 
        className='filters__mbl-close' 
        onClick={closeFilters}
        aria-label='Закрыть фильтры'
      >
        <img src="/icons/close-circle.svg" alt='' aria-hidden='true'/>
      </button>
      <Search keywords={keywords} setKeywords={setKeywords}/>
      <Filter name={FILTERS_NAMES[0]} data={specializations.data} currentName={'spec'} current={current} setCurrent={setCurrent} closeFilters={closeFilters} />
      <Filter name={FILTERS_NAMES[1]} data={skills.data} currentName={'skill'} current={current} setCurrent={setCurrent} closeFilters={closeFilters} />
      <Filter name={FILTERS_NAMES[2]} data={COMPLEXITY} currentName={'complexity'} current={current} setCurrent={setCurrent} closeFilters={closeFilters} />
      <Filter name={FILTERS_NAMES[3]} data={RATE} currentName={'rate'} current={current} setCurrent={setCurrent} closeFilters={closeFilters} />
    </section>
  )
}