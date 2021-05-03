<template>
    <div class="container__wrapper">
        <div class="container__inner r-center">
            <LangDropdownComponent
                class="ml-auto"
                @changeLanguage="activeLanguage($event)"
            ></LangDropdownComponent>
        </div>
        <router-view name="content"></router-view>
    </div>
</template>

<script lang="ts">
import i18n from '@/i18n'
import LangDropdownComponent from '@/components/utils/lang/LangDropdownComponent.vue'

export default {
    components: {
        LangDropdownComponent,
    },
    setup() {
        return {
            activeLanguage(lang: string) {
                i18n.global.locale = lang
            },
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/style.scss';
</style>
