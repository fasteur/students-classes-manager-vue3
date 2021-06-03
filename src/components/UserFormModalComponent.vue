<template>
    <div>
        <el-dialog
            :title="$t(title)"
            v-model="dialogFormVisible"
            :append-to-body="true"
            :destroy-on-close="true"
        >
            <UserFormComponent 
                :user="user"
                @submit-form="submitForm"
            >
            </UserFormComponent>

        </el-dialog>
    </div>
</template>

<script lang="ts">
import { ref, watch, toRefs, reactive, PropType } from 'vue'
import UserFormComponent, { UserForm } from '@/components/UserFormComponent.vue'
import { Student, User } from '../models'

interface UserFormModalComponentDataState {
    formLabelWidth: string
}
interface UserFormModalComponentProps {
    title: string,
    user: User,
    showModal: boolean,
}
interface UserFormModalComponentEmits {
    emit: (
        event: "submitForm"|"update:showModal",
        ...args: any[]
    ) => void
}

export default {
    components: {
        UserFormComponent,
    },
    props: {
        title: {
            type: String,
            default: 'STUDENT_FORM.TITLE',
        },
        user: {
            type: Object as PropType<User>,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: [
        'submitForm',
        'update:showModal',
    ],
    setup(props: Readonly<UserFormModalComponentProps>, { emit }: UserFormModalComponentEmits) {
        // Props 
        const { showModal } = toRefs(props)

        // Datas 
        const dialogFormVisible = ref(false)

        // State 
        const state: UserFormModalComponentDataState = reactive({
            formLabelWidth: '120px',
        })

        // Watchers 
        watch(showModal, function (val: boolean) {
            dialogFormVisible.value = val
        })

        watch(dialogFormVisible, function (val) {
            emit('update:showModal', val)
        })

        // Methods: Form
        const submitForm = (formValue: User) => {
            emit('submitForm', formValue)
            closeModal()
        }

        // Methods: Modal
        const closeModal = () => {
            dialogFormVisible.value = false
        }

        return {
            submitForm,
            state,
            dialogFormVisible,
        }
    },
}
</script>
