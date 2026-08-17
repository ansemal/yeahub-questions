  export const FILTERS_NAMES = ['Специализация', 'Навыки', 'Сложность', 'Рейтинг вопросов'];
  export const COMPLEXITY = [
    {title: '1-3', id: '1,2,3'},
    {title: '4-6', id: '4,5,6'},
    {title: '7-8', id: '7,8'},
    {title: '9-10', id: '9,10'},
  ];
  export const RATE = [
    {title: '1', id: 1},
    {title: '2', id: 2},
    {title: '3', id: 3},
    {title: '4', id: 4},
    {title: '5', id: 5},
  ];
  export const DOTS = '...';
  export const INIT_RATE = Array.from({length: 5}, (_, i) => i + 1);
  export const INIT_COMPLEXITY = Array.from({length: 10}, (_, i) => i + 1);
  export const INIT_CURRENT = {
    skill: {},
    limit: 10,
    page: 1,
    rate: {id: INIT_RATE},
    complexity: {id: INIT_COMPLEXITY},
    keywords: '',
  }

