import { faker } from '@faker-js/faker'

export default function createUserData() {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        gender: faker.person.sex(),
        status: faker.datatype.boolean() ? 'active' : 'inactive',
    }
}
