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
    cy.getByData('login-link').click();
    cy.url().should('include', '/login');

    cy.getByData('register-link').click();
    cy.url().should('include', '/register');

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

    cy.getByData('username-input').type(username);
    cy.getByData('username-input').should('have.value', username);

    cy.getByData('firstName-input').type(firstName);
    cy.getByData('firstName-input').should('have.value', firstName);

    cy.getByData('lastName-input').type(lastName);
    cy.getByData('lastName-input').should('have.value', lastName);

    cy.getByData('email-input').type(email);
    cy.getByData('email-input').should('have.value', email);

    cy.getByData('password-input').type(password);
    cy.getByData('password-input').should('have.value', password);

    // Sets a promise so test only fails/passes after alert generates
    cy.wrap(new Promise((resolve, reject) => {
      cy.getByData('create-button').click();

      cy.on('window:alert', msg => {
        try {
          expect(msg).to.eq('Yay!!! Welcome');
        } catch (err) {
          return reject(err);
        }
        resolve();
      });
      // set a timeout to ensure we don't wait forever
      setTimeout(() => {
        reject(new Error('window.alert wasn\'t called within 4s'));
      }, 4000);
    }), { log: false });

    cy.url().should('include', '/login');
  });

  it('logs-in to an existing user', () => {
    cy.getByData('login-link').click();
    cy.url().should('include', '/login');

    cy.getByData('username-input').type('Anlaf');
    cy.getByData('username-input').should('have.value', 'Anlaf');

    cy.getByData('password-input').type('password');
    cy.getByData('password-input').should('have.value', 'password');

    cy.getByData('login-button').click();

    cy.url().should('include', '/dashboard');
  });

  it('attempts full register to log-in path', () => {
    cy.getByData('login-link').click();
    cy.url().should('include', '/login');

    cy.getByData('register-link').click();
    cy.url().should('include', '/register');

    let firstName = randomString(5);
    let lastName = randomString(5);
    let username = firstName.substring(0, 1) + lastName;
    let email = username + "@gmail.com";
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);
    let password = randomString(10);

    cy.getByData('username-input').type(username);
    cy.getByData('username-input').should('have.value', username);

    cy.getByData('firstName-input').type(firstName);
    cy.getByData('firstName-input').should('have.value', firstName);

    cy.getByData('lastName-input').type(lastName);
    cy.getByData('lastName-input').should('have.value', lastName);

    cy.getByData('email-input').type(email);
    cy.getByData('email-input').should('have.value', email);

    cy.getByData('password-input').type(password);
    cy.getByData('password-input').should('have.value', password);

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
      setTimeout(() => {
        reject(new Error('window.alert wasn\'t called within 4s'));
      }, 4000);
    }), { log: false });

    cy.url().should('include', '/login');

    cy.getByData('username-input').type(username);
    cy.getByData('username-input').should('have.value', username);

    cy.getByData('password-input').type(password);
    cy.getByData('password-input').should('have.value', password);

    cy.getByData('login-button').click();

    cy.url().should('include', '/dashboard');
  });

  it('doesn\'t register new user', () => {
    cy.getByData('login-link').click();
    cy.url().should('include', '/login');

    cy.getByData('register-link').click();
    cy.url().should('include', '/register');

    cy.getByData('username-input').type("Anlaf");
    cy.getByData('username-input').should('have.value', "Anlaf");

    cy.getByData('firstName-input').type("Olaf");
    cy.getByData('firstName-input').should('have.value', "Olaf");

    cy.getByData('lastName-input').type("Trygvasson");
    cy.getByData('lastName-input').should('have.value', "Trygvasson");

    cy.getByData('email-input').type("viking@iviking.com");
    cy.getByData('email-input').should('have.value', "viking@iviking.com");

    cy.getByData('password-input').type("password");
    cy.getByData('password-input').should('have.value', "password");

    cy.wrap(new Promise((resolve, reject) => {
      cy.getByData('create-button').click();

      cy.on('window:alert', msg => {
        try {
          expect(msg).to.eq('hmmhmm something wrong');
        } catch (err) {
          return reject(err);
        }
        resolve();
      });
      setTimeout(() => {
        reject(new Error('window.alert wasn\'t called within 4s'));
      }, 4000);
    }), { log: false });

    cy.url().should('include', '/register');
  });

  it('doesn\'t log-in to an existing user', () => {
    cy.getByData('login-link').click();
    cy.url().should('include', '/login');

    cy.getByData('username-input').type('Anlaf');
    cy.getByData('username-input').should('have.value', 'Anlaf');

    cy.getByData('password-input').type('password2');
    cy.getByData('password-input').should('have.value', 'password2');

    cy.wrap(new Promise((resolve, reject) => {
      cy.getByData('login-button').click();

      cy.on('window:alert', msg => {
        try {
          expect(msg).to.eq('hmmhmm something wrong');
        } catch (err) {
          return reject(err);
        }
        resolve();
      });
      setTimeout(() => {
        reject(new Error('window.alert wasn\'t called within 4s'));
      }, 4000);
    }), { log: false });

    cy.url().should('include', '/login');
  });
})

describe('View brands test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })
  it('displays all brands', () => {
    cy.getByData('brands-link').click();
    cy.url().should('include', '/brand');

    cy.getByData('Starbucks').should('exist');
    cy.getByData('Target').should('exist');
    cy.getByData('BestBuy').should('exist');
    cy.getByData('Kohls').should('exist');
  })
})

