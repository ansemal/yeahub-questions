import './Skeleton.css';

export default function Skeleton({count = 1, type = 'title'}) {
  return (
    <>
      {count > 1
        ? <ul className='list'>
            {[...Array(count)].map((_, i) => (
              <li key={i} className={type} />
            ))}
          </ul> 
        : <li className={type} />
      }
    </>
  )
} 