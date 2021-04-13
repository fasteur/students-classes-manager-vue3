<template>
    <div class="login">
        <h1>{{ $t('LOGIN.TITLE') }}</h1>
        <p>{{ $t('LOGIN.NEED_TO_REGISTERED') }} <router-link to="/register">{{ $t('LOGIN.REGISTER_HERE') }}</router-link></p>
    </div>
</template>
