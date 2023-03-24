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

describe('Test new GET User information', () => {
  it ('GET without login', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/Anlaf'
    }).then(response => {
      expect(response.status).to.equal(200)
      const body = response.body
      
      console.log(body)
      // https://stackoverflow.com/questions/60031254/cypress-get-value-from-json-response-body
      expect(body).to.have.property("username", "Anlaf")
      expect(body).to.have.property("password", "")
      expect(body).to.have.property("email", "")
      expect(body).to.have.property("firstname", "")
      expect(body).to.have.property("lastname", "")
    })
  })

  it('GET with same login', () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/Anlaf',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      const body = response.body
      
      console.log(body)
      // https://stackoverflow.com/questions/60031254/cypress-get-value-from-json-response-body
      expect(body).to.have.property("username", "Anlaf")
      expect(body).to.have.property("password", "password")
      expect(body).to.have.property("email", "viking@iviking.com")
      expect(body).to.have.property("firstname", "Olaf")
      expect(body).to.have.property("lastname", "Trygvasson")
    })
  })

  it('GET with different login', () => {
    login("Welthow", "password")
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/Anlaf',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      const body = response.body
      
      console.log(body)
      // https://stackoverflow.com/questions/60031254/cypress-get-value-from-json-response-body
      expect(body).to.have.property("username", "Anlaf")
      expect(body).to.have.property("password", "")
      expect(body).to.have.property("email", "")
      expect(body).to.have.property("firstname", "")
      expect(body).to.have.property("lastname", "")
    })
  }),

  it('GET nonexistent user without login', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/adjaafdaaad',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
    })
  })

  it('GET nonexistent user while logged in', () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/adjaafdaaad',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
    })
  })
})

