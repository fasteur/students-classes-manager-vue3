<template>
    <div>
        <router-view name="container" />
    </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import firebase from 'firebase'

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()
        onBeforeMount(() => {
            firebase.auth().onAuthStateChanged((user) => {
                user = {}
                if (!user) {
                    router.replace('/login')
                } else if (route.path == "/login" || route.path == "/register") {
                    router.replace('/')
                }
            })
        })
    },
}
</script>
