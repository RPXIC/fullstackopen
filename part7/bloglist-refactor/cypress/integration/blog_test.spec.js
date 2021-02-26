describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'rpxicUser1',
      username: 'rpxic',
      password: '123',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-cy=username-input]').type('rpxic')
      cy.get('[data-cy=password-input]').type('123')
      cy.get('[data-cy=login-button]').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-cy=logout-button]').click()
      cy.get('[data-cy=username-input]').type('rpxic')
      cy.get('[data-cy=password-input]').type('321')
      cy.get('[data-cy=login-button]').click()

      cy.get('.warning')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'rpxic', password: '123' })
      })

      it('A blog can be created', function () {
        cy.contains('rpxicUser1')
        cy.get('[data-cy=togglable-button-show]').click()
        cy.contains('Create new')
        cy.get('[data-cy=title-input]').type('test-title1')
        cy.get('[data-cy=author-input]').type('test-author1')
        cy.get('[data-cy=url-input]').type('test-url1')
        cy.get('[data-cy=create-button]').click()
        cy.contains('test-title1')
        cy.get('[data-cy=blog-details-button]').click()
      })

      it('A user can like a blog and delete it', function () {
        cy.createBlog({
          title: 'test-title1',
          autor: 'test-author1',
          url: 'test-url1',
        })
        cy.contains('test-title1')
        cy.get('[data-cy=blog-details-button]').click()
        cy.get('[data-cy=like-button]').click()
        cy.get('.success')
          .should('contain', 'a new like test-title1 added')
          .and('have.css', 'color', 'rgb(9, 158, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('[data-cy=remove-button]').click()
        cy.get('html').should('not.contain', 'test-title1')
        cy.get('.success')
          .should('contain', 'blog deleted')
          .and('have.css', 'color', 'rgb(9, 158, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it.only('Blogs should be ordered by likes', function () {
        cy.createBlog({
          title: 'test-title1',
          autor: 'test-author1',
          url: 'test-url1',
          likes: 1,
        })
        cy.createBlog({
          title: 'test-title2',
          autor: 'test-author2',
          url: 'test-url2',
          likes: 3,
        })
        cy.createBlog({
          title: 'test-title3',
          autor: 'test-author3',
          url: 'test-url3',
          likes: 2,
        })
        cy.get('[data-cy=blog-details-button]').click({ multiple: true })

        cy.get('[data-cy=likes]').then(likes => {
          let likesArr = likes.map((i, el) => {
            return Cypress.$(el).text()
          })
          likesArr = likesArr.get()
          expect(likesArr).to.deep.eq(['3', '2', '1'])
        })
      })
    })
  })
})
