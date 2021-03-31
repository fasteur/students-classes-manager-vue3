export class User {
    public id!: string
    public name!: string
    public age!: number

    constructor(base: Partial<User>) {
        Object.assign(this, base)
    }
}
