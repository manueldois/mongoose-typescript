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
    const userAdam = await User.findOne({ email: 'adam@email.com' })
        .populate('friends')
        .populate('boss') as Populated<TUserDoc, 'friends' | 'boss'>

    userAdam.friends.forEach(f => f.save())
    userAdam.boss.save()
    
    console.log("Adam: ", userAdam.friends)
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
        friends: [],
        boss: null
    })

    const newUser2 = await User.create({
        email: 'adam@email.com',
        password: 'abcdef',
        name: 'Mr. Adam',
        birthdate: new Date(1996, 11, 17),
        friends: [newUser1.id],
        boss: newUser1.id
    })
}
