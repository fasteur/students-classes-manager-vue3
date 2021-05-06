<template>
    <div class="container__wrapper">
        <el-form
            label-position="left"
            label-width="120px"
            class="container__inner"
        >
            <el-form-item class="pb-3" prop="email" :label="labels.email">
                <el-input 
                    v-model="state.form.email"
                    @blur="v$.email.$touch"
                />
                <template v-if="v$.email.$errors">
                    <div v-for="error in v$.email.$errors" :key="error.$uid" class="el-form-item__error pl-1">
                        {{ error?.$message }}
                    </div>
                </template>
            </el-form-item>
                    
            <el-form-item class="pb-3" :label="labels.password" prop="password">
                <el-input
                    type="text"
                    :show-password="true"
                    v-model="state.form.password"
                    placeholder="Ex: 65fddfyyhb$"
                    @blur="v$.password.$touch"
                    clearable
                />
                <template v-if="v$.password.$errors">
                    <div v-for="error in v$.password.$errors" :key="error.$uid" class="el-form-item__error pl-1">
                        {{ error?.$message }}
                    </div>
                </template>
            </el-form-item>
        </el-form>
        <el-button :disabled="v$.$invalid"  native-type="submit" type="primary" @click="onSubmitForm()">
            {{ $t('LOGIN.BUTTON_LOGIN') }}
        </el-button>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    inject,
    reactive,
} from 'vue'
import { Path, TranslateResult } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { IKeyValue } from '../../models/interfaces/key-value.interface'
    
export interface LoginFormComponentFormProperties {
    password: string
    email: string
}

interface LoginFormComponentDataState {
    form: LoginFormComponentFormProperties,
}

export default defineComponent({
    emits: ['submitForm'],
    setup(_, { emit }) {
        // Inject
        const translate = inject<(key: Path) => TranslateResult>('i18nTranslate')

        // State
        const state: LoginFormComponentDataState = reactive({
            form: {
                password: '',
                email: '',
            },
        })
        
        // Datas
        const validatorMessages = reactive({
            required: helpers.withMessage(() => labels.value.validators.required, required),
            email: helpers.withMessage(() => labels.value.validators.email, email),
        })

        // Computed Properties
        const labels = computed(() => {
            return { 
                password: translate!('REGISTER_FORM.COLUMNS.PASSWORD'),
                email: translate!('REGISTER_FORM.COLUMNS.EMAIL'),
                validators: {
                    required: translate!('VALIDATOR.REQUIRED'),
                    email: translate!('VALIDATOR.EMAIL')
                }
            }
        })

        const rules = computed(() => {
            return {
                password: {
                    required: validatorMessages.required
                },
                email: { 
                    required: validatorMessages.required,
                    email: validatorMessages.email,
                }
            }
        })

        // Datas
        const v$ = useVuelidate(rules.value, state.form as IKeyValue)

        // Methods
        function onSubmitForm() {
            emit('submitForm', state.form)
        }

        return {
            state,
            labels,
            v$,
            onSubmitForm,
        }
    },
})
</script>

<style lang="scss">
@import '@/assets/style.scss';

.el-form {
    width: 460px;
}
</style>
