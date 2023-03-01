describe('Log-In Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');

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
    cy.getByData('username-input').should('have.value', 'jdoe')

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

describe('Login Test', () => {
  beforeEach(() =>{
   cy.visit('http://localhost:4200');
  })
  it('registers new user', () => {
   cy.get('login-link').click()
   cy.url().should('include', '/login')

   cy.get('register-link').click()
   cy.url().should('include', '/register')

   cy.window()
     .its('console')
     .then((console) => {
       cy.spy(console, 'log').as('log')
     })

     cy.log('filling out username') // if you really need this
     cy.get('[formControl="userName"]').type('SethTheBarber').should('have.value', 'SethTheBarber')

     cy.log('filling out first name') // if you really need this
     cy.get('[formControlName="firstName"]').type('Seth').should('have.value', 'Seth')
 
     cy.log('filling out last name') // if you really need this
     cy.get('[formControl="lastName"]').type('Barber').should('have.value', 'Barber')

     cy.log('filling out email') // if you really need this
     cy.get('[formControl="email"]').type('not.my.email@stfaux.com').should('have.value', 'not.my.email@stfaux.com')

     cy.log('filling out password') // if you really need this
     cy.get('[formControl="lastName"]').type('password').should('have.value', 'password')
 
     cy.log('submitting form') // if you really need this
     cy.get('form').submit()

 })

 it('user login ', () => {
   cy.get('login-link').click()
   cy.url().should('include', '/login')
   cy.get('[formControlName="userName"]').type('SethTheBarber').should('have.value', 'SethTheBarber')
   cy.get('[formControl="lastName"]').type('password').should('have.value', 'password')
   cy.get('button').click();
 })



})
