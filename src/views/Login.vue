<template>
    <div class="login">
        <h1>{{ $t('LOGIN.TITLE') }}</h1>
        <LoginFormComponent
            class="mt-4 mb-3"
            @submit-form="onSubmitForm"
        ></LoginFormComponent>
        <p class="mt-3">
            {{ $t('LOGIN.NEED_TO_REGISTERED') }}
            <router-link to="/register">{{ $t('LOGIN.REGISTER_HERE') }}</router-link>
        </p>
    </div>
</template>

<script lang="ts">
import firebase from 'firebase'
import LoginFormComponent from '@/components/login/LoginFormComponent.vue'
import { LoginFormComponentFormProperties } from '@/components/login/LoginFormComponent.vue'

export default {
    components: {
        LoginFormComponent,
    },
    setup() {

        // Methods
        const onSubmitForm = (value: LoginFormComponentFormProperties) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(value.email, value.password)
                .catch(err => alert(err.message))
        }

        return {
            onSubmitForm,
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/style.scss';
</style>

