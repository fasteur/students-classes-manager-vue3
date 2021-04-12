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
                            <el-dropdown class="lang-dropdown__text">
                                <span class="el-dropdown-link">
                                    {{ $t('APP.NAV.LANG.TITLE') }} <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="activeLanguage('fr')">
                                            {{ $t('APP.NAV.LANG.FR') }}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="activeLanguage('en')">
                                            {{ $t('APP.NAV.LANG.EN') }}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
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

export default {
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
