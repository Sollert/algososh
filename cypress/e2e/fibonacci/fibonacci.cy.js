import {CHANGING, MODIFIED, DEFAULT} from "../../../src/constants/styles";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('Тестирование страницы "Последовательность Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');

    cy.get('button[type="submit"]').as('submit-button');
    cy.get('input[data-cy="input-value"]').as('input');
  })

  it('Если инпут пустой, сабмит недоступен', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@submit-button').should('be.disabled');
  })

  it('Если инпут заполнен, самбит активен', () => {
    cy.get('@input').type('3');
    cy.get('@submit-button').should('not.be.disabled');
  })

  it('Последовательность формируется корректно', () => {
    const testNumber = 3;
    cy.get('@input').type(testNumber);
    cy.get('@submit-button').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should((circle) => {
      expect(circle).to.have.length(1);
      expect(circle.eq(0)).to.contain(1)
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circle) => {
      expect(circle).to.have.length(2);
      expect(circle.eq(0)).to.contain(1)
      expect(circle.eq(1)).to.contain(1)
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circle) => {
      expect(circle).to.have.length(3);
      expect(circle.eq(0)).to.contain(1)
      expect(circle.eq(1)).to.contain(1)
      expect(circle.eq(2)).to.contain(2)
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circle) => {
      expect(circle).to.have.length(4);
      expect(circle.eq(0)).to.contain(1)
      expect(circle.eq(1)).to.contain(1)
      expect(circle.eq(2)).to.contain(2)
      expect(circle.eq(3)).to.contain(3)
    })

  })

})