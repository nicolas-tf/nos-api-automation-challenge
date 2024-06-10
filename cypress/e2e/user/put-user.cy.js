import * as user from '../../api/user.request'
import createUserData from '../../support/commands'

context('User', () => {

    let originUserData
    let newUserData

    beforeEach('Create user data', () => {
        cy.log('Create user to be updated')

        // Creating user to be updated (originUserData) and data to update this user (newUserData)
        originUserData = createUserData()
        newUserData = createUserData()

        // Changing data to ensure it is different
        originUserData.gender = 'female'
        originUserData.status = 'active'

        newUserData.gender = 'male'
        newUserData.status = 'inactive'

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

                user.put_user(newUserData)
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

    describe('[PUT] Update User', () => {

        context('Update a user data valid', () => {

            it('Must update user data', () => {

                user.put_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(200)

                        expect(body.id, 'id').to.be.equal(originUserData.id)
                        expect(body.name, 'name').not.be.equal(originUserData.name)
                        expect(body.email, 'email').not.be.equal(originUserData.email)
                        expect(body.gender, 'gender').not.be.equal(originUserData.gender)
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

    describe('[PUT] Update user with blank parameters', () => {

        context('Update a user with blank name', () => {
            it('Must return a message \'cant be blank\'', () => {

                newUserData.name = ''

                user.put_user(newUserData)
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

                user.put_user(newUserData)
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

                user.put_user(newUserData)
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

                user.put_user(newUserData)
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

                user.put_user(newUserData)
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

                user.put_user(newUserData)
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

                user.put_user(newUserData)
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

                user.put_user(newUserData)
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(422)
                        expect(body[0].field, 'field').to.be.equal('status')
                        expect(body[0].message, 'message').to.be.equal('can\'t be blank') // would be "can't be blank, can be active or inactive"
                    })
            })
        })
    })

    describe('[PUT] Update user with invalid access token', () => {

        context('Validate update user with invalid token', () => {
            it('Must be return message invalid token', () => {
                user.put_user({ id: 10, valid_access_token: false })
                    .then(({ status, body }) => {
                        expect(status, 'status code').be.eq(401)
                        expect(body.message, 'message').to.be.equal('Invalid token')
                    })
            })
        })
    })
})
