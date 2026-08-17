/* global describe, it, beforeEach, cy */

describe('Filters reset to page 1', () => { 
  beforeEach(() => {
    cy.intercept('GET', 'https://yeatwork.ru*', {
      statusCode: 200,
      body: { specializations: [{ id: 11, title: 'Frontend' }], total: 1 }
    }).as('getSpecs');

    cy.intercept('GET', '**/questions/public-questions*', (req) => { 
      const url = new URL(req.url, 'https://yeatwork.ru'); 
      const page = Number(url.searchParams.get('page') ?? '1'); 
      const limit = Number(url.searchParams.get('limit') ?? '10'); 
      
      const total = 28; // 3 страницы вопросов
      const remaining = Math.max(0, total - (page - 1) * limit); 
      const itemsCount = Math.min(limit, remaining); 
      
      const questions = Array.from({ length: itemsCount }, (_, i) => ({ 
        id: (page - 1) * limit + i + 1, 
        title: `Question ${(page - 1) * limit + i + 1}` 
      })); 

      // Возвращаем структуру для setQuestions
      req.reply({ 
        statusCode: 200, 
        body: { 
          questions, 
          total 
        }
      }); 
    }).as('getQuestions');

    cy.visit('http://localhost:3000/'); 
  });

  it('resets page to 1 when rating changes', () => { 
    cy.get('.pagination').contains('2').click({ force: true });
    cy.get('.pagination').contains('2').should('be.visible'); 
    // Динамический перехват: вешаем НОВЫЙ интерцептор специально для проверки сброса
    cy.intercept('GET', '**/questions/public-questions*').as('ratingResetCheck');
    cy.get('[data-cy="filter-rate-5"]').click();
    // Проверяем именно тот запрос, который триггернулся этим кликом
    cy.wait('@ratingResetCheck').its('request.url').should('include', 'page=1');
  });

  it('resets page to 1 when search input changes', () => { 
    cy.get('.pagination').contains('2').click({ force: true });
    cy.get('.pagination').contains('2').should('be.visible');
    cy.intercept('GET', '**/questions/public-questions*').as('searchResetCheck');
    cy.get('[data-cy="search-input"]').clear().type('test', { delay: 10 });
    cy.wait('@searchResetCheck', { timeout: 5000 }).its('request.url').should('include', 'page=1');
  }); 
});