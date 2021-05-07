<template>
    <div>
        <el-form>
            <el-form-item :label="labels.name" :label-width="state.formLabelWidth" required>
                <el-input
                    type="text"
                    v-model="state.userForm.name"
                    placeholder="Ex: Asteur"
                    @blur="v$.name.$touch"
                    clearable
                />
                <template v-if="v$.name.$errors">
                    <div v-for="error in v$.name.$errors" :key="error.$uid" class="el-form-item__error pl-1">
                        {{ error?.$message }}
                    </div>
                </template>
            </el-form-item>

            <el-form-item :label="labels.firstName" :label-width="state.formLabelWidth" required>
                <el-input
                    type="text"
                    v-model="state.userForm.firstName"
                    placeholder="Ex: Florian"
                    @blur="v$.firstName.$touch"
                    clearable
                />
                <template v-if="v$.firstName.$errors">
                    <div v-for="error in v$.firstName.$errors" :key="error.$uid" class="el-form-item__error pl-1">
                        {{ error?.$message }}
                    </div>
                </template>
            </el-form-item>

            <el-form-item :label="labels.age" :label-width="state.formLabelWidth" required>
                <el-input-number
                    v-model.number="state.userForm.age"
                    :min="0"
                    :max="120"
                    label="age"
                    @blur="v$.age.$touch"
                    controls-position="right"
                >
                </el-input-number>
                <template v-if="v$.age.$errors">
                    <div v-for="error in v$.age.$errors" :key="error.$uid" class="el-form-item__error pl-1">
                        {{ error?.$message }}
                    </div>
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { toRefs, watch, onMounted, reactive, computed, inject, PropType } from 'vue'
import { Path, TranslateResult } from 'vue-i18n'
import { ValiduetorMessages } from '@/components/login/LoginFormComponent.vue'
import useVuelidate from '@vuelidate/core'
import { IKeyValue } from '../models/interfaces/key-value.interface'
import { helpers, required } from '@vuelidate/validators'

export interface UserForm {
    name: string
    firstName: string
    age: number
}

interface UserFormComponentDataState {
    userForm: UserForm,
    formLabelWidth: string,
}

interface UserFormComponentProps {
    form: UserForm,
    resetForm: boolean
}

interface UserFormComponentEmits {
    emit: (event: "update:form"|"update:formIsValid"|"update:resetForm", ...args: any[]) => void
}

export default {
    props: {
        form: {
            type: Object as PropType<UserForm>,
            default: null,
        },
        resetForm: {
            type: Boolean, 
            default: false
        }
    },
    emits: ['update:form', 'update:formIsValid', 'update:resetForm'],
    setup(props: Readonly<UserFormComponentProps>, { emit }: UserFormComponentEmits) {
        // Injects
        const translate =  inject<(key: Path) => TranslateResult>('i18nTranslate')

        // Props
        const { form, resetForm } = toRefs(props)

        // State
        const state: UserFormComponentDataState = reactive({
            userForm: {
                name: '',
                firstName: '', 
                age: 0
            },
            formLabelWidth: '120px',
        })

        // Datas
        const validatorMessages: ValiduetorMessages = reactive({
            required: helpers.withMessage(() => labels.value.validators.required, required),
        })
        
        // Computed Properties
        const labels = computed(() => {
            return {
                name: translate!('USER_LIST.COLUMNS.NAME'),
                firstName: translate!('USER_LIST.COLUMNS.FIRST_NAME'),
                age: translate!('USER_LIST.COLUMNS.AGE'),
                validators: {
                    required: translate!('VALIDATOR.REQUIRED'),
                }
            }
        })

        const rules = computed(() => {
            return {
                name: {
                    required: validatorMessages.required
                },
                firstName: { 
                    required: validatorMessages.required,
                },
                age: {
                    required: validatorMessages.required
                }
            }
        })

        // Datas
        const v$ = useVuelidate(rules.value as IKeyValue, state.userForm as IKeyValue)

        // LifeCycle Hooks
        onMounted(() => {
            if (!form.value || (form.value && (!form.value.name || !form.value.firstName ))) {
                return
            } 
            const { name, firstName, age } = form.value
            state.userForm.name = name
            state.userForm.firstName = firstName
            state.userForm.age = age
        })

        // Watchers
        watch(form, function (val: UserForm) {
            state.userForm = val
        })

        watch(state.userForm, function (val: UserForm) {
            emit('update:form', val)
        })

        watch(v$, function (val)  {
            emit('update:formIsValid', !val.$invalid)
        })

        watch(resetForm, function(val) {
            if (val) {
                state.userForm.name = ''
                state.userForm.firstName = ''
                state.userForm.age = 0
                v$.value.$reset()
                emit('update:resetForm')
            }
        })
        return {
            state,
            labels,
            v$
        }
    },
}
</script>
