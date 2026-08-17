import { useEffect, useState } from 'react';
import { reqGet } from '../api/reqGet';
import Filters from '../components/Filters/Filters';
import Header from '../components/Header/Header';
import Questions from '../components/Questions/Questions';
import { INIT_COMPLEXITY, INIT_RATE } from '../constants/constants';
import axios from 'axios';

export default function Home() {
  const [specializations, setSpecializations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [current, setCurrent] = useState({
    spec: {},
    skill: {},
    limit: 10,
    page: 1,
    rate: { id: INIT_RATE },
    complexity: { id: INIT_COMPLEXITY },
    keywords: '',
  });
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersMblOpen, setIsFiltersMblOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let mounted = true;

    const init = async () => {
      try {
        const params = { page: 1, limit: 100 };

        const [resSpec, resSkills] = await Promise.allSettled([
          reqGet({ endPoint: 'specializations', params, signal }),
          reqGet({ endPoint: 'skills', params, signal }),
        ]);

        if (!mounted) return;
        if (resSpec.status === 'fulfilled') {
          const specData = resSpec.value;
          setSpecializations(specData);
          setCurrent(prev => ({ ...prev, spec: specData.data.find(sp => sp.id === 11) || specData.data[0] }));
        }
        if (resSkills.status === 'fulfilled') {
          setSkills(resSkills.value);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      }
    };
    init();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let mounted = true;

    const loadQuestions = async () => {
      setIsLoading(true);

      const params = {
        page: current.page,
        limit: current.limit,
        specializationId: current.spec.id || 11,
        rate: current.rate.id,
        complexity: current.complexity.id,
        ...(current.skill.id && { skills: current.skill.id }),
        ...(current.keywords !== '' && { keywords: current.keywords }),
      };

      try {
        const quest = await reqGet({ endPoint: 'questions/public-questions', params, signal });
        if (!mounted || !quest) return;
        if (quest) {
          setQuestions({ ...quest, totalPages: Math.ceil(quest.total / current.limit) });
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [current]);
  
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="sections">
            <Questions
              questions={questions}
              current={current}
              setCurrent={setCurrent}
              isLoading={isLoading}
              isFiltersMblOpen={isFiltersMblOpen}
              setIsFiltersMblOpen={setIsFiltersMblOpen}
            />
            <Filters
              specializations={specializations}
              skills={skills}
              current={current}
              setCurrent={setCurrent}
              isFiltersMblOpen={isFiltersMblOpen}
              setIsFiltersMblOpen={setIsFiltersMblOpen}
            />
          </div>
        </div>
      </main>
    </>
  );
}
