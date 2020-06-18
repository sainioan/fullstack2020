describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matthew West',
      username: 'maWest',
      password: 'sekred'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('Login')
  })

  it('user can log in with correct credentials', function() {
    //cy.contains('Login').click()
    cy.get('#username').type('maWest')
    cy.get('#password').type('sekred')
    cy.get('#login-button').click()
    cy.contains('Matthew West logged in')
  })
  it('login fails with wrong password', function() {
    cy.contains('Login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong ')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Matthew West logged in')
  })


  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'maWest', password: 'sekred' })
    })

    it('a new blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('blogger')
      cy.get('#url').type('blog.com')
      cy.contains('Create').click()

      cy.contains('a new blog')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'blogger1', url:'blog1.com' })
        cy.createBlog({ title: 'second blog', author: 'blogger2',url:'blog2.com' })
        cy.createBlog({ title: 'third blog', author: 'blogger3', url:'blog3.com' })
        cy.createBlog({ title: 'fourth blog', author: 'blogger4', url:'blog4.com' })
        cy.createBlog({ title: 'fifth blog', author: 'blogger5',url:'blog5.com' })
        cy.createBlog({ title: 'sixth blog', author: 'blogger6', url:'blog6.com' })
      })

      it('a blog can be liked', function () {
        cy.contains('first blog').contains('View').click()
        cy.contains('first blog').parent().contains('Like').click()
        cy.contains('first blog').parent().contains('Likes:').should('contain', '1')
      })

      it('a blog can be deleted', function () {
        cy.contains('third blog').contains('View').click()
        cy.contains('third blog').parent().contains('Remove').click()
        cy.get('html').should('not.contain', 'third blog')
      })

      it('the blogs are shown in the order of likes', function (){
        cy.createBlog({
          title: 'not popular',
          author: 'random author',
          url: 'randomblog.com',
          likes: 2
        })
        cy.createBlog({
          title: 'popular blog',
          author: 'skillful blogger',
          url: 'awesomeblog.com',
          likes: 10000000
        })

        cy.get('.blogPost')
          .then(blogs => {
            cy.wrap(blogs[0]).contains('popular')
            cy.wrap(blogs[1]).contains('not')

          })
      })
    })

  })
})
