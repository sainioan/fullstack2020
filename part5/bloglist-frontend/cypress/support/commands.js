Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', { username, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
  })
  
  Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: {
        title,
        author,
        url
      },
      headers: {
        'Authorization': `Beearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })
