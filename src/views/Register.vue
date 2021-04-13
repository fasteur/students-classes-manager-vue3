<template>
    <div class="container__wrapper">
        <h1>{{ $t('REGISTER.TITLE') }}</h1>
        <RegisterFormComponent class="mt-4 mb-3" v-model:form="form"></RegisterFormComponent>
        <p>{{ $t('REGISTER.ALREADY_REGISTER')}} <router-link to="/login">{{ $t('REGISTER.LOGIN_HERE')}}</router-link></p>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import RegisterFormComponent from '@/components/register/RegisterFormComponent.vue'

export default {
    components: {
        RegisterFormComponent,
    },
    setup() {
        const form = ref({
            name: '',
            firstName: '',
            password: '',
            email: '',
            age: 0,
        })

        return {
            form,
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/style.scss';
</style>
