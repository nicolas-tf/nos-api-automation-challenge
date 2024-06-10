import * as user from '../../api/user.request'
import createUserData from '../../support/commands'

context('User', () => {

  let userData

  beforeEach('Create user data', () => {
    userData = createUserData()
  })

  describe('[SCHEMA] User Schema', () => {

    context('Validate create user response schema', () => {
      it('Must return a list user schema correctly', () => {

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(201)

            expect(body, 'body').to.have.property('id').that.is.a('number')
            expect(body, 'body').to.have.property('name').that.is.a('string')
            expect(body, 'body').to.have.property('email').that.is.a('string')
            expect(body, 'body').to.have.property('gender').that.is.oneOf(['male', 'female'])
            expect(body, 'body').to.have.property('status').that.is.oneOf(['active', 'inactive'])
          })
      })
    })
  })

  describe('[POST] Create User', () => {

    context('Create a user valid', () => {

      let newUser

      it('Must create a new user', () => {

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(201)
            newUser = body
            expect(body.id, 'id').to.be.greaterThan(0)
            expect(body.name, 'name').to.be.equal(userData.name)
            expect(body.email, 'email').to.be.equal(userData.email)
            expect(body.gender, 'gender').to.be.equal(userData.gender)
            expect(body.status, 'status').to.be.equal(userData.status)
          })
      })

      after('Delete user created', () => {
        cy.log('Delete user created')
        user.delete_user({ id: newUser.id })
          .then(({ status }) => {
            expect(status, 'status code').be.eq(204)
          })
      })
    })
  })

  describe('[POST] Create user with blank parameters', () => {

    context('Create a user with blank name', () => {
      it('Must return a message \'cant be blank\'', () => {

        userData.name = ''
        
        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('name')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank')
          })
      })
    })

    context('Create a user with blank email', () => {
      it('Must return a message \'cant be blank\'', () => {

        userData.email = ''

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('email')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank')
          })
      })
    })

    context('Create a user with blank gender', () => {
      it('Must return a message \'cant be gender\'', () => {

        userData.gender = ''

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('gender')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank, can be male of female')
          })
      })
    })

    context('Create a user with blank status', () => {
      it('Must return a message \'cant be blank\'', () => {

        userData.status = ''

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('status')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank') // would be "can't be blank, can be active or inactive"
          })
      })
    })
  })

  describe('[POST] Create user with null parameters', () => {

    context('Create a user with blank name', () => {
      it('Must return a message \'cant be blank\'', () => {

        userData.name = null

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('name')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank')
          })
      })
    })

    context('Create a user with blank email', () => {
      it('Must return a message \'cant be blank\'', () => {

        userData.email = null

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('email')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank')
          })
      })
    })

    context('Create a user with blank gender', () => {
      it('Must return a message \'cant be gender\'', () => {

        userData.gender = null

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('gender')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank, can be male of female')
          })
      })
    })

    context('Create a user with blank status', () => {
      it('Must return a message \'cant be blank\'', () => {

        userData.status = null

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(422)
            expect(body[0].field, 'field').to.be.equal('status')
            expect(body[0].message, 'message').to.be.equal('can\'t be blank') // would be "can't be blank, can be active or inactive"
          })
      })
    })
  })

  describe('[POST] Create user with invalid access token', () => {

    context('Validate create user with invalid token', () => {
      it('Must be return message invalid token', () => {

        userData.valid_access_token = false

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(401)
            expect(body.message, 'message').to.be.equal('Invalid token')
          })
      })
    })
  })
})
