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

describe('Test Requesting Swap', () => {
  
  it('Without login', () => {
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 10
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
  it('Logged in to different account', () => {
    login()
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 10
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
  it('Logged into same account', () => {
    login("SethTheBarber", "password")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 10
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
  })
  it('Own both cards', () => {
    login("SethTheBarber", "password")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 2
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  
  it('Try making duplicate request', () => {
    login("SethTheBarber", "password")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
  
  it('Using invalid card numbers', () => {
    login("SethTheBarber", "password")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 0,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 0
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": -1,
        "cardIDTwo": 10
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
  
})

// Note: Depends on above running

describe("Test confirm swap", () => {
  
  it("Not logged in", () => {
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 10
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it("Logged in to different account", () => {
    login()
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 10
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it("Logged in to correct account", () => {
    login("Welthow", "password")
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 10
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it("Try to confirm nonexistent swap", () => {
    login()
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 13,
        "cardIDTwo": 12
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it('Using invalid card numbers', () => {
    login("LiefTheLucky", "bjarn3S@w1t")
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 0,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 0
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  
  it("Create request for follwowing", () => {
    login("SethTheBarber", "password")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
  })

  
  it('Try making duplicate request', () => {
    login("LiefTheLucky", "bjarn3S@w1t")
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })
    cy.request ({
      method: 'PUT',
      url: 'http://localhost:8080/swaps/confirm',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
})


describe("Test deny swap", () => {
  it("Make valid request for setup", () => {
    login("Welthow", "password")
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 12,
        "cardIDTwo": 13
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
  })
  it("Not logged in", () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 12,
        "cardIDTwo": 13
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
  it("Logged into different account", () => {
    login("SethTheBarber", "password")
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 12,
        "cardIDTwo": 13
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })
  it("Valid", () => {
    login()
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 12,
        "cardIDTwo": 13
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })
  it("Delete nonexistent swap", () => {
    login()
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 1,
        "cardIDTwo": 13
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })
  it("Delete swap a second time", () => {
    login()
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 12,
        "cardIDTwo": 13
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it("Delete with invalid card number one", () => {
    login()
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 0,
        "cardIDTwo": 13
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })
})
