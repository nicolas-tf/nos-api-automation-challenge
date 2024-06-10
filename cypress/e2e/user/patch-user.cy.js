import * as user from '../../api/user.request'
import createUserData from '../../support/commands'

context('User', () => {

    let originUserData
    let newUserData

    beforeEach('Create user data', () => {
        cy.log('Create user to be updated')

        // Creating user to be updated (originUserData) and data to update this user (newUserData)
        originUserData = createUserData()
        newUserData = {}

        // Set default data to ensure it is different
        originUserData.gender = 'female'
        originUserData.status = 'active'

        // Creating user origin
        user.post_user(originUserData)
            .then(({ status, body }) => {
                expect(status, 'status code').be.eq(201)
                
                // Include id parameter
                originUserData.id = body.id
                newUserData.id = body.id
            })
    })

    describe('[SCHEMA] User Schema', () => {

        context('Validate update user response schema', () => {
            it('Must return a response schema correctly', () => {

                user.patch_user(newUserData)
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
    })

    describe('[PATH] Update User', () => {

        context('Update user name valid', () => {

            it('Must update user data with updated name', () => {

                newUserData.name = 'New Name'

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(200)

                        expect(body.id, 'id').to.be.equal(originUserData.id)
                        expect(body.name, 'name').not.be.equal(originUserData.name)
                        expect(body.email, 'email').to.be.equal(originUserData.email)
                        expect(body.gender, 'gender').to.be.equal(originUserData.gender)
                        expect(body.status, 'status').to.be.equal(originUserData.status)
                    })
            })

            after('Delete user created', () => {
                cy.log('Delete user created')
                user.delete_user({ id: newUserData.id })
                    .then(({ status }) => {
                        expect(status, 'status code').be.eq(204)
                    })
            })
        })

        context('Update user email valid', () => {

            it('Must update user data with updated email', () => {

                newUserData.email = 'new-email@test.com'

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(200)

                        expect(body.id, 'id').to.be.equal(originUserData.id)
                        expect(body.name, 'name').to.be.equal(originUserData.name)
                        expect(body.email, 'email').not.be.equal(originUserData.email)
                        expect(body.gender, 'gender').to.be.equal(originUserData.gender)
                        expect(body.status, 'status').to.be.equal(originUserData.status)
                    })
            })

            after('Delete user created', () => {
                cy.log('Delete user created')
                user.delete_user({ id: newUserData.id })
                    .then(({ status }) => {
                        expect(status, 'status code').be.eq(204)
                    })
            })
        })

        context('Update user gender valid', () => {

            it('Must update user data with updated gender', () => {

                newUserData.gender = 'male'

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(200)

                        expect(body.id, 'id').to.be.equal(originUserData.id)
                        expect(body.name, 'name').to.be.equal(originUserData.name)
                        expect(body.email, 'email').to.be.equal(originUserData.email)
                        expect(body.gender, 'gender').not.be.equal(originUserData.gender)
                        expect(body.status, 'status').to.be.equal(originUserData.status)
                    })
            })

            after('Delete user created', () => {
                cy.log('Delete user created')
                user.delete_user({ id: newUserData.id })
                    .then(({ status }) => {
                        expect(status, 'status code').be.eq(204)
                    })
            })
        })

        context('Update user status valid', () => {

            it('Must update user data with updated status', () => {

                newUserData.status = 'inactive'

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(200)

                        expect(body.id, 'id').to.be.equal(originUserData.id)
                        expect(body.name, 'name').to.be.equal(originUserData.name)
                        expect(body.email, 'email').to.be.equal(originUserData.email)
                        expect(body.gender, 'gender').to.be.equal(originUserData.gender)
                        expect(body.status, 'status').not.be.equal(originUserData.status)
                    })
            })

            after('Delete user created', () => {
                cy.log('Delete user created')
                user.delete_user({ id: newUserData.id })
                    .then(({ status }) => {
                        expect(status, 'status code').be.eq(204)
                    })
            })
        })
    })

    describe('[PATCH] Update user with blank parameters', () => {

        context('Update a user with blank name', () => {
            it('Must return a message \'cant be blank\'', () => {

                newUserData.name = ''

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('name')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank')
                    })
            })
        })

        context('Update a user with blank email', () => {
            it('Must return a message \'cant be blank\'', () => {

                newUserData.email = ''

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('email')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank')
                    })
            })
        })

        context('Update a user with blank gender', () => {
            it('Must return a message \'cant be gender\'', () => {

                newUserData.gender = ''

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('gender')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank, can be male of female')
                    })
            })
        })

        context('Update a user with blank status', () => {
            it('Must return a message \'cant be blank\'', () => {

                newUserData.status = ''

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('status')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank') // would be "can't be blank, can be active or inactive"
                    })
            })
        })
    })

    describe('[PUT] Update user with null parameters', () => {

        context('Update a user with blank name', () => {
            it('Must return a message \'cant be blank\'', () => {

                newUserData.name = null

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('name')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank')
                    })
            })
        })

        context('Update a user with blank email', () => {
            it('Must return a message \'cant be blank\'', () => {

                newUserData.email = null

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('email')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank')
                    })
            })
        })

        context('Update a user with blank gender', () => {
            it('Must return a message \'cant be gender\'', () => {

                newUserData.gender = null

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('gender')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank, can be male of female')
                    })
            })
        })

        context('Update a user with blank status', () => {
            it('Must return a message \'cant be blank\'', () => {

                newUserData.status = null

                user.patch_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('status')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank') // would be "can't be blank, can be active or inactive"
                    })
            })
        })
    })

    describe('[PATH] Update user with invalid access token', () => {

        context('Validate update user with invalid token', () => {
            it('Must be return message invalid token', () => {
                user.patch_user({ id: originUserData.id, valid_access_token: false })
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(401)
                        expect(body.message, 'message').to.be.equal('Invalid token')
                    })
            })
        })
    })
})
