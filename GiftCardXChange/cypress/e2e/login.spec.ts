describe('Login', () => {
    it('Can not login if the form is invalid', () => {
      cy.visit('/')
      cy.url().should('include', 'login')
      cy.get('[formControlName]="userName"').type('SethTheBarber');
      cy.get('[formControlName]="password"').type('password');
      cy.get('button').click();
      //if the form not valid, remain at same page (login)
      cy.url().should('not.include', 'brand');
    });

    it('Can not login if the form is invalid', () => {
        cy.visit('/')
        cy.url().should('include', 'login')
        cy.get('[formControlName]="password"').type('password');
        cy.get('button').click();
        //if the form valid, go to brand
        cy.url().should('not.include', 'brand');
      });


  })
  