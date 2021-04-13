import { User } from './user.model'

export class Student extends User {
    constructor(base: Partial<Student>) {
        super(base)
        Object.assign(this, base)
    }
}
