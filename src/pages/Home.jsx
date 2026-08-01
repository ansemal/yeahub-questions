import { useEffect, useState } from "react";
import { reqGet } from "../api/reqGet";
import Filters from '../components/Filters/Filters';
import Header from '../components/Header/Header';
import Questions from '../components/Questions/Questions';
import { INIT_COMPLEXITY, INIT_RATE } from "../constants/constants";

export default function Home() {

  const [specializations, setSpecializations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [current, setCurrent] = useState({
    spec: {},
    skill: {},
    limit: 10,
    page: 1,
    rate: {value: INIT_RATE},
    complexity: {value: INIT_COMPLEXITY},
    keywords: '',
  });
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const params = `page=1&limit=100`;
      const spec = await reqGet({endPoint: 'specializations', params});
      if (spec) {
        setSpecializations(spec);
        setCurrent(prev => ({...prev, spec: spec.data.filter(sp => sp.id === 11)[0]}))
      }
      const skillsData = await reqGet({endPoint: 'skills', params});
      if (skillsData) {
        setSkills(skillsData);
      }
    }
    init();
  }, [])

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);

      const params = `page=${current.page}
        &limit=${current.limit}
        &specializationId=${current.spec.id || 11}
        &skills=${current.skill.id || 6}
        &rate=${current.rate.value}
        &complexity=${current.complexity.value}
        ${current.keywords !== '' ? `&keywords=${current.keywords}` : ''}
      `;

      const quest = await reqGet({endPoint: 'questions/public-questions', params});
      if (quest) {
        setQuestions({...quest, totalPages: Math.ceil(quest.total / current.limit)});
      }
      setIsLoading(false);
    }
    loadQuestions();
  }, [current])

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="sections">
            <Questions questions={questions} current={current} setCurrent={setCurrent} isLoading={isLoading} />
            <Filters specializations={specializations} skills={skills} setCurrent={setCurrent}/>
          </div>
        </div>
      </main>
    </>
  );
}
