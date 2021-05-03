<template>
    <div>
        <el-form :model="userForm">
            <el-form-item :label="state.labels.name" :label-width="state.formLabelWidth">
                <el-input
                    type="text"
                    v-model="userForm.name"
                    placeholder="Ex: Asteur"
                    clearable
                />
            </el-form-item>

            <el-form-item :label="state.labels.firstName" :label-width="state.formLabelWidth">
                <el-input
                    type="text"
                    v-model="userForm.firstName"
                    placeholder="Ex: Florian"
                    clearable
                />
            </el-form-item>

            <el-form-item :label="state.labels.age" :label-width="state.formLabelWidth">
                <el-input-number
                    v-model="userForm.age"
                    :min="0"
                    :max="120"
                    label="age"
                    controls-position="right"
                >
                </el-input-number>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { ref, toRefs, watch, onMounted, reactive, computed, inject } from 'vue'
import { Path, TranslateResult } from 'vue-i18n'
import { IKeyValue } from '../models/interfaces/key-value.interface'

interface UserFormComponentDataState {
    labels: {
        name: string
        firstName: string
        age: string
    },
    formLabelWidth: string
}
export default {
    props: ['form'],
    emits: ['update:form'],
    setup(props, { emit }) {
        // Injects
        const translate =  inject<(key: Path) => TranslateResult>('i18nTranslate')

        // Props
        const { form } = toRefs(props)

        // State
        const state: UserFormComponentDataState = reactive({
            labels: {
                name: computed(() => translate!('USER_LIST.COLUMNS.NAME')),
                firstName: computed(() => translate!('USER_LIST.COLUMNS.FIRST_NAME')),
                age: computed(() => translate!('USER_LIST.COLUMNS.AGE')),
            },
            formLabelWidth: '120px'
        })

        // Datas
        const userForm: IKeyValue = ref({ name: '', firstName: '', age: 0 })

        // LifeCycle Hooks
        onMounted(() => {
            userForm.value = form.value
        })

        // Watchers
        watch(form, function (val) {
            userForm.value = val
        })

        watch(userForm, function (val) {
            emit('update:form', val)
        })

        return {
            userForm,
            state
        }
    },
}
</script>
