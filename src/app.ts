import * as mongoose from 'mongoose'
import { User } from './user.model'

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
    // user is of type TUserDoc
    // Now also contains birthdate field, but not age
    const user = await User.findOne({ email: 'someemail@e.com' })
    console.log("Found User: ", user)
}

async function seed() {
    // First delete users with same email
    await User.deleteMany({ email: 'someemail@e.com' })

    const newUser = await User.create({
        email: 'someemail@e.com',
        password: 'abcdef',
        name: 'Mr. Smith',
        birthdate: new Date(1993, 11, 17)
    })
    console.log("Created User: ", newUser)
}
//