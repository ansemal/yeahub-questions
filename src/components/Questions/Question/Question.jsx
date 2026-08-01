import { useState } from 'react';
import '../questions.css';

export default function Question({ question }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="question">
      <div className="question__head" onClick={() => setShowDetails(prev => !prev)}>
        <div className="question__title">{question.title}</div>
        <img src={`icons/${showDetails ? 'collapse' : 'expand'}.svg`} alt="icon-show" />
      </div>
      {showDetails && (
        <div className="question__details">
          <div className="question__level">
            <div className="question__level-rate">
              <p>Рейтинг:</p>
              <p>{question.rate}</p>
            </div>
            <div className="question__level-complexity">
              <p>Сложность:</p>
              <p>{question.complexity}</p>
            </div>
          </div>
          <div className="shortAnswer" dangerouslySetInnerHTML={{ __html: question.shortAnswer }} />
          <button class="btn colorBlue">Подробнее</button>
        </div>
      )}
    </div>
  );
}
