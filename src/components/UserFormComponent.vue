<template>
    <div>
        <el-button
            class="float-right mr-3"
            type="primary"
            @click="openModal()"
            >{{$t('GENERAL.ADD')}}</el-button
        >

        <el-dialog :title="$t(title)" v-model="dialogFormVisible" :append-to-body="true">
            <el-form :model="form">
                <el-form-item label="Nom" :label-width="formLabelWidth">
                    <el-input
                        type="text"
                        v-model="form.name"
                        placeholder="Ex: Asteur"
                        clearable
                    />
                </el-form-item>

                <el-form-item label="FirsName" :label-width="formLabelWidth">
                    <el-input
                        type="text"
                        v-model="form.firstName"
                        placeholder="Ex: Florian"
                        clearable
                    />
                </el-form-item>

                <el-form-item label="Age" :label-width="formLabelWidth">
                    <el-input-number
                        v-model="form.age"
                        :min="0"
                        :max="120"
                        label="age"
                        controls-position="right"
                    >
                    </el-input-number>
                </el-form-item>
            </el-form>

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

<script>
import { computed, ref, watch, toRefs } from 'vue'

export default {
    props: ['title', 'user', 'showModal'],
    emits: ['addUserChange', 'editUserChange', 'resetFormChange', 'showModalChange'],
    setup(props, { emit }) {

        // --- PROPS ---
        const { user, showModal } = toRefs(props)

        // --- DATAS ---
        const dialogFormVisible = ref(false)
        const formLabelWidth = ref('120px')
        const isEditMode = ref(false)
        const form = ref({ name: '', firstName: '', age: 0 })

        // --- WATCHERS ---
        watch(user, function (val) {
            form.value = {
                name: val.name,
                firstName: val.firstName,
                age: val.age,
            }
            isEditMode.value = formIsValid.value
        })

        watch(showModal, function (val) {
            dialogFormVisible.value = val
        })

        watch(dialogFormVisible, function (val) {
            emit('showModalChange', val)
        })

        // --- COMPUTEDS ---

        const errors = computed(() => {
            const errors = []

            if (!form.value.name) {
                errors.push('Name field is required!')
            }
            if (!form.value.firstName) {
                errors.push('First field is required!')
            }
            if (!form.value.age) {
                errors.push('Age is required!')
            }
            if (typeof form.value.age !== 'number') {
                errors.push('Age is a number!')
            }
            return errors
        })

        const formIsValid = computed(() => !(errors.value.length > 0))


        // --- FUNCTIONS ---

        // USER
        function addUser() {
            emit('addUserChange', getFormValue())
        }
        function editUser() {
            emit('editUserChange', getFormValue())
        }

        // FORM 
        function getFormValue() {
            const formValue = {
                ...props.user,
                ...form.value,
            }
            formValue.name.toString().trim()
            formValue.firstName.toString().trim()
            return formValue
        }

        function resetForm() {
            form.value = {
                name: '',
                firstName: '',
                age: null,
            }
            emit('resetFormChange')
        }

        function submitForm() {
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

        // MODAL
        function closeModal() {
            dialogFormVisible.value = false
        }

        function openModal() {
            dialogFormVisible.value = true
        }

        return {
            submitForm,
            formIsValid,
            form,
            resetForm,
            formLabelWidth,
            dialogFormVisible,
            openModal
        }
    },
}
</script>
