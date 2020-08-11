import { IUserBackend, IUserFrontend } from '../split_back_frontend'

const currentUser: IUserFrontend = {
    email: 'some@email.com',
    name: 'John',
    age: 21
}

fetch('/api/user')
    .then(res => {
        if (res.ok) return res.json()
    })
    .then((data: IUserBackend) => {
        // Treat the user, maybe calculate his/her age
    })