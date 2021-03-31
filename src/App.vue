<template>
    <div>
        <div id="app">
            <div>
                <div id="nav">
                    <div>
                        <div>
                            <router-link to="/">{{
                                $t('APP.NAV.HOME')
                            }}</router-link>
                            <router-link to="/about">About</router-link>
                        </div>
                        <div>
                            <button @click="activeLanguage('fr')">
                                {{ $t('APP.NAV.LANG.FR') }}
                            </button>
                            <button @click="activeLanguage('en')">
                                {{ $t('APP.NAV.LANG.EN') }}
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class AppComponent extends Vue {
    public activeLanguage(lang: string) {
        this.$i18n.locale = lang
    }
}
</script>

<style lang="scss">
$justifyContents: space-around, flex-start, space-between, flex-end,
    space-evenly;

@mixin flexRowMixin() {
    @each $justify in $justifyContents {
        .r-#{$justify} {
            display: flex;
            flex-direction: row;
            justify-content: $justify;
            align-items: flex-start;
        }
    }
    @each $justify in $justifyContents {
        .c-#{$justify} {
            display: flex;
            flex-direction: column;
            justify-content: $justify;
            align-items: flex-start;
        }
    }
}
@include flexRowMixin();

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
            color: #42b983;
        }
    }
}
</style>
