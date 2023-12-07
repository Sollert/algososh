import {CHANGING, DEFAULT} from "../../../src/constants/styles";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";
import {circlesClass} from "../../../src/constants/tests";

describe('Тестирование страницы "Очередь"', () => {
  beforeEach(() => {
    cy.visit('/queue');
    cy.contains("Очередь");

    cy.get('button[data-cy="submit-button"]').as('submit-button');
    cy.get('button[data-cy="delete-button"]').as('delete-button');
    cy.get('button[data-cy="reset-button"').as('reset-button');
    cy.get('input[data-cy="value-input"]').as('value-input');
  })

  it('Самбит не активен, если в инпуте пусто', () => {
    cy.get('@value-input').should('have.value', '');
    cy.get('@submit-button').should('be.disabled');
  })

  it('Добавление элемента в очередь происходит корректно', () => {
    const testValue = '1';
    const secondTestValue = '2';
    cy.get(circlesClass).as('circles')

    cy.get('@value-input').type(testValue);
    cy.get('@submit-button').click();

    cy.get('@circles').should((circles) => {
      expect(circles.eq(0))
        .to.have.css('border', CHANGING)
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circles) => {
      expect(circles.eq(0))
        .to.have.css('border', DEFAULT)
        .to.contain(testValue);
      expect(circles.eq(0).prev('div')).to.contain('head');
      expect(circles.eq(0).next('p').next('div')).to.contain('tail');
    });

    cy.get('@value-input').type(secondTestValue);
    cy.get('@submit-button').click();

    cy.get('@circles').should((circles) => {
      expect(circles.eq(1))
        .to.have.css('border', CHANGING)
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circles) => {
      expect(circles.eq(1))
        .to.have.css('border', DEFAULT)
        .to.contain(secondTestValue);
      expect(circles.eq(0).prev('div')).to.contain('head');
      expect(circles.eq(0).next('p').next('div')).not.to.contain('tail');
      expect(circles.eq(1).next('p').next('div')).to.contain('tail');
    });
  })

  it('Удаление элемента из очереди происходит корректно', () => {
    const testValue = '1';
    const secondTestValue = '2';
    cy.get(circlesClass).as('circles')

    cy.get('@value-input').type(testValue);
    cy.get('@submit-button').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@value-input').type(secondTestValue);
    cy.get('@submit-button').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@delete-button').should('not.be.disabled')
    cy.get('@delete-button').click();

    cy.get('@circles').should(circles => {
      expect(circles.eq(0))
        .to.have.css('border', CHANGING)
    })
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(circles => {
      expect(circles.eq(0))
        .to.have.css('border', DEFAULT)
        .to.not.contain(testValue)
      expect(circles.eq(0).prev('div')).not.to.contain('head');
      expect(circles.eq(0).next('p').next('div')).not.to.contain('tail');
      expect(circles.eq(1).next('p').next('div')).to.contain('tail');
      expect(circles.eq(1).prev('div')).to.contain('head');
    })
  })

  it('Ресет удаляет элементы из очереди корректно', () => {
    const testValue = '1';
    const secondTestValue = '2';
    cy.get(circlesClass).as('circles')

    cy.get('@value-input').type(testValue);
    cy.get('@submit-button').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@value-input').type(secondTestValue);
    cy.get('@submit-button').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@reset-button').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(circles => {
      for (let i = 0; i < circles.length; i++) {
        expect(circles.eq(i)).to.contain('').to.have.css('border', DEFAULT);
        expect(circles.eq(i).prev('div')).to.contain('');
        expect(circles.eq(i).next('p')).to.contain(i);
        expect(circles.eq(i).next('p').next('div')).to.contain('');
      }
    })
  })
})