import { useState } from 'react';
import { INIT_CURRENT, INIT_RATE, INIT_COMPLEXITY } from '../../../constants/constants';

export default function Filter({ name, data, currentName, current, setCurrent, closeFilters }) {
  const [showAll, setShowAll] = useState(false);
  const visibleData = showAll ? data : data?.slice(0, 5);

  const changeCurrent = currentValue => {
    if (currentName === 'spec') {
      setCurrent(prev => ({ ...prev, [currentName]: currentValue, ...INIT_CURRENT }))
    } else {
      const isReal = JSON.stringify(current[currentName]) === JSON.stringify(currentValue);
      let newValue = currentValue;
      if (isReal) {
        switch (currentName) {
          case ('skill'): newValue = {}; break;
          case ('rate'): newValue = {id: INIT_RATE}; break
          case ('complexity'): newValue = {id: INIT_COMPLEXITY}; break;
        } 
      }
      setCurrent(prev => ({ ...prev, [currentName]: newValue, page: 1 }));
    }
    closeFilters();
  };

  const renderFilterButton = value => {
    const isActive = current[currentName].id === value.id;
    return (
      <button
        key={value.title}
        data-cy={`filter-${currentName}-${value.id}`}
        className='filter__button'
        onClick={() => changeCurrent(value)}
        aria-pressed={isActive}
      >
        {value.title}
      </button>
    );
  };

  return (
    <div className="filter">
      <p className="filter__title">{name}</p>
      <div className="filter__list" role="group" aria-label={name}>
        {visibleData?.map(value => renderFilterButton(value))}
      </div>
      {data?.length > 5 && (
        <button 
          className='filter__expand' 
          type='button'
          onClick={() => setShowAll(prev => !prev)}
          aria-expanded={showAll}
        >
          {showAll ? 'Свернуть' : 'Посмотреть все'}
        </button>
      )}
    </div>
  )
}