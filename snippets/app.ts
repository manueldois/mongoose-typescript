import { User } from "../snippets/statics_methods";

async function main() {
    // Instance methods
    const smith = await User.findOne({ email: 'smith@email.com' })
    const smithsEmployees = await smith.getEmployees()

    // Statics
    const usersYoungerThan23 = await User.findYoungerThan(23)
}
