<template>
    <div class="home">
        <h1 class="my-4">{{ $t('HOME.TITLE') }}</h1>
        <el-button
            class="float-right mr-3"
            type="primary"
            @click="openModal()"
            >{{ $t('GENERAL.ADD') }}</el-button
        >
        <UserFormModalComponent
            :user="state.student"
            :title="state.formTitle"
            :showModal="showModal"
            @submit-form="onSubmitForm($event)"
            v-model:showModal="showModal"
        >
        </UserFormModalComponent>

        <UserListComponent
            :user-list="state.studentList"
            @editUserChanges="openEditForm($event)"
            @deleteUserChanges="onDeleteStudent($event)"
        >
        </UserListComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject, reactive, watch, ref } from 'vue'
import UserFormModalComponent from '@/components/UserFormModalComponent.vue'
import UserListComponent from '@/components/UserListComponent.vue'
import { Student, User } from '../models/index'
import { UserDto } from '../models/interfaces/dto/user-dto.interface'
import { StudentService } from '../services/student.service'

interface HomeDataState {
    studentList: Student[]
    student: Student
    formTitle: string
}
export default defineComponent({
    components: {
        UserListComponent,
        UserFormModalComponent,
    },
    setup() {
        // Injects
        const studentService = inject<StudentService>('studentService');

        // State
        const state: HomeDataState = reactive({
            studentList: [] as Student[],
            student: new Student({}),
            formTitle: 'STUDENT_FORM.TITLE',
        })

        const showModal = ref(false)

        // LifeCycle Hooks
        onMounted(() => getStudents())

        watch(showModal, function (val, oldVal) {
            if (oldVal && !val) {
                resetStudent()
            }
        })
        
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
                    resetStudent()
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
        const onSubmitForm = (newStudent: User): void => {
            if (isOnEditMode(newStudent)) {
                editStudent(newStudent)
            } else {
                addStudent(newStudent)
            }
        }

        /**
         * @description set student data & open form modal
         */
        const openEditForm = (studentToEdit: Student): void => {
            state.student = new Student({ ...studentToEdit })
            showModal.value = true
        }

        const openModal = () => {
            showModal.value = true
        }

        const isOnEditMode = (student: Student) => student && student.id

        const resetStudent = () => {
            state.student = new Student({})
        }
        
        return {
            onDeleteStudent,
            onSubmitForm,
            openEditForm,
            state,
            openModal,
            showModal
        }
    },
})
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
