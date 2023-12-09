describe("Приложение корректно работает с роутингом", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Должна открываться главная страница по умолчанию", () => {
    cy.contains("МБОУ АЛГОСОШ")
  })

  it("Переход на страницу 'Строка' и обратно по клику", () => {
    cy.get('[href="/recursion"]').click();
    cy.contains("Строка");

    cy.get('[data-cy="return-button"]').click();
    cy.contains('МБОУ АЛГОСОШ');
  })

  it("Переход на страницу 'Последовательность Фибоначчи' и обратно по клику", () => {
    cy.get('[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");

    cy.get('[data-cy="return-button"]').click();
    cy.contains('МБОУ АЛГОСОШ');
  })

  it("Переход на страницу 'Сортировка массива' и обратно по клику", () => {
    cy.get('[href="/sorting"]').click();
    cy.contains("Сортировка массива");

    cy.get('[data-cy="return-button"]').click();
    cy.contains('МБОУ АЛГОСОШ');
  })

  it("Переход на страницу 'Стек' и обратно по клику", () => {
    cy.get('[href="/stack"]').click();
    cy.contains("Стек");

    cy.get('[data-cy="return-button"]').click();
    cy.contains('МБОУ АЛГОСОШ');
  })

  it("Переход на страницу 'Очередь' и обратно по клику", () => {
    cy.get('[href="/queue"]').click();
    cy.contains("Очередь");

    cy.get('[data-cy="return-button"]').click();
    cy.contains('МБОУ АЛГОСОШ');
  })

  it("Переход на страницу 'Связный список' и обратно по клику", () => {
    cy.get('[href="/list"]').click();
    cy.contains("Связный список");

    cy.get('[data-cy="return-button"]').click();
    cy.contains('МБОУ АЛГОСОШ');
  })
})