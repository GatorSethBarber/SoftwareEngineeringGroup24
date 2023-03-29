// https://github.com/cypress-io/cypress/issues/8956
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
      cy.getCookie('session-gcex', {domain: "localhost"}).should('exist')
    })
  })

  it('Basic Logout', () => {
    login()
    cy.getCookie('session-gcex', {domain: "localhost"}).should('exist')
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/logout'
    }).then(response => {
      expect(response.status).to.equal(200)
      cy.getCookie('session-gcex', {domain: "localhost"}).should('not.exist')
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
      cy.getCookie('session-gcex', {domain: "localhost"}).should('not.exist')
  })
  })

  it('Login with invalid user credentials', () => {
    cy.request({
      method: 'GET',
      url:'http://localhost:8080/user/login/Anlaf/password2',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
      cy.getCookie('session-gcex', {domain: "localhost"}).should('not.exist')
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
      cy.getCookie('session-gcex', {domain: "localhost"}).should('exist')
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
      cy.getCookie('session-gcex', {domain: "localhost"}).should('not.exist')
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

describe('Test new create Card', () => {
  it('Attempt to create without being logged in', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/card/new/Anlaf',
      body: {
        "companyName":  "Starbuck",
        "cardNumber":   "111111122",
        "amount":       50.0,
        "expirationDate":   "2027-12"
      },
      headers: {
        'content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it('Attempt to create with already taken gift card number', () => {
    login()
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/card/new/Anlaf',
      body: {
        "companyName":  "Starbuck",
        "cardNumber":   "223456789",
        "amount":       50.0,
        "expirationDate":   "2027-12"
      },
      headers: {
        'content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  }),

  it ('POST with missing card number', () => {
    login()
    cy.request({
      method: 'POST', 
      url: 'http://localhost:8080/card/new/Anlaf',
      body: {
        "companyName":  "Target",
        "amount":       50.0,
        "expirationDate":   "2027-12"
      },
      headers: {
        'content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it ('POST with valid new card', () => {
    login()
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/card/new/Anlaf',
      body: {
        "companyName": "Starbucks",
        "amount": 50.0,
        "expirationDate": "2027-12",
        "cardNumber": "2222222229"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
  })
})


describe('Test get cards for user', () => {
  it('Get with invalid username (not logged in)', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get/adafdafdafdad',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
      console.log(response.body)
      expect(response.body.length).to.equal(0)
    })
  })

  it('Get with invalid username (logged in)', () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get/adafdafdafdad',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
      expect(response.body.length).to.equal(0)
    })
  })

  it('Get with valid username (not logged in)', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get/Anlaf',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body[0]).to.have.property("cardNumber", "")
    })
  })
  it('Get with valid username (logged in)', () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get/Anlaf',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body[0]["cardNumber"]).to.not.equal("")
    })
  })
  it('Get with valid username (logged in to different account)', () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get/Welthow',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body[0]).to.have.property("cardNumber", "")
    })
  })

  it('Get from user without any cards',() => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get/KingCanute',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
      expect(response.body.length).to.equal(0)
    })
  })
})