describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Test GET User information', () => {
  it ('GET with correct username and password', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/get/Anlaf/password'
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('GET with incorrect password', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/user/read/Analaf/password2',
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

  it('POST with already taken email', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/user/new',
      body: {
        "username": "Widsith",
        "email": "waves.and.toes@northerners.com",
        "password": "ihavebeenwiththekingof",
        "firstName": "firstName",
        "lastName": "Widsith"
      },
      headers: {
        'content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it ('POST with missing info', () => {
    cy.request({
      method: 'POST', 
      url: 'http://localhost:8080/user/new',
      body: {
        "username": "Widsith",
        "email": "short.poem@the-anglo.com"
      },
      headers: {
        'content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it ('POST with valid info', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/user/new',
      body: {
        "username": "George",
        "email": "uniquely1@email.com",
        "password": "password",
        "firstName": "George",
        "lastName": "Washington"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
  })
})

// added test
// router.HandleFunc("/card/get", requestGetCard).Methods("GET")
describe('Test GET gift card information', () => {
  it ('GET with correct company name', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get?companyName=Starbucks'
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('GET without passing parameter', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get?companyName=Targit',  
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it('GET with unkown company', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get?companyName=BobsGrill',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
    })
  })
})

// added test
// router.HandleFunc("/card/new/{username}/{password}", requestCreateCard).Methods("POST")
describe('Test POST GiftCard', () => {
  it('POST with already taken card number', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/card/new/Anlaf/password',
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
  })

  it ('POST with missing card number', () => {
    cy.request({
      method: 'POST', 
      url: 'http://localhost:8080/card/new/Anlaf/password',
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
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/card/new/Anlaf/password',
      body: {
        "companyName": "Starbucks",
        "amount": 50.0,
        "expirationDate": "2027-12",
        "cardNumber": "111111119"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
  })
})
