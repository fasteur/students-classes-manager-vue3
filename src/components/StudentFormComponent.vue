<template>
    <div>
        <el-button
            class="float-right mr-3"
            type="primary"
            @click="dialogFormVisible = true"
            >{{$t('GENERAL.ADD')}}</el-button
        >

        <el-dialog :title="$t(title)" v-model="dialogFormVisible" :append-to-body="true">
            <el-form :model="form">
                <el-form-item label="Nom" :label-width="formLabelWidth">
                    <el-input
                        type="text"
                        v-model="form.name"
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
    props: ['title', 'student'],
    emits: ['formChange', 'resetFormChange'],
    setup(props, { emit }) {
        const { student } = toRefs(props)

        const dialogFormVisible = ref(false)
        const formLabelWidth = ref('120px')
        const form = ref({ name: '', age: 0 })

        watch(student, function (val) {
            form.value = {
                name: val.name,
                age: val.age,
            }
            dialogFormVisible.value = formIsValid.value
        })

        function formChange() {
            const formValue = {
                ...props.student,
                ...form.value,
            }
            formValue.name.toString().trim()
            emit('formChange', formValue)
        }

        function resetForm() {
            form.value = {
                name: '',
                age: null,
            }
            emit('resetFormChange')
        }

        const errors = computed(() => {
            const errors = []

            if (!form.value.name) {
                errors.push('Name field is required!')
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

        function submitForm() {
            if (formIsValid.value) {
                formChange()
                resetForm()
                closeModal()
            }
        }

        function closeModal() {
            dialogFormVisible.value = false
        }

        return {
            submitForm,
            formIsValid,
            form,
            resetForm,
            formLabelWidth,
            dialogFormVisible,
        }
    },
}
</script>
