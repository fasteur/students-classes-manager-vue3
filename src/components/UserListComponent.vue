<template>
    <div>
        <el-table :data="userList" style="width: 100%">
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column label="Age" prop="age"></el-table-column>
            <el-table-column align="right">
                <template #header></template>
                <template #default="scope">
                    <el-button
                        @click="editUserChanges(scope.row)"
                        type="primary"
                        icon="el-icon-edit"
                        circle
                    ></el-button>
                    <el-button
                        @click="deleteUserChanges(scope.row)"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
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
