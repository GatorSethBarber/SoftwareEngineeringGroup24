const login = (username="Anlaf", password="password") => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: 'GET',
        url: `http://localhost:8080/user/login/${username}/${password}`
      })
    }
  )
}

describe('BasicLoginAndLogout', () => {
  Cypress.Cookies.debug(true)
  it('Basic Login', () => {
    cy.visit('http://localhost:8080/')
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/login/Anlaf/password'
    }).then(response => {
      expect(response.status).to.equal(200)
      cy.getCookie('session-gcex').should('exist')
    })
  })

  it('Basic Logout', () => {
    login()
    cy.getCookie('session-gcex').should('exist')
    cy.visit('http://localhost:8080/')
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/logout'
    }).then(response => {
      expect(response.status).to.equal(200)
      cy.getCookie('session-gcex').should('not.exist')
      // expect(cy.getCookie('session-gcex')).to.equal(null)
      
    })
  })
})

describe('Multiple Logins and Logouts', () => {
  Cypress.Cookies.debug(true, false)
  it('Logout before login', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/logout',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      cy.getCookie('session-gcex').should('not.exist')
  })
  })

  it('Login with invalid user credentials', () => {
    cy.request({
      method: 'GET',
      url:'http://localhost:8080/user/login/Anlaf/password2',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
      cy.getCookie('session-gcex').should('not.exist')
    })
  })

  it('Login twice with valid credentials', () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/login/Welthow/password',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      cy.getCookie('session-gcex').should('exist')
    })
  })

  it('Logout', () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/logout',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      cy.getCookie('session-gcex').should('not.exist')
    })
  })
})


