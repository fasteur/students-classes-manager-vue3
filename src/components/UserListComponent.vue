<template>
    <div>
        <div v-for="user in userList" :key="user.id">
            <span>{{ user.name }}</span>
            <span>{{ user.age }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'userList', 'selectedUsers'],
    emits: ['editUserChanges', 'selectedChanges', 'deleteUserChanges'],
    setup(props, { emit }) {
        console.log('title: ', props.title)
        console.log('userList: ', props.userList)
        console.log('selectedUsers: ', props.selectedUsers)
        return {}
    },
}
</script>
