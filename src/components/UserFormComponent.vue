<template>
    <div>
        <el-form :model="state.userForm">
            <el-form-item :label="labels.name" :label-width="state.formLabelWidth">
                <el-input
                    type="text"
                    v-model="state.userForm.name"
                    placeholder="Ex: Asteur"
                    clearable
                />
            </el-form-item>

            <el-form-item :label="labels.firstName" :label-width="state.formLabelWidth">
                <el-input
                    type="text"
                    v-model="state.userForm.firstName"
                    placeholder="Ex: Florian"
                    clearable
                />
            </el-form-item>

            <el-form-item :label="labels.age" :label-width="state.formLabelWidth">
                <el-input-number
                    v-model="state.userForm.age"
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
import { toRefs, watch, onMounted, reactive, computed, inject, PropType } from 'vue'
import { Path, TranslateResult } from 'vue-i18n'

export interface UserForm {
    name: string
    firstName: string
    age: number
}

interface UserFormComponentDataState {
    userForm: UserForm,
    formLabelWidth: string
}

interface UserFormComponentProps {
    form: UserForm
}

interface UserFormComponentEmits {
    emit: (event: "update:form", ...args: any[]) => void
}

export default {
    props: {
        form: {
            type: Object as PropType<UserForm>,
            default: null,
        }
    },
    emits: ['update:form'],
    setup(props: Readonly<UserFormComponentProps>, { emit }: UserFormComponentEmits) {
        // Injects
        const translate =  inject<(key: Path) => TranslateResult>('i18nTranslate')

        // Props
        const { form } = toRefs(props)

        // State
        const state: UserFormComponentDataState = reactive({
            userForm: {
                name: '',
                firstName: '', 
                age: 0
            },
            formLabelWidth: '120px'
        })

        // Computed Properties
        const labels = computed(() => {
            return {
                name: translate!('USER_LIST.COLUMNS.NAME'),
                firstName: translate!('USER_LIST.COLUMNS.FIRST_NAME'),
                age: translate!('USER_LIST.COLUMNS.AGE'),
            }
        })

        // LifeCycle Hooks
        onMounted(() => {
            state.userForm = form.value
        })

        // Watchers
        watch(form, function (val: UserForm) {
            state.userForm = val
        })

        watch(state.userForm, function (val: UserForm) {
            emit('update:form', val)
        })

        return {
            state,
            labels
        }
    },
}
</script>
