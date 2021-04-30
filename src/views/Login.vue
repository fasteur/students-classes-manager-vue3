<template>
    <div class="login">
        <h1>{{ $t('LOGIN.TITLE') }}</h1>
        <LoginFormComponent class="mt-4 mb-3" v-model:form="form"></LoginFormComponent>
        <el-button

            native-type="submit"
            type="primary"
            @click="submitForm()"
        >
            {{ $t('LOGIN.BUTTON_LOGIN') }}
        </el-button>
        <p class="mt-3">{{ $t('LOGIN.NEED_TO_REGISTERED') }} <router-link to="/register">{{ $t('LOGIN.REGISTER_HERE') }}</router-link></p>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import firebase from 'firebase'
import LoginFormComponent from '@/components/login/LoginFormComponent.vue'

export default {
    components: {
        LoginFormComponent,
    },
    setup() {
        const form = ref({
            password: '',
            email: '',
        })

        const submitForm = () => {
            firebase
                .auth()
                .signInWithEmailAndPassword(form.value.email, form.value.password)
                .catch(err => alert(err.message))
        }

        return {
            form,
            submitForm
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/style.scss';
</style>
