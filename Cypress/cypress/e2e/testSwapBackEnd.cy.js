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
    
  it("Create request for following", () => {
    login("SethTheBarber", "password")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 2,
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
        "cardIDOne": 2,
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
        "cardIDOne": 2,
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


describe("Setup for viewing swaps",() => {
  it("Set up swaps for test", () => {
    login("EricTheRed", "gr33nlandH0")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 8,
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
        "cardIDOne": 7,
        "cardIDTwo": 15
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })

    login("SethTheBarber", "password")
    cy.request ({
      method: 'POST',
      url: 'http://localhost:8080/swaps/request',
      body: {
        "cardIDOne": 4,
        "cardIDTwo": 5
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(201)
    })
  })
})

describe("Test get requested by user", () => {
  it("Without login", () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/swaps/get/pending/requested/user',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  }),

  it("None requested by user", () => {
    login()
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/swaps/get/pending/requested/user',
      failOnStatusCode: false
    }).then(response => {
      console.log("None", response.body)
      console.log("None: ", response.body.length)
      expect(response.status).to.equal(404)
      expect(response.body.length).to.equal(0)
    })
  }),

  it("Some requested by user", () => {
    login("EricTheRed", "gr33nlandH0")
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/swaps/get/pending/requested/user',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.length).to.not.equal(0)
      console.log(response.body)
      expect(response.body[0][0]["cardNumber"]).to.not.equal("")
      expect(response.body[0][1]["cardNumber"]).to.equal("")
    })
  })
})

describe("Test get requested of user", () => {
  it("Without login", () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/swaps/get/pending/requested/others',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })

  it("None requested of user", () => {
    login("Welthow", "password")
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/swaps/get/pending/requested/others',
      failOnStatusCode: false
    }).then(response => {
      console.log("None requested of user: ", response.body)
      expect(response.status).to.equal(404)
      expect(response.body.length).to.equal(0)
    })
  })

  it("Some requested by user", () => {
    login("EricTheRed", "gr33nlandH0")
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/swaps/get/pending/requested/others',
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.length).to.not.equal(0)
      expect(response.body[0][0]["cardNumber"]).to.equal("")
      expect(response.body[0][1]["cardNumber"]).to.not.equal("")
    })
  })
})

describe("Delete swaps for testing views", () => {
  it("Set up swaps for test", () => {
    login("SethTheBarber", "password")
    cy.request ({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 8,
        "cardIDTwo": 9
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })

    login("Anlaf", "password")
    cy.request ({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 7,
        "cardIDTwo": 15
      },
      headers: {
        "content-type": "application/json"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(200)
    })

    login("EricTheRed", "gr33nlandH0")
    cy.request ({
      method: 'DELETE',
      url: 'http://localhost:8080/swaps/deny',
      body: {
        "cardIDOne": 4,
        "cardIDTwo": 5
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