import * as mongoose from 'mongoose'
import { User, TUserDoc } from './user.model'
import { UnPopulated } from './mongoose'

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
    // Here userAdam friends field is just an id array
    const userAdam = await User.findOne({ email: 'adam@email.com' }) as UnPopulated<TUserDoc, 'friends'>
    console.log("Adam without friends: ", userAdam)

    // But here the friends are populated and are of type TUserDoc
    const userAdamWithFriends = await User.findOne({ email: 'adam@email.com' }).populate('friends')
    console.log("Adam with friends: ", userAdamWithFriends)
}

async function seed() {
    // First delete all users 
    await User.deleteMany({})

    // Create two users
    const newUser1 = await User.create({
        email: 'smith@email.com',
        password: 'abcdef',
        name: 'Mr. Smith',
        birthdate: new Date(1993, 11, 17),
        friends: []
    })

    const newUser2 = await User.create({
        email: 'adam@email.com',
        password: 'abcdef',
        name: 'Mr. Adam',
        birthdate: new Date(1996, 11, 17),
        friends: [newUser1.id]
    })
}
