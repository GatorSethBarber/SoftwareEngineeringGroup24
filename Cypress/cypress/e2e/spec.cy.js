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

  /*
	return jsonCard{
		CompanyName: backEndCard.CompanyName,
		Username:    username,
		Expiration:  expiration,
		Amount:      backEndCard.Amount,
		CardNumber:  useCardNumber,
	}
  */
  it('GET with incorrect user', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/card/get',  // FIXME
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
    })
  })
})

// added test
// URL: /card/new/{username}/{password}
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
        "Expiration":   useDate
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
        "Expiration":   useDate
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
/*
func RunServer() {
	host := "localhost:8080"
	if err := http.ListenAndServe(host, httpHandler()); err != nil {
		log.Fatalf("Failed to listen on %s: %v", host, err)
	}
	fmt.Println("Starting to run server")
}
*/
// describe('Test GET User information', () => {
/*
func getUserInformation(username string, password string) (User, error) {
	fmt.Println("Getting with", username, "and", password)
	var user User
	var theError error
	if err := database.Where("username = ? AND password = ?", username, password).First(&user).Error; err != nil {
		user = User{}
		theError = err
	}

	return user, theError
}
*/
describe('Test Server Routing', () => {
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
