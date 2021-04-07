<template>
    <div class="home">
        
        <h1 class="my-4">{{ $t('HOME.TITLE') }}</h1>
        
        <StudentFormComponent
            :student="student"
            :title="formTitle"
            @formChange="changeStudent($event)"
            @resetFormChange="onResetForm($event)"
        >
        </StudentFormComponent>

        <UserListComponent
            :user-list="studentList"
            @editUserChanges="onEditStudent($event)"
            @deleteUserChanges="onDeleteStudent($event)"
        >
        </UserListComponent>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import StudentFormComponent from '@/components/StudentFormComponent.vue'
import UserListComponent from '@/components/UserListComponent.vue'
import { Student } from '../models/index'
import { UserDto } from '../models/interfaces/dto/user-dto.interface'
import { studentService } from '../services/student.service'

export interface IHomeData {
    studentList: Student[]
    student: Student
    formTitle: string
}

@Options({
    components: {
        UserListComponent,
        StudentFormComponent,
    },
})
export default class Home extends Vue {
    // DATAS
    public studentList!: Student[]
    public student!: Student

    data(): IHomeData {
        return {
            studentList: [],
            student: new Student({}),
            formTitle: 'STUDENT_FORM.TITLE',
        }
    }

    // LIFE CYCLE HOOKS
    created(): void {
        this.getStudents()
    }

    // METHODS

    private addStudent(data: Student): void {
        studentService
            .addStudent(data)
            .then(() => this.getStudents())
            .catch((err) => console.log('err: ', err))
    }

    private getStudents(): void {
        studentService
            .getStudents()
            .then((res) => {
                if (!res || !res.data) {
                    this.studentList = []
                    return
                }
                const newStudentList = this.studentListMappingFromDto(res.data)
                this.studentList = [...newStudentList]
            })
            .catch((err) => console.log('err: ', err))
    }

    public onDeleteStudent(user: Student): void {
        studentService
            .deleteStudent(user)
            .then(() => this.getStudents())
            .catch((err) => console.log('err: ', err))
    }

    public editStudent(studentToEdit: Student): void {
        studentService
            .editStudent(studentToEdit)
            .then(() => {
                this.getStudents()
                this.student = new Student({})
            })
            .catch((err) => console.log('err: ', err))
    }

    private studentListMappingFromDto(data: UserDto): Student[] {
        return Object.keys(data).reduce((acc: Student[], curr: string) => {
            acc.push(
                new Student({
                    id: curr,
                    name: data[curr].name,
                    age: data[curr].age,
                })
            )
            return acc
        }, [])
    }

    public changeStudent(newStudent: Student): void {
        if (!newStudent || (newStudent && !(newStudent.name || newStudent.age))) return
        if (newStudent && newStudent.id) return this.editStudent(newStudent)
        if (this.isStudentAlreadyExist(newStudent)) return
        this.addStudent(newStudent)
    }

    public onEditStudent(studentToEdit: Student): void {
        this.student = new Student({ ...studentToEdit })
    }

    public onResetForm() {
        this.student = new Student({})
    }
    private isStudentAlreadyExist(newStudent: Student): boolean {
        const alreadyExist = !!this.studentList.find((student) => student.name == newStudent.name && student.age == newStudent.age)
        return alreadyExist
    }
}
</script>
<style lang="scss">
@import '@/assets/style.scss';
</style>
