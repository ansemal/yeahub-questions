import { useEffect, useState } from "react"

export default function Filter({ name, data, currentName, setCurrent }) {

  const [showAll, setShowAll] = useState(false);
  const [minData, setMinData] = useState(() => data?.slice(0, 5));

  useEffect( () => {
    const changeMinData = () => {
      setMinData(data?.slice(0, 5));
    };
    changeMinData();
  }, [data])

  const changeCurrent = (currentValue) => {
    setCurrent(prev => ({...prev, [currentName]: currentValue}));
  }

  return (
    <div className="filter">
      <p className="filter__title">{name}</p>
      <div className="filter__list">
        {(showAll ? data : minData)?.map(value => (
          <div key={value.title} className="filter__button" onClick={() => changeCurrent(value)}>
            {value.title}
            </div>
        ))}
      </div>
      {data?.length > 5 && 
        <button className='btn colorBlue' onClick={() => setShowAll(prev => !prev)}>
          {showAll ? 'Свернуть' : 'Посмотреть все'}
        </button>
      }
    </div>
  )
}