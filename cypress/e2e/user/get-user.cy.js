import * as user from '../../api/user.request'

context('User', () => {

  // Get User
  // List Users

  describe('[SCHEMA] User Schema', () => {

    context('Validate get user response schema', () => {

      let userData = null

      before('Search for a user in the list', () => {
        user.get_user({
          per_page: 1
        }).then(({ status, body }) => {
          expect(status, 'status code').be.eq(200)
          expect(body, 'body').to.have.length(1)

          userData = body[0]
        })
      })

      it('Must return a user schema correctly', () => {

        user.get_user({
          id: userData.id
        })
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(200)

            expect(body, 'body').to.have.property('id').that.is.a('number')
            expect(body, 'body').to.have.property('name').that.is.a('string')
            expect(body, 'body').to.have.property('email').that.is.a('string')
            expect(body, 'body').to.have.property('gender').that.is.oneOf(['male', 'female'])
            expect(body, 'body').to.have.property('status').that.is.oneOf(['active', 'inactive'])
          })
      })
    })

    context('Validate list users response schema', () => {
      it('Must return a list user schema correctly', () => {

        user.get_user({
          id: '',
          page: 1,
          per_page: 5
        })

          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(200)
            expect(body, 'body').to.be.an('array').that.is.not.empty

            body.forEach((user, index) => {
              expect(user, `user[${index}]`).to.have.property('id').that.is.a('number')
              expect(user, `user[${index}]`).to.have.property('name').that.is.a('string')
              expect(user, `user[${index}]`).to.have.property('email').that.is.a('string')
              expect(user, `user[${index}]`).to.have.property('gender').that.is.oneOf(['male', 'female'])
              expect(user, `user[${index}]`).to.have.property('status').that.is.oneOf(['active', 'inactive'])
            })
          })
      })
    })
  })

  describe('[GET] Get User', () => {

    context('Validate get user by id', () => {

      let userData = null

      before('Search for a user in the list', () => {
        user.get_user({
          per_page: 1
        }).then(({ status, body }) => {
          expect(status, 'status code').be.eq(200)
          expect(body, 'body').to.have.length(1)

          userData = body[0]
        })
      })

      it('Must be return a data from specific user', () => {

        user.get_user({
          id: userData.id
        })

          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(200)
            expect(body, 'body').is.not.empty
            expect(body.id, 'user id').to.be.equal(userData.id)
            expect(body.name, 'user name').to.be.equal(userData.name)
            expect(body.email, 'user id').to.be.equal(userData.email)
            expect(body.gender, 'user gender').to.be.equal(userData.gender)
            expect(body.status, 'user status').to.be.equal(userData.status)
          })

      })
    })

    context('Validate get user by non-existent id', () => {
      it('Must return message user not found', () => {
        user.get_user({
          id: 999999
        })
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(404)
            expect(body.message, 'body').to.be.equal('Resource not found')
          })
      })
    })
  })

  describe('[GET] List Users', () => {

    context('Validate list all users', () => {
      it('Must return a list of users', () => {

        user.get_user({
          id: '',
          page: 1,
          per_page: 5
        })

          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(200)
            expect(body, 'body').to.be.an('array')
            expect(body, 'body').to.have.lengthOf.at.least(1)
          })
      })
    })

    context('Validate list with 2 users per page', () => {
      it('Must return a list with 2 users per page', () => {

        user.get_user({
          id: '',
          page: 1,
          per_page: 2
        })

          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(200)
            expect(body, 'body').to.have.length(2)
          })

      })
    })

    context('Validate list user pagination', () => {

      // Decription validations
      let usersPage1Desc = 'users page 1'
      let usersPage2Desc = 'users page 2'
      let listPage1 = null
      let listPage2 = null

      it('First page and second page must have diff users', () => {

        // first page
        user.get_user({
          id: '',
          page: 1,
          per_page: 2
        })

          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(200)
            expect(body, usersPage1Desc).to.have.length(2)
            listPage1 = body

            // second page
            user.get_user({
              id: '',
              page: 2,
              per_page: 2
            })

              .then(({ status, body }) => {
                expect(status, 'status code').be.eq(200)
                expect(body, usersPage2Desc).to.have.length(2)
                listPage2 = body

                expect(listPage1, 'list users page 1').not.be.null
                expect(listPage2, 'list users page 2').not.be.null
                expect(listPage1, 'compare page 1 and page 2 list users').is.not.be.equal(listPage2)
              })
          })
      })
    })
  })

  describe('[GET] Get user with invalid access token', () => {

    context('Validate get user with invalid token', () => {
      it('Must be return message invalid token', () => {
        user.get_user({ valid_access_token: false })
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(401)
            expect(body.message, 'message').to.be.equal('Invalid token')
          })
      })
    })
  })
})
