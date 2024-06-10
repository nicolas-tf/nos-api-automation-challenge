import * as user from '../../api/user.request'
import createUserData from '../../support/commands'

context('User', () => {

  describe('[DELETE] Delete User', () => {

    context('Delete a user valid', () => {

      let newUser

      before('Create a user', () => {
        cy.log('Create user to delete')

        const userData = createUserData()

        user.post_user(userData)
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(201)
            newUser = body
          })
      })

      it('Must delete the user', () => {

        user.delete_user({
          id: newUser.id
        })
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(204)
            expect(body, 'body').to.be.empty
          })
      })
    })

    context('Delete a non-existent user', () => {
      it('Must delete the user', () => {

        user.delete_user({
          id: 999999
        })
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(404)
            expect(body.message, 'message').to.be.equal('Resource not found')
          })
      })
    })
  })

  describe('[DELETE] Delete user with invalid access token', () => {

    context('Validate delete user with invalid token', () => {
      it('Must be return message invalid token', () => {
        user.delete_user({ id: 10, valid_access_token: false })
          .then(({ status, body }) => {
            expect(status, 'status code').be.eq(401)
            expect(body.message, 'message').to.be.equal('Invalid token')
          })
      })
    })
  })
})
