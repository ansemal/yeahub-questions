import { useEffect, useState } from 'react';
import Search from '../Search/Search';
import './filter.css'
import Filter from './Filter/Filter';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { FILTERS_NAMES, COMPLEXITY, RATE } from '../../constants/constants';

export default function Filters ({ specializations, skills, setCurrent }) {

  const [keywords, setKeywords] = useState('');
  const debouncedKeyWords = useDebounce(keywords, 1000);

  useEffect(() => {
    setCurrent(prev => ({...prev, keywords: debouncedKeyWords}));
  }, [debouncedKeyWords, setCurrent]) 

  return (
    <section className="filters">
      <Search keywords={keywords} setKeywords={setKeywords}/>
      <Filter name={FILTERS_NAMES[0]} data={specializations.data} currentName={'spec'} setCurrent={setCurrent} />
      <Filter name={FILTERS_NAMES[1]} data={skills.data} currentName={'skill'} setCurrent={setCurrent} />
      <Filter name={FILTERS_NAMES[2]} data={COMPLEXITY} currentName={'complexity'} setCurrent={setCurrent}/>
      <Filter name={FILTERS_NAMES[3]} data={RATE} currentName={'rate'} setCurrent={setCurrent} />
    </section>
  )
}