<template>
    <div class="home">
        <h1>{{ $t('USER_LIST.TITLE') }}</h1>

        <UserListComponent
            :title="title"
            :user-list="userList"
            @editUserChanges="onEditUser($event)"
            @deleteUserChanges="onDeleteUser($event)"
        >
        </UserListComponent>

        <UserFormComponent 
            :user="user" 
            :title="formTitle"
            @formChange="changeUser($event)"
            @resetFormChange="onResetForm($event)">
        </UserFormComponent>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import UserFormComponent from '@/components/UserFormComponent.vue'
import UserListComponent from '@/components/UserListComponent.vue'
import { User } from '../models/index'
import { IKeyValue } from '../models/interfaces/key-value.interface'
import { UserDto } from '../models/interfaces/dto/user-dto.interface'
import { userService } from '../services/user.service'

export interface IHomeData {
    title: string
    userList: User[]
    user: User
    selectedUsers: IKeyValue,
    formTitle: string,
}

@Options({
    components: {
        UserListComponent,
        UserFormComponent,
    },
})
export default class Home extends Vue {
    // DATAS
    public title!: string
    public userList!: User[]
    public user!: User
    public selectedUsers!: IKeyValue

    data(): IHomeData {
        return {
            title: 'Classe A1',
            userList: [],
            user: new User({}),
            selectedUsers: {},
            formTitle: 'USER_FORM.TITLE',
        }
    }

    // COMPUTED
    public get selectedCount(): number {
        return Object.keys({ ...this.selectedUsers }).filter(
            (key) => this.selectedUsers[key]
        ).length
    }

    // LIFE CYCLE HOOKS
    created(): void {
        this.getUsers()
    }

    // METHODS

    private addUser(data: User): void {
        userService
            .addUser(data)
            .then(() => this.getUsers())
            .catch((err) => console.log('err: ', err))
    }

    private getUsers(): void {
        userService
            .getUsers()
            .then((res) => {
                if (!res || !res.data) {
                    this.userList = []
                    return
                }
                const newUserList = this.userListMappingFromDto(res.data)
                this.userList = [...newUserList]
            })
            .catch((err) => console.log('err: ', err))
    }

    public onDeleteUser(user: User): void {
        userService
            .deleteUser(user)
            .then(() => this.getUsers())
            .catch((err) => console.log('err: ', err))
    }

    public editUser(userToEdit: User): void {
        userService
            .editUser(userToEdit)
            .then(() => {
                this.getUsers()
                this.user = new User({})
            })
            .catch((err) => console.log('err: ', err))
    }

    private userListMappingFromDto(data: UserDto): User[] {
        return Object.keys(data).reduce((acc: User[], curr: string) => {
            acc.push(
                new User({
                    id: curr,
                    name: data[curr].name,
                    age: data[curr].age,
                })
            )
            return acc
        }, [])
    }

    public changeUser(newUser: User): void {
        if (!newUser || (newUser && !(newUser.name || newUser.age))) return
        if (newUser && newUser.id) return this.editUser(newUser)
        if (this.isUserAlreadyExist(newUser)) return
        this.addUser(newUser)
    }

    public onEditUser(userToEdit: User): void {
        this.user = new User({ ...userToEdit })
    }

    public onResetForm() {
        this.user = new User({})
    }
    private isUserAlreadyExist(newUser: User): boolean {
        const alreadyExist = !!this.userList.find(
            (user) => user.name == newUser.name && user.age == newUser.age
        )
        return alreadyExist
    }
}
</script>
