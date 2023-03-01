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
 
  it('GET with incorrect company name', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get?companyName=Targit',  
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
      url: 'http://localhost:8080/card/new/{username}/{password}',
      body: {
        "UserID":       1,
        "CompanyName":  "Starbuck",
        "CardNumber":   "223456789",
        "Amount":       50.0,
        "Expiration":   2027-12
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
      url: 'http://localhost:8080/card/new/{username}/{password}',
      body: {
        "UserID":       1,
        "CompanyName":  "Target",
        "Amount":       50.0,
        "Expiration":   2027-12
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

// added test
describe('Check Local Server', () => {
  it('Visits Gift Card XChange', () => {
    cy.visit('http://localhost:8080')
  })
}) 

// added test
describe('Check Brands Link', () => {
  it('clicks the link "Brands"', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Brands').click()
  })
})

// added test
describe('Check Navigating To A New Page 1', () => {
  it('clicking "Brands" navigates to a new url', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Brands').click()

    // Should be on a new URL which includes '/brand'
    cy.url().should('include', '/brand')
  })
})

// added test
describe('Check Log In Link', () => {
  it('clicks the link "Log In"', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Log In').click()
  })
})

// added test
describe('Check Navigating To A New Page 2', () => {
  it('clicking "Log In" navigates to a new url', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Log In').click()

    // Should be on a new URL which includes '/brand'
    cy.url().should('include', '/login')
  })
})