describe('View cards test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })
  it('displays correct card brand', () => {
    cy.getByData('brands-link').click();
    cy.url().should('include', '/brand');

    cy.getByData('Starbucks').click();
    cy.url().should('include', '/card');

    cy.getByData('brand-name-head').should('have.text', ' All Cards for Starbucks ');
  })

  it('displays all starbucks cards', () => {
    cy.getByData('brands-link').click();
    cy.url().should('include', '/brand');

    cy.getByData('Starbucks').click();
    cy.url().should('include', '/card');

    cy.getByData('brand-name-head').should('have.text', ' All Cards for Starbucks ');

    cy.getByData('SethTheBarber').should('exist');
    cy.getByData('EricTheRed').should('exist');
    cy.getByData('Welthow').should('have.length', 2);
    cy.getByData('Anlaf').should('have.length', 2);
  })
})

describe('Dashboard tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })
  it('displays correct user info', () => {
    cy.getByData('login-link').click();
    cy.url().should('include', '/login');

    cy.getByData('username-input').type('Anlaf');
    cy.getByData('username-input').should('have.value', 'Anlaf');

    cy.getByData('password-input').type('password');
    cy.getByData('password-input').should('have.value', 'password');

    cy.getByData('login-button').click();

    cy.url().should('include', '/dashboard');

    cy.get('.mat-mdc-tab').contains('Profile').click();

    cy.getByData('firstName-input').should('have.value', 'Olaf');
    cy.getByData('lastName-input').should('have.value', 'Trygvasson');
    cy.getByData('username-input').should('have.value', 'Anlaf');
    cy.getByData('password-input').should('have.value', '');
    cy.getByData('email-input').should('have.value', 'viking@iviking.com');
  })

  it('displays all cards for user', () => {
    cy.getByData('login-link').click();
    cy.url().should('include', '/login');

    cy.getByData('username-input').type('Anlaf');
    cy.getByData('username-input').should('have.value', 'Anlaf');

    cy.getByData('password-input').type('password');
    cy.getByData('password-input').should('have.value', 'password');

    cy.getByData('login-button').click();

    cy.url().should('include', '/dashboard');

    cy.get('.mat-mdc-tab').contains('My Wallet').click();

    cy.getByData('100').should('exist');
    cy.getByData('70').should('exist');
    cy.getByData('135').should('exist');
  })

  describe('Requests tests', () => {
    it('displays all requests for user', () => {
      cy.getByData('login-link').click();
      cy.url().should('include', '/login');
  
      cy.getByData('username-input').type('SethTheBarber');
      cy.getByData('username-input').should('have.value', 'SethTheBarber');
  
      cy.getByData('password-input').type('password');
      cy.getByData('password-input').should('have.value', 'password');
  
      cy.getByData('login-button').click();
  
      cy.url().should('include', '/dashboard');
  
      cy.getByData('323456789').should('exist');
      cy.getByData('123456789').should('exist');
      cy.getByData('223456789').should('exist');
    })

    it('cancels outbound request', () => {
      cy.getByData('login-link').click();
      cy.url().should('include', '/login');
  
      cy.getByData('username-input').type('SethTheBarber');
      cy.getByData('username-input').should('have.value', 'SethTheBarber');
  
      cy.getByData('password-input').type('password');
      cy.getByData('password-input').should('have.value', 'password');
  
      cy.getByData('login-button').click();
  
      cy.url().should('include', '/dashboard');

      cy.getByData('cancel-123456789').click();

      cy.getByData('deny-button').click();

      cy.getByData('123456789').should('not.exist');
  
    })

    it('cancels inbound request', () => {
      cy.getByData('login-link').click();
      cy.url().should('include', '/login');
  
      cy.getByData('username-input').type('SethTheBarber');
      cy.getByData('username-input').should('have.value', 'SethTheBarber');
  
      cy.getByData('password-input').type('password');
      cy.getByData('password-input').should('have.value', 'password');
  
      cy.getByData('login-button').click();
  
      cy.url().should('include', '/dashboard');

      cy.getByData('deny-323456789').click();

      cy.getByData('deny-button').click();

      cy.getByData('323456789').should('not.exist');
  
    })

    it('accepts inbound request', () => {
      cy.getByData('login-link').click();
      cy.url().should('include', '/login');
  
      cy.getByData('username-input').type('SethTheBarber');
      cy.getByData('username-input').should('have.value', 'SethTheBarber');
  
      cy.getByData('password-input').type('password');
      cy.getByData('password-input').should('have.value', 'password');
  
      cy.getByData('login-button').click();
  
      cy.url().should('include', '/dashboard');

      cy.getByData('accept-423456789').click();

      cy.getByData('accept-button').click();

      cy.getByData('423456789').should('not.exist');

      cy.get('.mat-mdc-tab').contains('My Wallet').click();

      cy.getByData('423456789').should('not.exist');
      cy.getByData('143456789').should('exist');
  
    })

    it('makes outbound request', () => {
      cy.getByData('login-link').click();
      cy.url().should('include', '/login');
  
      cy.getByData('username-input').type('SethTheBarber');
      cy.getByData('username-input').should('have.value', 'SethTheBarber');
  
      cy.getByData('password-input').type('password');
      cy.getByData('password-input').should('have.value', 'password');
  
      cy.getByData('login-button').click();
  
      cy.url().should('include', '/dashboard');

      cy.getByData('brands-link').click();
      cy.url().should('include', '/brand');
  
      cy.getByData('Starbucks').click();
      cy.url().should('include', '/card');
  
      cy.getByData('brand-name-head').should('have.text', ' All Cards for Starbucks ');
  
      cy.getByData('11').should('exist');
      cy.getByData('swap-11').click();

      cy.getByData('card-select').click();

      cy.getByData('owned-143456789').click();

      cy.getByData('submit-button').click();
    })
  })
})