import {CHANGING, DEFAULT, MODIFIED} from "../../../src/constants/styles";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('Тестирование страницы "Строка"', () => {
  beforeEach(() => {
    cy.visit('/recursion');
    cy.contains('Строка');

    cy.get('button[type="submit"]').as('submit-button');
    cy.get('input[data-cy="input-value"]').as("input");
  })

  it('Если инпут пустой, сабмит недоступен', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@submit-button').should('be.disabled');
  })

  it('Если инпут заполнен, самбит активен', () => {
    cy.get('@input').type('test');
    cy.get('@submit-button').should('not.be.disabled');
  })

  it('Строка разворачивается корректно', () => {
    const testString = 'test'
    const testStringLength = testString.length
    cy.get('@input').type(testString);
    cy.get('@submit-button').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should((circle) => {
      expect(circle).to.have.length(testStringLength);
      expect(circle.eq(0))
        .to.contain(testString[0])
        .to.have.css('border', CHANGING);
      expect(circle.eq(1))
        .to.contain(testString[1])
        .to.have.css('border', DEFAULT);
      expect(circle.eq(2))
        .to.contain(testString[2])
        .to.have.css('border', DEFAULT);
      expect(circle.eq(3))
        .to.contain(testString[3])
        .to.have.css('border', CHANGING);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circle) => {
      expect(circle).to.have.length(testStringLength);
      expect(circle.eq(0))
        .to.contain(testString[3])
        .to.have.css('border', MODIFIED)
      expect(circle.eq(1))
        .to.contain(testString[1])
        .to.have.css('border', CHANGING);
      expect(circle.eq(2))
        .to.contain(testString[2])
        .to.have.css('border', CHANGING);
      expect(circle.eq(3))
        .to.contain(testString[0])
        .to.have.css('border', MODIFIED);
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should((circle) => {
      expect(circle).to.have.length(testStringLength);
      expect(circle.eq(0))
        .to.contain(testString[3])
        .to.have.css('border', MODIFIED)
      expect(circle.eq(1))
        .to.contain(testString[2])
        .to.have.css('border', MODIFIED);
      expect(circle.eq(2))
        .to.contain(testString[1])
        .to.have.css('border', MODIFIED);
      expect(circle.eq(3))
        .to.contain(testString[0])
        .to.have.css('border', MODIFIED);
    })

  })
})