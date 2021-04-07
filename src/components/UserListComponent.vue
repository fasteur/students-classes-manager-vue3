<template>
    <div class="user-list__container">
        <h3 class="float-left">{{title}}</h3>
        <el-table :data="userList" style="width: 100%">
            <el-table-column :label="labelName" prop="name"></el-table-column>
            <el-table-column :label="labelAge" prop="age"></el-table-column>
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

<script lang="ts">
import i18n from '@/i18n'
import { computed } from '@vue/runtime-core'
import { User } from '../models'
import { ComputedRef } from 'vue'

export default {
    props: ['title', 'userList'],
    emits: ['editUserChanges', 'deleteUserChanges'],
    setup(_, { emit }) {
        // Table properties
        const labelName: ComputedRef<string> = computed(() => i18n.global.t('USER_LIST.COLUMNS.NAME'))
        const labelAge: ComputedRef<string> = computed(() => i18n.global.t('USER_LIST.COLUMNS.AGE'))

        // Emits: actions on user field
        const editUserChanges = (user: User): void => emit('editUserChanges', user)
        const deleteUserChanges = (user: User): void => emit('deleteUserChanges', user)

        return {
            editUserChanges,
            deleteUserChanges,
            labelAge,
            labelName,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/style.scss';

.user-list {
    &__container {
        margin: l('spacing');
    }
}
</style>
