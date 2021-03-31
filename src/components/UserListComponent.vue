<template>
    <div>
        <div class="r-space-around" v-for="user in userList" :key="user.id">
            <span>{{ user.name }}</span>
            <span>{{ user.age }}</span>

            <div>
                <button type="button" @click="editUserChanges(user)">
                    {{ $t('GENERAL.EDIT') }}
                </button>
                <button type="button" @click="deleteUserChanges(user)">
                    {{ $t('GENERAL.DELETE') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'userList'],
    emits: ['editUserChanges', 'deleteUserChanges'],
    setup(_, { emit }) {

        function editUserChanges(user) {
            emit('editUserChanges', user)
        }

        function deleteUserChanges(user) {
            emit('deleteUserChanges', user)
        }

        return {
            editUserChanges,
            deleteUserChanges,
        }
    },
}
</script>
