import * as mongoose from 'mongoose'
import { User, TUserDoc } from './user.model'
import { UnPopulated, Populated } from './mongoose'


mongoose
    .connect('mongodb://localhost:27017/tests',
        {
            autoIndex: false,
            useNewUrlParser: true
        })
    .then(async () => {
        console.log("Connected to DB")
        await seed()
        await main()
    })
    .catch(err => console.error("Error connecting to DB: ", err))

async function main() {

    const usersYoungerThan23 = await User.findYoungerThan(23)

    console.log("UsersYoungerThan23: ", usersYoungerThan23)
}

async function seed() {
    // First delete all users 
    await User.deleteMany({})

    // Create two users
    const newUser1 = await User.create({
        email: 'smith@email.com',
        password: 'abcdef',
        name: 'Mr. Smith',
        birthdate: new Date(1990, 1, 1),
        friends: [],
        boss: null
    })

    const newUser2 = await User.create({
        email: 'adam@email.com',
        password: 'abcdef',
        name: 'Mr. Adam',
        birthdate: new Date(2000, 1, 1),
        friends: [newUser1.id],
        boss: newUser1.id
    })
}
