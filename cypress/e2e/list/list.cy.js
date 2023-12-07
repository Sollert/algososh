import {CHANGING, DEFAULT} from "../../../src/constants/styles";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('Тестирование страницы "Связный список"', () => {
  beforeEach(() => {
    cy.visit('/list');
    cy.contains("Связный список");

    cy.get('button[data-cy="add-tail-button"]').as('add-tail-button');
    cy.get('button[data-cy="delete-tail-button"]').as('delete-tail-button');

    cy.get('button[data-cy="add-head-button"').as('add-head-button');
    cy.get('button[data-cy="delete-head-button"').as('delete-head-button');

    cy.get('button[data-cy="add-index-button"').as('add-index-button');
    cy.get('button[data-cy="delete-index-button"').as('delete-index-button');

    cy.get('input[data-cy="value-input"]').as('value-input');
    cy.get('input[data-cy="index-input"]').as('index-input');

    cy.get('div[class^="circle_content').as('circle-contents');
    cy.get("[class*='circle_circle']").as('circles');
  })

  it('Кнопка добавить в head недоступна при пустом значении', () => {
    cy.get('@value-input').should('have.value', '');
    cy.get(`@add-head-button`).should('be.disabled');
  });

  it('Кнопка добавить в tail недоступна при пустом значении', () => {
    cy.get('@value-input').should('have.value', '');
    cy.get(`@add-tail-button`).should('be.disabled');
  });

  it('Кнопка добавить по индексу недоступна при пустом значении', () => {
    cy.get('@value-input').should('have.value', '');
    cy.get(`@add-index-button`).should('be.disabled');
  });

  it('Кнопка удалить по индексу недоступна при пустом значении', () => {
    cy.get('@value-input').should('have.value', '');
    cy.get(`@delete-index-button`).should('be.disabled');
  });

  it('Кнопка добавить по индексу недоступна при пустом индексе', () => {
    cy.get('@index-input').should('have.value', '');
    cy.get(`@add-index-button`).should('be.disabled');
  });

  it('Кнопка удалить по индексу недоступна при пустом индексе', () => {
    cy.get('@index-input').should('have.value', '');
    cy.get(`@delete-index-button`).should('be.disabled');
  });

  it('Дефолтный список отрисовывается корректно', () => {
    cy.get('@circles').should((circles) => {
      for (let i = 0; i < circles.length; i++) {
        expect(circles.eq(i)).to.contain('').to.have.css('border', DEFAULT);
        expect(circles.eq(i).next('p')).to.contain(i);

        if (i === 0) expect(circles.eq(i).prev('div')).to.contain('head');

        if (i === circles.length - 1)
          expect(circles.eq(i).next('p').next('div')).to.contain('tail');
      }
    })

  });

  it('Добавление элемента в head происходит корректно', () => {
    const testValue = 1;
    cy.get('@value-input').type(`${testValue}`);
    cy.get('@add-head-button').click();

    cy.get('@circle-contents').then((item) => {
      cy.get(item[0])
        .then(() => {
          cy.get('[class*="circle_small"]').should('have.css', 'border', CHANGING);
          cy.get('[class*="circle_small"]').should('contain.text', testValue);
        });
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle-contents').should(item => {
      expect(item.eq(0)).to.contain(testValue);
      expect(item.eq(0).children('div')[0]).to.contain('head')
    })
  })

  it('Добавление элемента в tail происходит корректно', () => {
    const testValue = 1;
    cy.get('@value-input').type(`${testValue}`);
    cy.get('@add-tail-button').click();

    cy.get('@circle-contents').then((item) => {
      cy.get(item[item.length - 1])
        .then(() => {
          cy.get('[class*="circle_small"]').should('have.css', 'border', CHANGING);
          cy.get('[class*="circle_small"]').should('contain.text', testValue);
        });
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle-contents').should(item => {
      expect(item.eq(item.length - 1)).to.contain(testValue);
      expect(item.eq(item.length - 1).children('div')[2]).to.contain('tail')
    })
  })

  it('Добавление элемента в tail происходит корректно', () => {
    const testValue = 1;
    cy.get('@value-input').type(`${testValue}`);
    cy.get('@add-tail-button').click();

    cy.get('@circle-contents').then((item) => {
      cy.get(item[item.length - 1])
        .then(() => {
          cy.get('[class*="circle_small"]').should('have.css', 'border', CHANGING);
          cy.get('[class*="circle_small"]').should('contain.text', testValue);
        });
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle-contents').should(item => {
      expect(item.eq(item.length - 1)).to.contain(testValue);
      expect(item.eq(item.length - 1).children('div')[2]).to.contain('tail')
    })
  })

  it('Добавление элемента по индексу происходит корректно', () => {
    const index = 1;
    const testValue = 1;

    cy.get('@index-input').type(index);
    cy.get('@value-input').type(testValue);

    cy.get('@add-index-button').click();

    for (let i = 0; i <= index; i++) {
      cy.get('@circle-contents').then((item) => {
        cy.get('[class*="circle_small"]').should('have.css', 'border', CHANGING);
        cy.get('[class*="circle_small"]').should('contain.text', testValue);
      });

      cy.get('@circles').not('[class*="circle_small"]').should(circles => {
        expect(circles.eq(i)).to.have.css('border', CHANGING);
      })

      cy.wait(SHORT_DELAY_IN_MS)
    }

    cy.get('@circles').should(circles => {
      expect(circles.eq(index)).to.contain(testValue);
    })
  })

  it('Удаление элемента из head происходит корректно', () => {
    cy.get('@delete-head-button').click();

    cy.get('@circle-contents')
      .then((item) => {
        cy.get('[class*="circle_small"]').should('have.css', 'border', CHANGING);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle-contents').should(item => {
      expect(item).have.length(3);
      expect(item.eq(0).children('div')[0]).to.contain('head')
    })
  })

  it('Удаление элемента из tail происходит корректно', () => {
    cy.get('@delete-tail-button').click();

    cy.get('@circle-contents')
      .then((item) => {
        cy.get('[class*="circle_small"]').should('have.css', 'border', CHANGING);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle-contents').should(item => {
      expect(item).have.length(3);
      expect(item.eq(item.length - 1).children('div')[2]).to.contain('tail')
    })
  })

  it('Удаление элемента по индексу происходит корректно', () => {
    const index = 1;

    cy.get('@index-input').type(index);

    cy.get('@delete-index-button').click();

    for (let i = 0; i <= index; i++) {
      cy.get('@circle-contents').then((item) => {
        cy.get('[class*="circle_small"]').should('have.css', 'border', CHANGING);
      });

      cy.get('@circles').not('[class*="circle_small"]').should(circles => {
        expect(circles.eq(i)).to.have.css('border', CHANGING);
      })

      if (i === index) {
        cy.get('@circles').not('[class*="circle_small"]').should(circles => {
          expect(circles.eq(i)).to.contain('');
        })
      }

      cy.wait(SHORT_DELAY_IN_MS)
    }

    cy.get('@circles').should(circles => {
      expect(circles).have.length(3);
    })
  })

})