<template>
    <div class="container__wrapper">
        <h1>{{ $t('REGISTER.TITLE') }}</h1>
        <RegisterFormComponent class="mt-4 mb-3" v-model:form="state.form"></RegisterFormComponent>
        <el-button
            native-type="submit"
            type="primary"
            @click="submitForm()"
        >
            {{ $t('GENERAL.SUBMIT') }}
        </el-button>
        <p class="mt-3">{{ $t('REGISTER.ALREADY_REGISTER')}} <router-link to="/login">{{ $t('REGISTER.LOGIN_HERE')}}</router-link></p>
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import RegisterFormComponent from '@/components/register/RegisterFormComponent.vue'
import firebase from 'firebase'

export default {
    components: {
        RegisterFormComponent,
    },
    setup() {
        // Datas
        const state = reactive({
            form: {
                name: '',
                firstName: '',
                password: '',
                email: '',
                age: 0,
            }
        })

        // Methods
        const submitForm = () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(state.form.email, state.form.password)
                .catch(err => alert(err.message))
        }

        return {
            state,
            submitForm
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/style.scss';
</style>
