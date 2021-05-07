<template>
    <div>
        <el-dialog
            :title="$t(title)"
            v-model="dialogFormVisible"
            :append-to-body="true"
            :destroy-on-close="true"
        >
            <UserFormComponent 
                v-model:formIsValid="formIsValid" 
                v-model:form="state.form"
                :resetForm="resetForm"
                @update:resetForm="setResetForm(false)"
            >
            </UserFormComponent>
            <template #footer>
                <span class="dialog-footer">
                    <el-button
                        :disabled="!formIsValid"
                        :class="{ active: formIsValid, disabled: !formIsValid }"
                        native-type="submit"
                        type="primary"
                        @click="submitForm()"
                    >
                        {{ $t('GENERAL.SUBMIT') }}
                    </el-button>
                    <el-button
                        :disabled="!formIsValid"
                        native-type="button"
                        type="primary"
                        plain
                        @click="setResetForm(true)"
                    >
                        {{ $t('GENERAL.RESET') }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { ref, watch, toRefs, reactive, PropType } from 'vue'
import UserFormComponent, { UserForm } from '@/components/UserFormComponent.vue'
import { Student, User } from '../models'

interface UserFormModalComponentDataState {
    formLabelWidth: string
    form: UserForm,
    isEditMode: boolean
}
interface UserFormModalComponentProps {
    title: string,
    user: Student,
    showModal: boolean,
}
interface UserFormModalComponentEmits {
    emit: (
        event: "addUserChange"|"editUserChange"|"update:showModal"|"update:formIsValid",
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
            type: Object as PropType<Student>,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: [
        'addUserChange',
        'editUserChange',
        'update:showModal',
        'update:formIsValid'
    ],
    setup(props: Readonly<UserFormModalComponentProps>, { emit }: UserFormModalComponentEmits) {
        // Props 
        const { user, showModal } = toRefs(props)

        // Datas 
        const dialogFormVisible = ref(false)
        const formIsValid = ref(false)
        const resetForm = ref(false)

        // State 
        const state: UserFormModalComponentDataState = reactive({
            formLabelWidth: '120px',
            form: { name: '', firstName: '', age: 0 },
            isEditMode: false,
        })

        // Watchers 
        watch(user, function (val: User) {
            state.form = {
                name: val.name,
                firstName: val.firstName,
                age: val.age,
            }
            state.isEditMode = !!val
        })

        watch(showModal, function (val: boolean) {
            if (!val) {
                clearForm()
            }
            dialogFormVisible.value = val
        })

        watch(dialogFormVisible, function (val) {
            emit('update:showModal', val)
        })

        watch(formIsValid, function (val) {
            emit("update:formIsValid", val)
        })

        // Methods: User
        const addUser = () => {
            emit('addUserChange', getFormValue())
        }
        const editUser = () => {
            emit('editUserChange', getFormValue())
        }

        // Methods: Form
        const getFormValue = () => {
            const formValue = {
                ...props.user,
                ...state.form,
            }
            formValue.name.toString().trim()
            formValue.firstName.toString().trim()
            return formValue
        }

        const setResetForm = (value: boolean) => {
            resetForm.value = value
        }

        const submitForm = () => {
            if (formIsValid.value) {
                if (!state.isEditMode) {
                    addUser()
                } else if (state.isEditMode) {
                    editUser()
                }
                closeModal()
            }
        }

        const clearForm = () => {
            state.form.name = ''
            state.form.firstName = ''
            state.form.age = 0
        }

        // Methods: Modal
        const closeModal = () => {
            dialogFormVisible.value = false
        }

        return {
            submitForm,
            formIsValid,
            resetForm,
            state,
            dialogFormVisible,
            setResetForm,
        }
    },
}
</script>
