// Helper function to generate random string of length 'length'
function randomString(length) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// Helper function to capitalize first letter of a string for names
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

    // Generates random info to avoid unique constraint database errors
    let firstName = randomString(5);
    let lastName = randomString(5);
    // Username consists of first letter of first name + entire last name
    let username = firstName.substring(0, 1) + lastName;
    // Email is username with '@gmail.com' at the end
    let email = username + "@gmail.com";
    // Capitalizes the first letter of names after being used in username/email
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);
    let password = randomString(10);

    cy.getByData('username-input').type(username)
    cy.getByData('username-input').should('have.value', username)

    cy.getByData('firstName-input').type(firstName)
    cy.getByData('firstName-input').should('have.value', firstName)

    cy.getByData('lastName-input').type(lastName)
    cy.getByData('lastName-input').should('have.value', lastName)

    cy.getByData('email-input').type(email)
    cy.getByData('email-input').should('have.value', email)

    cy.getByData('password-input').type(password)
    cy.getByData('password-input').should('have.value', password)

    // Sets a promise so test only fails/passes after alert generates
    cy.wrap(new Promise((resolve, reject) => {
      cy.getByData('create-button').click();

      cy.on('window:alert', msg => {
        try {
          expect(msg).to.eq('Yay!!! Welcome');
        } catch ( err ) {
          return reject(err);
        }
        resolve();
      });
      // set a timeout to ensure we don't wait forever
      setTimeout(() => {
        reject(new Error('window.alert wasn\'t called within 4s'));
      }, 4000);
    }), { log: false });

    cy.getByData('create-button').click()


  })
})