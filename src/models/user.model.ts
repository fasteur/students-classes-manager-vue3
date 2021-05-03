export class User {
    public id!: string
    public name!: string
    public firstName!: string
    public age!: number

    constructor(base: Partial<User>) {
        Object.assign(this, base)
    }
}
