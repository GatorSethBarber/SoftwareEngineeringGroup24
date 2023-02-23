describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Test GET User information', () => {
  it ('GET with correct username and password', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/read/Anlaf/password'
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('GET with incorrect password', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/read/Analaf/password2',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
    })
  })
})

describe('Test POST User', () => {
  it('POST with already taken username', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/user/new',
      body: {
        "username": "Anlaf",
        "email": "abc123@gmail.com",
        "password": "password", 
        "firstName": "", 
        "lastName": "Anlaf"
      },
      headers: {
        'content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
})