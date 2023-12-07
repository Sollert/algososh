import {CHANGING, STANDARD} from "../../../src/constants/styles";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('Тестирование страницы "Стек"', () => {
  beforeEach(() => {
    cy.visit('/stack');
    cy.contains('Стек');

    cy.get('button[type="submit"]').as('submit-button');
    cy.get('button[type="reset"]').as('reset-button');
    cy.get('button[data-cy="delete-button"]').as('delete-button');
    cy.get('input[data-cy="input-value"]').as('input');
  })

  it('Если инпут пустой, сабмит недоступен', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@submit-button').should('be.disabled');
  })

  it('Если инпут пустой, сабмит недоступен', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@submit-button').should('be.disabled');
  })

  it('Если инпут заполнен, самбит активен', () => {
    cy.get('@input').type('1');
    cy.get('@submit-button').should('not.be.disabled');
  })

  it('Добавление в стек происходит корректно', () => {
    const testValue = '1';
    cy.get('@input').type(testValue);
    cy.get('@submit-button').click();
    cy.get("[class*='circle_circle']").as('circles')

    cy.get('@circles').should((circles) => {
      expect(circles).to.have.length(1);
      expect(circles.eq(0))
        .to.contain(testValue)
        .to.have.css('border', CHANGING)
      expect(circles.eq(0).prev('div')).to.contain('top');
      expect(circles.eq(0).next('p')).to.contain(0);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circles) => {
      expect(circles).to.have.length(1);
      expect(circles.eq(0))
        .to.contain(testValue)
        .to.have.css('border', STANDARD)
      expect(circles.eq(0).prev('div')).to.contain('top');
      expect(circles.eq(0).next('p')).to.contain(0);
    })

    const secondTestValue = '2';
    cy.get('@input').type(secondTestValue);
    cy.get('@submit-button').click();

    cy.get('@circles').should((circles) => {
      expect(circles).to.have.length(2);
      expect(circles.eq(1))
        .to.contain(secondTestValue)
        .to.have.css('border', CHANGING)
      expect(circles.eq(1).prev('div')).to.contain('top');
      expect(circles.eq(1).next('p')).to.contain(1);
    });

    cy.get('@circles').should((circles) => {
      expect(circles.eq(0))
        .to.contain(testValue)
        .to.have.css('border', STANDARD)
      expect(circles.eq(0).prev('div')).not.to.contain('top');
      expect(circles.eq(0).next('p')).to.contain(0);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circles) => {
      expect(circles).to.have.length(2);
      expect(circles.eq(1))
        .to.contain(secondTestValue)
        .to.have.css('border', STANDARD)
      expect(circles.eq(1).prev('div')).to.contain('top');
      expect(circles.eq(1).next('p')).to.contain(1);
    });
  })

  it('Удаление из стека происходит корректно', () => {
    const testValue = '1';
    const secondTestValue = '2';

    cy.get('@input').type(testValue);
    cy.get('@submit-button').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@input').type(secondTestValue);
    cy.get('@submit-button').click();

    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@delete-button').click();

    cy.get('@circles').should((circles) => {
      expect(circles).to.have.length(2);
      expect(circles.eq(1))
        .to.contain(secondTestValue)
        .to.have.css('border', CHANGING)
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circles) => {
      expect(circles).to.have.length(1);
      expect(circles.eq(0).prev('div')).to.contain('top');
    })
  })

  it('Ресет заблокирован при пустом стеке', () => {
    cy.get('@reset-button').should('be.disabled');
  })

  it('Ресет работает корректно', () => {
    const testValue = '1';

    cy.get('@input').type(testValue);
    cy.get('@submit-button').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@reset-button').should('not.be.disabled');

    cy.get('@reset-button').click();
    cy.get('@circles').should(circles => {
      expect(circles).to.have.length(0);
    })
  })
})