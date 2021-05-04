<template>
    <div>
        <el-button
            class="float-right mr-3"
            type="primary"
            @click="openModal()"
            >{{ $t('GENERAL.ADD') }}</el-button
        >

        <el-dialog
            :title="$t(title)"
            v-model="dialogFormVisible"
            :append-to-body="true"
        >
            <UserFormComponent v-model:form="state.form"></UserFormComponent>

            <template #footer>
                <span class="dialog-footer">
                    <el-button
                        :class="{ active: formIsValid, disabled: !formIsValid }"
                        native-type="submit"
                        type="primary"
                        @click="submitForm()"
                    >
                        {{ $t('GENERAL.SUBMIT') }}
                    </el-button>
                    <el-button
                        native-type="button"
                        type="primary"
                        plain
                        @click="resetForm()"
                    >
                        {{ $t('GENERAL.RESET') }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { computed, ref, watch, toRefs, reactive, PropType } from 'vue'
import UserFormComponent from '@/components/UserFormComponent.vue'
import { Student, User } from '../models'
import { IKeyValue } from '../models/interfaces/key-value.interface'

interface UserFormModalComponentDataState {
    formLabelWidth: string
    form: IKeyValue
}
interface UserFormModalComponentProps {
    title: string,
    user: Student,
    showModal: boolean
}
interface UserFormModalComponentEmits {
    emit: (event: "addUserChange"|"editUserChange"|"resetFormChange"|"update:showModal", ...args: any[]) => void
}

export default {
    components: {
        UserFormComponent,
    },
    props: {
        title: {
            type: Object as PropType<string>,
            default: null,
        },
        user: {
            type: Object as PropType<Student>,
            default: null,
        },
        showModal: {
            type: Object as PropType<boolean>,
            default: null,
        },
    },
    emits: [
        'addUserChange',
        'editUserChange',
        'resetFormChange',
        'update:showModal',
    ],
    setup(props: Readonly<UserFormModalComponentProps>, { emit }: UserFormModalComponentEmits) {
        // Props 
        const { user, showModal } = toRefs(props)

        // Datas 
        const isEditMode = ref(false)
        const dialogFormVisible = ref(false)

        // State 
        const state: UserFormModalComponentDataState = reactive({
            formLabelWidth: '120px',
            form: { name: '', firstName: '', age: 0 }
        })

        // Watchers 
        watch(user, function (val: User) {
            state.form = {
                name: val.name,
                firstName: val.firstName,
                age: val.age,
            }
            isEditMode.value = formIsValid.value
        })

        watch(showModal, function (val: boolean) {
            if (!val) {
                resetForm()
            }
            dialogFormVisible.value = val
        })

        watch(dialogFormVisible, function (val) {
            emit('update:showModal', val)
        })

        // Computed Properties
        const errors = computed(() => {
            const errors = []

            if (!state.form.name) {
                errors.push('Name field is required!')
            }
            if (!state.form.firstName) {
                errors.push('First field is required!')
            }
            if (!state.form.age) {
                errors.push('Age is required!')
            }
            if (typeof state.form.age !== 'number') {
                errors.push('Age is a number!')
            }
            return errors
        })

        const formIsValid = computed(() => !(errors.value.length > 0))

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

        const clearForm = () => {
            state.form = {
                name: '',
                firstName: '',
                age: 0,
            }
        }

        const resetForm = () => {
            clearForm()
            emit('resetFormChange')
        }

        const submitForm = () => {
            if (formIsValid.value) {
                if (!isEditMode.value) {
                    addUser()
                } else if (isEditMode.value) {
                    editUser()
                }
                resetForm()
                closeModal()
            }
        }

        // Methods: Modal
        const closeModal = () => {
            dialogFormVisible.value = false
        }

        const openModal = () => {
            dialogFormVisible.value = true
        }

        return {
            submitForm,
            formIsValid,
            resetForm,
            state,
            openModal,
            dialogFormVisible
        }
    },
}
</script>
