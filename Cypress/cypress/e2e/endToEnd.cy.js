describe('Log-In Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');

  })
  it('registers new user', () => {
    cy.getByData('login-link').click()
    cy.url().should('include', '/login')

    cy.getByData('register-link').click()
    cy.url().should('include', '/register')

    cy.window()
      .its('console')
      .then((console) => {
        cy.spy(console, 'log').as('log')
      })

    cy.getByData('firstName-input').type('John')
    cy.getByData('firstName-input').should('have.value', 'John')

    cy.getByData('lastName-input').type('Doe')
    cy.getByData('lastName-input').should('have.value', 'Doe')
    
    cy.getByData('email-input').type('jdoe@gmail.com')
    cy.getByData('email-input').should('have.value', 'jdoe@gmail.com')

    cy.getByData('password-input').type('password')
    cy.getByData('password-input').should('have.value', 'password')

    cy.getByData('username-input').type('jdoe')
    cy.getByData('username-input').should('have.value', 'password')

    cy.getByData('create-button').click()

    // cy.wait(1000)

    // cy.get('@log')
    //   .invoke('getCalls')
    //   .then((calls) => {
    //     cy.getByData('firstName-input').invoke('val').should((value) -> {
    //       console.log(value);
    //       expect(value).to.equal(calls[0].args[0].value.firstName)
    //     })
    //   })
  })
})


