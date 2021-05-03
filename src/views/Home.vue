<template>
    <div class="home">
        <h1 class="my-4">{{ $t('HOME.TITLE') }}</h1>

        <UserFormModalComponent
            :user="state.student"
            :title="state.formTitle"
            :showModal="state.showModal"
            @addUserChange="onAddStudent($event)"
            @editUserChange="onEditStudent($event)"
            @resetFormChange="onResetForm($event)"
            v-model:showModal="state.showModal"
        >
        </UserFormModalComponent>

        <UserListComponent
            :user-list="state.studentList"
            @editUserChanges="opentEditForm($event)"
            @deleteUserChanges="onDeleteStudent($event)"
        >
        </UserListComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject, reactive } from 'vue'
import UserFormModalComponent from '@/components/UserFormModalComponent.vue'
import UserListComponent from '@/components/UserListComponent.vue'
import { Student, User } from '../models/index'
import { UserDto } from '../models/interfaces/dto/user-dto.interface'
import { StudentService } from '../services/student.service'

interface HomeDataState {
    studentList: Student[]
    student: Student
    formTitle: string
    showModal: boolean
}
export default defineComponent({
    components: {
        UserListComponent,
        UserFormModalComponent,
    },
    setup() {
        // Datas
        const state: HomeDataState = reactive({
            studentList: [] as Student[],
            student: new Student({}),
            formTitle: 'STUDENT_FORM.TITLE',
            showModal: false,
        })

        const studentService = inject<StudentService>('studentService');

        // LifeCycle hooks
        onMounted(() => getStudents())
        
        // Methods
        const addStudent = (data: Student): void => {
            studentService!
                .addStudent(data)
                .then(() => getStudents())
                .catch((err) => console.log('err: ', err))
        }

        const getStudents = (): void => {
            studentService!
                .getStudents()
                .then((res) => {
                    if (!res || !res.data) {
                        state.studentList = []
                        return
                    }
                    const newStudentList = studentListMappingFromDto(res.data)
                    state.studentList = [...newStudentList]
                })
                .catch((err) => console.log('err: ', err))
        }

        const onDeleteStudent = (student: Student): void => {
            studentService!
                .deleteStudent(student)
                .then(() => getStudents())
                .catch((err) => console.log('err: ', err))
        }

        const editStudent = (studentToEdit: Student): void => {
            studentService!
                .editStudent(studentToEdit)
                .then(() => {
                    getStudents()
                    state.student = new Student({})
                })
                .catch((err) => console.log('err: ', err))
        }

        // Dto mapping

        const studentListMappingFromDto = (data: UserDto): Student[] => {
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

        const onAddStudent = (newStudent: Student): void => {
            formIsValid(newStudent)
            if (isStudentAlreadyExist(newStudent)) return
            addStudent(newStudent)
        }

        const onEditStudent = (newStudent: Student): void => {
            formIsValid(newStudent)
            editStudent(newStudent)
        }

        /**
         * @description check if all required form fields are filled
         */
        const formIsValid = (formValue: User) => {
            if (
                !formValue ||
                (formValue &&
                    !(formValue.name || formValue.age || formValue.firstName))
            )
                return
        }

        /**
         * @description set student data & open form modal
         */
        const opentEditForm = (studentToEdit: Student): void => {
            state.student = new Student({ ...studentToEdit })
            state.showModal = true
        }

        const onResetForm = () => {
            state.student = new Student({})
        }

        const isStudentAlreadyExist = (newStudent: Student): boolean => {
            const alreadyExist = !!state.studentList.find(
                (student) =>
                    student.name == newStudent.name &&
                    student.age == newStudent.age
            )
            return alreadyExist
        }

        return {
            onDeleteStudent,
            editStudent,
            onAddStudent,
            onEditStudent,
            opentEditForm,
            onResetForm,
            state
        }
    },
})
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
