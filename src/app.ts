import * as mongoose from 'mongoose'
import { User, IUserDoc } from './user.model'
import { Populated, Select } from './mongoose'


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
    // Simple query
    const adam =
        await User.findOne({ email: 'adam@email.com' })

    // Populate
    const adamPopulated =
        await User.findOne({ email: 'adam@email.com' })
            .populate('friends')
            .populate('boss') as Populated<IUserDoc, 'friends' | 'boss'>

    // Lean
    const adamLean =
        await User.findOne({ email: 'adam@email.com' })
            .lean()

    // Select
    const adamSelect =
        await User.findOne({ email: 'adam@email.com' })
            .select('friends') as Select<IUserDoc, 'friends'>

    // Instance methods
    const smith = await User.findOne({ email: 'smith@email.com' })
    const smithsEmployees = await smith.getEmployees()

    // Statics
    const usersYoungerThan23 = await User.findYoungerThan(23)
}

async function seed() {
    // First delete all users 
    await User.deleteMany({})

    // Create two users
    const smith = await User.create({
        email: 'smith@email.com',
        password: 'abcdef',
        name: 'Mr. Smith',
        birthdate: new Date(1990, 1, 1),
        friends: [],
        boss: null
    })

    const adam = await User.create({
        email: 'adam@email.com',
        password: 'abcdef',
        name: 'Mr. Adam',
        birthdate: new Date(2000, 1, 1),
        friends: [smith.id],
        boss: smith.id
    })
}
