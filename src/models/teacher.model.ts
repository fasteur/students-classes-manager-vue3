import { User } from './user.model'

export class Teacher extends User {
    public classes!: string[]

    constructor(base: Partial<Teacher>) {
        super(base)
        Object.assign(this, base)
    }
}
