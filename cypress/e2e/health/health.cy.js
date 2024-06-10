import * as user from '../../api/user.request'

context('Health', () => {

    describe('[HEALTH] Check health application', () => {

        context('Validate health application', () => {

            it('Must return status code 200', () => {
                user.get_user({
                    per_page: 1
                }).then(({ status }) => {
                    expect(status, 'status code').be.eq(200)
                })
            })
        })
    })
})
