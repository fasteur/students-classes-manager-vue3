<template>
    <div class="container__wrapper">
        <div class="container__inner">
            <el-container id="app">
                <el-header id="nav">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo r-flex-start"
                        mode="horizontal"
                        @select="handleSelect"
                    >
                        <el-menu-item index="1">
                            <router-link to="/">{{ $t('APP.NAV.HOME') }}</router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link to="/teacher-dashboard">{{ $t('APP.NAV.TEACHER_DASHBOARD') }}</router-link>
                        </el-menu-item>
                        <li class="ml-auto lang-dropdown">
                            <LangDropdownComponent @changeLanguage="activeLanguage($event)"></LangDropdownComponent>
                        </li>
                    </el-menu>
                </el-header>

                <el-main>
                    <router-view name="content"/>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import i18n from '@/i18n'
import LangDropdownComponent from '@/components/utils/lang/LangDropdownComponent.vue'

export default {
    components: {
        LangDropdownComponent
    },
    props: [],
    setup() {
        let activeIndex = ref('1')

        function activeLanguage(lang: string) {
            i18n.global.locale = lang
        }

        function handleSelect(_: string, keyPath: string[]) {
            if (keyPath[0] !== '3') {
                activeIndex.value = keyPath[0]
            }
        }

        return {
            activeLanguage,
            activeIndex,
            handleSelect,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/style.scss';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: $primaryColor;
        }
    }
}

.container {
    &__wrapper {
        @include container(l('full-width'));
    }
    &__inner {
        @include container(l('max-width')/2);
    }
}

.lang-dropdown {
    height: 60px;
    &__text {
        margin: l('spacing') / 1.5;
    }
}

</style>
