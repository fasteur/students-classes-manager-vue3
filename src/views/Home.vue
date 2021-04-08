<template>
    <div class="home">
        
        <h1 class="my-4">{{ $t('HOME.TITLE') }}</h1>
        
        <UserFormComponent
            :user="student"
            :title="formTitle"
            :showModal="showModal"
            @addUserChange="onAddStudent($event)"
            @editUserChange="onEditStudent($event)"
            @resetFormChange="onResetForm($event)"
            @showModalChange="onShowModal($event)"
        >
        </UserFormComponent>

        <UserListComponent
            :user-list="studentList"
            @editUserChanges="opentEditForm($event)"
            @deleteUserChanges="onDeleteStudent($event)"
        >
        </UserListComponent>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import UserFormComponent from '@/components/UserFormComponent.vue'
import UserListComponent from '@/components/UserListComponent.vue'
import { Student, User } from '../models/index'
import { UserDto } from '../models/interfaces/dto/user-dto.interface'
import { studentService } from '../services/student.service'

export interface IHomeData {
    studentList: Student[]
    student: Student
    formTitle: string
    showModal: boolean
}

@Options({
    components: {
        UserListComponent,
        UserFormComponent,
    },
})
export default class Home extends Vue {
    // --- DATAS ---
    public studentList!: Student[]
    public student!: Student
    public showModal!: boolean

    data(): IHomeData {
        return {
            studentList: [],
            student: new Student({}),
            formTitle: 'STUDENT_FORM.TITLE',
            showModal: false,
        }
    }

    // --- LIFE CYCLE HOOKS ---
    created(): void {
        this.getStudents()
    }

    // --- METHODS ---

    // Call services

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

    public onDeleteStudent(student: Student): void {
        studentService
            .deleteStudent(student)
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

    // Dto mapping

    private studentListMappingFromDto(data: UserDto): Student[] {
        return Object.keys(data).reduce((acc: Student[], curr: string) => {
            acc.push(
                new Student({
                    id: curr,
                    name: data[curr].name,
                    firstName: data[curr].firstName,
                    age: data[curr].age,
                })
            )
            return acc
        }, [])
    }

    // Student form actions

    public onAddStudent(newStudent: Student): void {
        this.formIsValid(newStudent)
        if (this.isStudentAlreadyExist(newStudent)) return
        this.addStudent(newStudent)
    }

    public onEditStudent(newStudent: Student): void {
        this.formIsValid(newStudent)
        this.editStudent(newStudent)
    }

    /** 
     * @description check if all required form fields are filled
    */
    private formIsValid(formValue: User) {
        if (!formValue || (formValue && !(formValue.name || formValue.age || formValue.firstName))) return
    }
    
    /**
    * @description set student data & open form modal
    */
    public opentEditForm(studentToEdit: Student): void {
        this.student = new Student({ ...studentToEdit })
        this.showModal = true
    }

    public onResetForm() {
        this.student = new Student({})
    }

    private isStudentAlreadyExist(newStudent: Student): boolean {
        const alreadyExist = !!this.studentList.find((student) => student.name == newStudent.name && student.age == newStudent.age)
        return alreadyExist
    }

    // Modal
    public onShowModal(show: boolean) {
        this.showModal = show
    }
}
</script>
<style lang="scss">
@import '@/assets/style.scss';
</style>
