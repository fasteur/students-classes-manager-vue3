<template>
    <div class="home">
        <h1 class="my-4">{{ $t('HOME.TITLE') }}</h1>

        <UserFormModalComponent
            :user="student"
            :title="formTitle"
            :showModal="showModal"
            @addUserChange="onAddStudent($event)"
            @editUserChange="onEditStudent($event)"
            @resetFormChange="onResetForm($event)"
            v-model:showModal="showModal"
        >
        </UserFormModalComponent>

        <UserListComponent
            :user-list="studentList"
            @editUserChanges="opentEditForm($event)"
            @deleteUserChanges="onDeleteStudent($event)"
        >
        </UserListComponent>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, Ref } from 'vue'
import UserFormModalComponent from '@/components/UserFormModalComponent.vue'
import UserListComponent from '@/components/UserListComponent.vue'
import { Student, User } from '../models/index'
import { UserDto } from '../models/interfaces/dto/user-dto.interface'
import { studentService } from '../services/student.service'

export default defineComponent({
    components: {
        UserListComponent,
        UserFormModalComponent,
    },
    setup() {
        let studentList: Ref<Student[]> = ref([] as Student[])
        let student = ref(new Student({}))
        const formTitle = 'STUDENT_FORM.TITLE'
        let showModal = ref(false)

        onMounted(() => getStudents())
        
        function addStudent(data: Student): void {
            studentService
                .addStudent(data)
                .then(() => getStudents())
                .catch((err) => console.log('err: ', err))
        }

        function getStudents(): void {
            studentService
                .getStudents()
                .then((res) => {
                    if (!res || !res.data) {
                        studentList.value = []
                        return
                    }
                    const newStudentList = studentListMappingFromDto(res.data)
                    console.log('newStudentList: ', newStudentList);
                    studentList.value = [...newStudentList]
                    console.log('studentList: ', studentList.value);
                })
                .catch((err) => console.log('err: ', err))
        }

        function onDeleteStudent(student: Student): void {
            studentService
                .deleteStudent(student)
                .then(() => getStudents())
                .catch((err) => console.log('err: ', err))
        }

        function editStudent(studentToEdit: Student): void {
            studentService
                .editStudent(studentToEdit)
                .then(() => {
                    getStudents()
                    student.value = new Student({})
                })
                .catch((err) => console.log('err: ', err))
        }

        // Dto mapping

        function studentListMappingFromDto(data: UserDto): Student[] {
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

        function onAddStudent(newStudent: Student): void {
            formIsValid(newStudent)
            if (isStudentAlreadyExist(newStudent)) return
            addStudent(newStudent)
        }

        function onEditStudent(newStudent: Student): void {
            formIsValid(newStudent)
            editStudent(newStudent)
        }

        /**
         * @description check if all required form fields are filled
         */
        function formIsValid(formValue: User) {
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
        function opentEditForm(studentToEdit: Student): void {
            student.value = new Student({ ...studentToEdit })
            showModal.value = true
        }

        function onResetForm() {
            student.value = new Student({})
        }

        function isStudentAlreadyExist(newStudent: Student): boolean {
            const alreadyExist = !!studentList.value.find(
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
            student,
            formTitle,
            showModal,
            studentList
        }
    },
})
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
